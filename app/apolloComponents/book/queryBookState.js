import { Query, graphql } from 'react-apollo'
import gql from 'graphql-tag'

export const queryBookState = gql`
  query {
    bookState {
      book
      success
      returnBook
    }
  }
`
export default ({ children }) => {
  return (
    <Query query={queryBookState}>
      {children}
    </Query>
  )
}