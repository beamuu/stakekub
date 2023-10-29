export function getBlockRequestIdFromBlockNumber(
  requests: BlockRequests,
  blockNumber: bigint | number
) {
  for (const req of requests) {
    if (req.blockNumber === blockNumber) {
      return req.id;
    }
  }
  return null;
}

export function getRpcResponseById<ResultT>(
  rpcResponses: RpcResponse<ResultT>[],
  id: number
) {
  for (const each of rpcResponses) {
    if (each.id === id) {
      return each;
    }
  }
  return null;
}
