import { Query, graphql, Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { queryInvite } from './query';
import { client } from "../../lib/with-apollo-client";

export const InviteMultation = gql`
  mutation CreateInvite ($name: String!, $role: String!){
    createInvite(name: $name, role: $role) {
      name
      role
      code
    }
  }
`

export default async (data) => {
  console.log('test');
  const result = await client.mutate({
    mutation: InviteMultation,
    variables: data,
    // refetchQueries: [{ query: queryInvite }]
    update: (store, {data}) => {
      const invitecache = store.readQuery({
        query: queryInvite
      })
      store.writeQuery({
        query: queryInvite,
        data: {
          findInvites: [...invitecache.findInvites, data.createInvite]
        }
      })
    }
  });
}
