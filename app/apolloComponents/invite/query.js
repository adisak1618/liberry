import { Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const queryInvite = gql`
  query {
    findInvites {
      name
      role
      code
    }
  }
`
export default ({ children }) => {
  return (
    <Query query={queryInvite}>
      {children}
    </Query>
  )
}