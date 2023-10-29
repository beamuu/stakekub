import { WebSocketProvider } from "ethers";
import { BaseContract, Contract, Interface, InterfaceAbi, JsonRpcProvider } from "ethers"

export class SmartContract {
  protected c: BaseContract

  constructor(address: string, abi: Interface | InterfaceAbi, provider: WebSocketProvider | JsonRpcProvider) {
    this.c = new Contract(address, abi).connect(provider)
  }

  protected async callFunction(name: string, ...args: any) {
    const func = this.c.getFunction(name);
    const result = await func.staticCallResult(...args);
    return result;
  }
}

export const contracts = {
  SlashManager: {
    address: "0xEF6F6c6fdaEAc0326FFE1413D7d7CCAA7B56b753"
  },
  BKCValidatorSet: {
    address: "0x61fAde2541dD13e855034346B4cA3576AB453FeC",
  }
}