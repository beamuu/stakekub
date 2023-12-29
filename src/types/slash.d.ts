type WarnEvent = {
  signer: string;
  span: bigint;
  counter: bigint;
};

type RPCEvent<InnerType> = {
  timestamp: number;
  blockNumber: number;
  inner: InnerType;
};
