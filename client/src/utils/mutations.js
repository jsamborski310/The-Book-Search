import { gql } from '@apollo/client';

// Day 03: 26
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {

    loginUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {

    addUser(username: $username, email: $email, password: $password) {

      token
      user {
        _id
        username
        email
      }
    }
  }
`;


export const SAVE_BOOK = gql`
  mutation saveBook($bookData: savedBook!) {

    saveBook(bookData: $bookData) {
      _id,
      username,
      email,
      bookCount,
      savedBooks, {
        bookId,
        authors,
        description,
        title,
        image,
        link
      }
    }
  }
`;

// Day 03: 25

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $ID) {
      _id,
      username,
      email,
      bookCount,
      savedBooks, {
        bookId,
        authors,
        description,
        title,
        image,
        link
      }
    }
  }
`;

