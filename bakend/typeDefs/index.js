import { mergeTypeDefs } from "@graphql-tools/merge";

// Importación de los typeDefs de usuario y transacción.
// Estos archivos contienen las definiciones de tipos, consultas y mutaciones
// específicas para los módulos de usuario y transacción.
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

// Combinación de los typeDefs en una sola definición de esquema.
// mergeTypeDefs toma un array de typeDefs y los fusiona en un solo esquema,
// permitiendo que todos los tipos y resolvers se gestionen desde un solo lugar.
const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

// Exportación del esquema combinado para ser utilizado en la configuración
// del servidor GraphQL. Al exportar mergedTypeDefs, se facilita la integración
// de todos los tipos y resolvers en el punto de entrada del servidor.
export default mergedTypeDefs;
