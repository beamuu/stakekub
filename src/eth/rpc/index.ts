import { mainnetRpcInstance } from "@/lib/axios";
import { AxiosInstance } from "axios";

export class RPC {
  private inst: AxiosInstance;
  constructor(instance: AxiosInstance) {
    this.inst = instance;
  }

  public createBlocksRequestList(
    from: bigint | number,
    to: bigint | number
  ): BlockRequests {
    const res: BlockRequests = [];
    let counter = 0;
    for (let i = from; i <= to; i++) {
      res.push({
        id: counter,
        blockNumber: i,
      });
      counter++;
    }
    return res;
  }

  public async getBlocks(reqs: BlockRequests) {
    const rpcPayload = [];
    for (const request of reqs) {
      const hex = "0x" + request.blockNumber.toString(16);
      rpcPayload.push({
        jsonrpc: "2.0",
        method: "eth_getBlockByNumber",
        params: [hex, false], // Block number 1000 (hex)
        id: request.id,
      });
    }
    const res = await this.inst.post<RpcResponse<RpcBlock>[]>("/", rpcPayload);
    return res.data;
  }
  public async getCurrentBlockNumber() {}
}

export const rpc = new RPC(mainnetRpcInstance);
