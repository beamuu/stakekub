import { ethclient } from "@/lib/ethers";
import { SmartContract, contracts } from ".";
import abi from "../abi/bkcvalidatorset.json";
import { Result } from "ethers";

export class BKCValidatorSet extends SmartContract {
  async currentSpanNumber() {
    const result = await this.callFunction("currentSpanNumber");
    const num = result.toArray()[0];
    return BigInt(num);
  }
  async span() {
    const result = await this.callFunction("SPAN");
    const num = result.toArray()[0];
    return BigInt(num);
  }

  async getValidators(blockNumber: bigint | number) {
    const results = await this.callFunction("getValidators", blockNumber);
    const arrs = results.toArray();
    if (arrs.length != 3) {
      throw new Error("getValidators result does not contains 3 sub-elements");
    }
    const validators = arrs[0] as Result;
    const powers = arrs[1] as Result;
    const systemContracts = arrs[2] as Result;
    return {
      validators: validators.toArray() as string[],
      powers: powers.toArray() as bigint[],
      systemContracts: systemContracts.toArray() as string[],
    };
  }

  async getSpanRange(spanNumber: bigint | number) {
    const results = await this.callFunction("getSpanRange", spanNumber);
    const arrs = results.toArray();
    return {
      startBlock: arrs[0] as bigint,
      endBlock: arrs[1] as bigint,
    }
  }
}

export const bkcValidatorSet = new BKCValidatorSet(
  contracts.BKCValidatorSet.address,
  abi,
  ethclient
);
