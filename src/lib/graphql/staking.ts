import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GraphQLBaseClient } from ".";

const stakingPlatformGraphNodeApi = "https://gateway.prod.graphnode.internal.bbtserv.io/subgraphs/name/bitkubchain/pos"

const gqlClient = new ApolloClient({
  uri: stakingPlatformGraphNodeApi,
  cache: new InMemoryCache(),
});

class StakingPlatform extends GraphQLBaseClient {
  async getAllValidatorsInfo() {
    return (await this.client.query<ValidatorsQuery>({
      query: gql`
        {
          validators(where: { status: ACTIVE }) {
            blockSigner
            validatorId
            profile {
              id
              name
              image
            }
          }
        }
      `,
    })).data.validators;
  }
}

export const stakingPlatform = new StakingPlatform(gqlClient)