import { BKCValidatorSet, bkcValidatorSet } from "@/eth/contract/bkcv";
import { SlashManager, slashManager } from "@/eth/contract/slash";
import { RPC, rpc } from "@/eth/rpc";
import { getBlockRequestIdFromBlockNumber, getRpcResponseById } from "@/utils/rpc";

export class POS {
  protected rpc: RPC;
  protected bkcValidatorSet: BKCValidatorSet;
  protected slashManager: SlashManager;

  public spanSize: bigint;

  constructor(rpc: RPC, bkcValidatorSet: BKCValidatorSet, slashManager: SlashManager, spanSize: bigint) {
    this.rpc = rpc;
    this.bkcValidatorSet = bkcValidatorSet;
    this.slashManager = slashManager;
    this.spanSize = spanSize;
  }

  public async spanByNumber(number: bigint): Promise<Span> {
    console.log(this)
    return await this._fetchFullSpan(number)
  }

  private async _fetchFullSpan(spanNumber: bigint): Promise<Span> {
    
    const { startBlock, endBlock } = await this.bkcValidatorSet.getSpanRange(
      spanNumber
    );
    const { validators } = await this.bkcValidatorSet.getValidators(
      startBlock
    );
    const blockRequests = this.rpc.createBlocksRequestList(startBlock, endBlock);
    const rpcBlocks = await this.rpc.getBlocks(blockRequests);
    return this._constructSpan(
      spanNumber,
      validators,
      startBlock,
      endBlock,
      blockRequests,
      rpcBlocks
    );
  }

  private _constructSpan(
    currentSpan: bigint,
    validators: string[],
    startBlock: bigint,
    endBlock: bigint,
    blockRequests: BlockRequests,
    rpcBlocks: RpcResponse<RpcBlock>[]
  ): Span {
    // recheck all data before calculating span
    if (endBlock - startBlock + 1n !== this.spanSize) {
      throw new Error(
        `constructSpan: the given range does not match with the span size; size=${this.spanSize})`
      );
    }
    if (BigInt(validators.length) !== this.spanSize) {
      throw new Error(
        "constructSpan: validators size does not match wth the span size"
      );
    }
    if (BigInt(blockRequests.length) !== this.spanSize) {
      throw new Error(
        "constructSpan: blockRequests size does not match wth the span size"
      );
    }
    if (BigInt(rpcBlocks.length) !== this.spanSize) {
      throw new Error(
        "constructSpan: rpcBlocks size does not match wth the span size"
      );
    }
    const span: Span = [];
    for (let i = 0; i < this.spanSize; i++) {
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
}

export const pos = new POS(
  rpc,
  bkcValidatorSet,
  slashManager,
  BigInt(50),
)