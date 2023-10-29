type Span = SpanBlock[];

type SpanBlock = {
  blockNumber: bigint;
  spanNumber: bigint;
  validator: string;
  status: SpanBlockStatus;
}

// Handle immutable status
type SpanBlockStatus = {
  isProposed: boolean;
  difficulty: number | bigint;
  totalreward: number | bigint;
  timestamp: Date;
}