import gql from 'graphql-tag';
// import { client } from "../../lib/with-apollo-client";

export const findBookQuery = gql`
  query ($isbn: String!){
    findBooks(isbn: $isbn) {
      name
    }
  }
`

export default async (client, data) => {
  const result = await client.query({
    query: findBookQuery,
    variables: data,
  });
  return result;
}
