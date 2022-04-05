// Day 03: 25 & Day 03: 28, Main
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

# https://www.apollographql.com/docs/apollo-server/schema/schema/
# https://atheros.ai/blog/input-object-type-as-an-argument-for-graphql-mutations-and-queries

  input BookInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(booksSaved: BookInput!): User
    # Day 03: 26 
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;
