const {typeDefs, resolvers} = require("./src/graphql")
const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require('@graphql-tools/schema'); //necessário instalar antes -> npm i @graphql-tools/schema

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
    schema, 
    formatError: (err) => {
        if (err.message.startsWith("Usuário Existente:")) {
          return new Error(err.message);
        }
      return err;
      },
});

server.listen().then(({ url }) => console.log(url));