import { gql } from '@apollo/client';

// user data being pulled through
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

// data to pull through to add new user
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

// data to pull through when saving a book
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

// data to pull through when removing a book
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
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

