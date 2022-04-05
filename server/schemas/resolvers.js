const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


// Day 03: 25, 26
// Not sure if user._id is correct. 
const resolvers = {
    Query: {
        me: async ( parent, args, context ) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('Cannot find a user with this id!')
        },
    },


    // Day 03: 26

    Mutation: {
    
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },

        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },

          saveBook: async (parent, { booksSaved }, context) => {
            if (context.user) {
              const book = await User.create({
                // bookId,
                authors,
                description,
                title,
                image,
                link,
              });
      
              await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { books: book._id } }
              );
      
              return book;
            }
            throw new AuthenticationError('You need to be logged in!');
          },
        

    },
  };
  
  module.exports = resolvers;