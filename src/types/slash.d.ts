type WarnEvent = {
  signer: string;
  span: bigint;
  counter: bigint;
};

type RPCEvent<InnerType> = {
  blockNumber: number;
  inner: InnerType;
};
