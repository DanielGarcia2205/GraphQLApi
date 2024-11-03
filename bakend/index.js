import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const server = `#graphql

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
