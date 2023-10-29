import { EventLog } from "ethers";
import { SmartContract, contracts } from ".";
import abi from "../abi/slashmanager.json"
import { ethclient } from "@/lib/ethers";

export class SlashManager extends SmartContract {
  async warns() {
    let eventName = this.c.getEvent("Warn")
    const warns = await this.c.queryFilter(eventName)
    const warnEvents: WarnEvent[] = []
    for (const event of warns) {
      let obj = (event as EventLog).args.toObject()
      warnEvents.push(obj as WarnEvent)
    }
    console.log(warnEvents)
  }
}

export const slashManager = new SlashManager(contracts.SlashManager.address, abi, ethclient)