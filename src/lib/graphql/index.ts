import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export class GraphQLBaseClient {
  protected client: ApolloClient<NormalizedCacheObject>

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.client = client
  }
}