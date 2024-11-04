import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typeDef.js"; // Definiciones de tipos y resolvers de usuario
import transactionTypeDef from "./transaction.typeDef.js"; // Definiciones de tipos y resolvers de transacción

// Fusiona los typeDefs en un solo esquema
const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

// Exporta el esquema combinado para el servidor GraphQL
export default mergedTypeDefs;
