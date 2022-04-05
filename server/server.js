const express = require('express');

// DONE| Day 03: 25: Pulled in ApolloServer
const { ApolloServer } = require('apollo-server-express');
// DONE| Day 03: 25: Pulled in authMiddleware
const { authMiddleware } = require('./utils/auth');
// DONE| Day 03: 25: Pulled in typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');


const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3001;

// DONE| Day 03: 25: Establishes Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// DONE| Day 03: 25: Creates a new instance of an Apollow server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
    })
  })
};

// DONE| Day 03: 25: Calls the async function to start the server
startApolloServer(typeDefs, resolvers);