import { gql } from '@apollo/client';

// user data
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


