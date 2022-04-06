const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');


// Day 03: 25, 26 
const resolvers = {
    Query: {
        me: async ( parent, args, context ) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
              .select("-__v -password")
              .populate('books');

              return userData;

            }
            throw new AuthenticationError('Cannot find a user with this id!')
        },
    },


    // Day 03: 26

    Mutation: {


      addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
    
        loginUser: async (parent, { email, password }) => {
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



          saveBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id },
                    { 
                        $addToSet: {savedBooks: args.bookData},
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
          },

// QUESTION: Like this or like removeThought. Day 3, 26, 25
          removeBook: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                      $pull: {savedBooks: { bookId: args.bookId } },
                    },
                    { new: true }
                  );
            }
            throw new AuthenticationError('You need to be logged in!');
          },

    },
  };
  
  module.exports = resolvers;