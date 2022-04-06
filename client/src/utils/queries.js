import { gql } from '@apollo/client';

// Day 03: 28

export const GET_ME = gql`
  query me {
    me {
      _id,
      username,
      email,
      bookCount,
      savedBooks {
        bookId,
        authors,
        description,
        title,
        image,
        link,
      },
    }
  }
`;


