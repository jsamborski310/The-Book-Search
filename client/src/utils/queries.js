import { gql } from '@apollo/client';

// Day 03: 28

export const QUERY_GET_ME = gql`
  query me {
    me {
      _id,
      username,
      email,
      bookCount,
      savedBooks,
    }
  }
`;


