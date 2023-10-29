import { bkcValidatorSet } from "@/eth/contract/bkcv";
import { FC, createContext, useContext, useEffect, useState } from "react";
import { useCoreData } from "../core/core";
import { rpc } from "@/eth/rpc";
import {
  getBlockRequestIdFromBlockNumber,
  getRpcResponseById,
} from "@/utils/rpc";
import { ethclient } from "@/lib/ethers";
import { stakingPlatform } from "@/lib/graphql/staking";

type SpanLiveProviderProps = {
  children?: any;
};

type SpanData = {
  span: Span;
  currentSpan: bigint;
  spanSize: bigint;
  getValidator: (signer: string) => ValidatorInfo | null
};

const defaultContextValue: SpanData = {
  span: [],
  currentSpan: BigInt(0),
  spanSize: BigInt(0),
  getValidator: () => null
};

export const spanContext = createContext<SpanData>(defaultContextValue);

export const SpanLiveProvider: FC<SpanLiveProviderProps> = (props) => {
  const [span, setSpan] = useState<Span>(defaultContextValue.span);
  const [currentSpan, setCurrentSpan] = useState<bigint>(
    defaultContextValue.currentSpan
  );
  const [validatorInfo, setValidatorInfo] = useState<ValidatorInfo[]>([]);
  const [spanSize, setSpanSize] = useState<bigint>(
    defaultContextValue.spanSize
  );
  const { currentBlockNumber } = useCoreData();

  async function fetchValidatorsInfo() {
    const validators = await stakingPlatform.getAllValidatorsInfo();
    setValidatorInfo(validators);
  }

  async function fetchSpan() {
    const current = await bkcValidatorSet.currentSpanNumber();
    setCurrentSpan(current);
  }

  async function fetchSpanSize() {
    const size = await bkcValidatorSet.span();
    setSpanSize(size);
  }

  async function recheckSpanNumber() {
    const current = await bkcValidatorSet.currentSpanNumber();
    // if span mismatched, force update
    if (current !== currentSpan) {
      setCurrentSpan(current);
      console.warn("span number mismatched");
    }
  }

  function getValidator(signer: string) {
    for (const each of validatorInfo) {
      if (each.blockSigner.toLowerCase() === signer.toLowerCase()) {
        return each;
      }
    }
    return null;
  }

  async function fetchFullSpan() {
    const { validators } = await bkcValidatorSet.getValidators(
      currentBlockNumber
    );
    const { startBlock, endBlock } = await bkcValidatorSet.getSpanRange(
      currentSpan
    );
    const blockRequests = rpc.createBlocksRequestList(startBlock, endBlock);
    const rpcBlocks = await rpc.getBlocks(blockRequests);
    const span = constructSpan(
      currentSpan,
      validators,
      startBlock,
      endBlock,
      blockRequests,
      rpcBlocks
    );
    setSpan([...span]);

    return startBlock;
  }

  function constructSpan(
    currentSpan: bigint,
    validators: string[],
    startBlock: bigint,
    endBlock: bigint,
    blockRequests: BlockRequests,
    rpcBlocks: RpcResponse<RpcBlock>[]
  ): Span {
    // recheck all data before calculating span
    if (endBlock - startBlock + 1n !== spanSize) {
      throw new Error(
        `constructSpan: the given range does not match with the span size; size=${spanSize})`
      );
    }
    if (BigInt(validators.length) !== spanSize) {
      throw new Error(
        "constructSpan: validators size does not match wth the span size"
      );
    }
    if (BigInt(blockRequests.length) !== spanSize) {
      throw new Error(
        "constructSpan: blockRequests size does not match wth the span size"
      );
    }
    if (BigInt(rpcBlocks.length) !== spanSize) {
      throw new Error(
        "constructSpan: rpcBlocks size does not match wth the span size"
      );
    }
    const span: Span = [];
    for (let i = 0; i < spanSize; i++) {
      const bn = startBlock + BigInt(i);
      const reqId = getBlockRequestIdFromBlockNumber(blockRequests, bn);
      if (reqId === null) {
        throw new Error(`constructSpan: missing reqId of blockNumber=${bn}`);
      }
      const block = getRpcResponseById<RpcBlock>(rpcBlocks, reqId);
      if (block === null) {
        throw new Error(`constructSpan: missing rpcBlock of blockNumber=${bn}`);
      }

      const b: SpanBlock = {
        blockNumber: bn,
        spanNumber: currentSpan,
        validator: validators[i],
        status: {
          isProposed: block.result !== null,
          difficulty:
            block.result !== null ? BigInt(block.result.difficulty) : BigInt(0),
          totalreward: block.result !== null ? BigInt(0) : BigInt(0),
          timestamp:
            block.result !== null
              ? new Date(parseInt(block.result.timestamp, 16) * 1000)
              : new Date(0),
        },
      };
      span.push(b);
    }
    return span;
  }

  function isInSpan(blockNumber: number | bigint) {
    for (const each of span) {
      if (each.blockNumber === blockNumber) {
        return true;
      }
    }
    return false;
  }

  async function updateSpan(
    blockNumber: bigint,
    fetchSpanWhenMissed?: boolean
  ) {
    const b = await ethclient.getBlock(blockNumber);
    if (b === null) {
      throw new Error(
        `updateSpan: cannot update block ${blockNumber}, remote block not found`
      );
    }
    if (!isInSpan(blockNumber)) {
      if (fetchSpanWhenMissed) {
        await fetchFullSpan();
        return;
      }
      throw new Error(
        `updateSpan: cannot update block ${blockNumber}, local block not found`
      );
    }
    const s = span;
    const index = parseInt((blockNumber % spanSize).toString());
    if (s[index].blockNumber !== blockNumber) {
      throw new Error(
        `updateSpan: cannot update block ${blockNumber}, local block index not matched`
      );
    }
    s[index].status = {
      difficulty: b.difficulty,
      isProposed: true,
      totalreward: BigInt(0),
      timestamp: new Date(b.timestamp * 1000),
    };
    setSpan([...s]);
  }

  useEffect(() => {
    fetchSpan();
    fetchSpanSize();
    fetchValidatorsInfo();
  }, []);

  useEffect(() => {
    if (currentSpan !== 0n && spanSize !== 0n) {
      fetchFullSpan();
    }
  }, [currentSpan]);

  useEffect(() => {
    if (!currentBlockNumber) {
      return;
    }
    // on the first span's block
    if (currentBlockNumber % 50 == 0) {
      setCurrentSpan(currentSpan + 1n);
      return;
    }
    // on the second span's block
    if (currentBlockNumber % 50 == 1) {
      recheckSpanNumber();
    }
    if (currentBlockNumber !== 0 && spanSize !== 0n && span.length !== 0) {
      updateSpan(BigInt(currentBlockNumber), true);
    }
    console.log(
      "current block is",
      currentBlockNumber,
      "current span is",
      currentSpan
    );
  }, [currentBlockNumber]);

  return (
    <spanContext.Provider value={{ span, currentSpan, spanSize, getValidator }}>
      {props.children}
    </spanContext.Provider>
  );
};

export const useSpan = () => useContext(spanContext);
