import { Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const queryGetProfile = gql`
  query {
    getProfile {
      name
      lineid
      picture
      exp
    }
  }
`
export default ({ children }) => {
  return (
    <Query query={queryGetProfile}>
      {children}
    </Query>
  )
}