import { EventLog } from "ethers";
import { SmartContract, contracts } from ".";
import abi from "../abi/slashmanager.json"
import { ethclient } from "@/lib/ethers";

export class SlashManager extends SmartContract {
  async warns() {
    let eventName = this.c.getEvent("Warn")
    const warns = await this.c.queryFilter(eventName)
    const warnEvents: RPCEvent<WarnEvent>[] = []
    for (const event of warns) {
      const e = event as EventLog
      let inner = e.args.toObject()
      const rpcEvent:RPCEvent<WarnEvent> = {
        blockNumber: e.blockNumber,
        inner: inner as WarnEvent,
      }
      warnEvents.push(rpcEvent)
    }
    return warnEvents
  }
  async warnsBetween(from: number | bigint, to: number | bigint) {
    let eventName = this.c.getEvent("Warn")
    const warns = await this.c.queryFilter(eventName, from ,to)
    const warnEvents: RPCEvent<WarnEvent>[] = []
    for (const event of warns) {
      const e = event as EventLog
      let inner = e.args.toObject()
      const rpcEvent:RPCEvent<WarnEvent> = {
        blockNumber: e.blockNumber,
        inner: inner as WarnEvent,
      }
      warnEvents.push(rpcEvent)
    }
    return warnEvents
  }
}

export const slashManager = new SlashManager(contracts.SlashManager.address, abi, ethclient)