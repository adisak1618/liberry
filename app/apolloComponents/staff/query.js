import { Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const queryStuff = gql`
  query {
    findStaffs {
      name
      lineid
      role
      profile_url
    }
  }
`
export default ({ children }) => {
  return (
    <Query query={queryStuff}>
      {children}
    </Query>
  )
}