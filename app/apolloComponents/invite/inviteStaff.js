import { Query, graphql, Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { queryInvite } from './query';
// import { client } from "../../lib/with-apollo-client";

export const InviteStaffMultation = gql`
  mutation ($name: String!, $lineid: String!, $profile_url: String!, $code: String!){
    createStaff(name: $name, lineid: $lineid, profile_url: $profile_url, code: $code) {
      name
    }
  }
`

export default async (client, data) => {
  const result = await client.mutate({
    mutation: InviteStaffMultation,
    variables: data,
  });
  return result;
}
