type RpcResponse<T> = {
  jsonrpc: string;
  id: number;
  result: T | null;
};

type RpcBlock = {
  difficulty: string;
  extraData: string;
  gasLimit: string;
  gasUsed: string;
  hash: string;
  logsBloom: string;
  miner: string;
  mixHash: string;
  nonce: string;
  number: string;
  parentHash: string;
  receiptsRoot: string;
  sha3Uncles: string;
  size: string;
  stateRoot: string;
  timestamp: string;
  totalDifficulty: string;
  transactions: string[]
  transactionsRoot: string;
  uncles: string[];
};


/* 
 * Use for requesting multiple blocks from rpc
 * BlockRequest must include its own Id
 */

type BlockRequest = {
  id: number;
  blockNumber: number | bigint;
}

type BlockRequests = BlockRequest[]