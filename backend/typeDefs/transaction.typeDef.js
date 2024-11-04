const transactionTypeDef = `#graphql
  # Tipo Transaction: Representa una transacción de un usuario.
  type Transaction {
    _id: ID!              # ID único de la transacción.
    userId: ID!           # ID del usuario dueño de la transacción.
    description: String!  # Descripción (e.g., "Compra en supermercado").
    paymentType: String!  # Tipo de pago (e.g., "Tarjeta de crédito").
    category: String!     # Categoría (e.g., "Alimentos").
    amount: Float!        # Monto de la transacción.
    location: String      # Ubicación (opcional).
    date: String!         # Fecha de la transacción.
    user: User!           # Usuario asociado.
  }

  # Consultas para transacciones
  type Query {
    transactions: [Transaction!]         # Lista de todas las transacciones.
    transaction(transactionId: ID!): Transaction  # Transacción específica.
    categoryStatistics: [CategoryStatistics!]     # Estadísticas por categoría.
  }

  # Mutaciones para gestionar transacciones
  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!  # Crea una nueva transacción.
    updateTransaction(input: UpdateTransactionInput!): Transaction!  # Actualiza una transacción.
    deleteTransaction(transactionId: ID!): Transaction!              # Elimina una transacción.
  }

  # Estadísticas por categoría
  type CategoryStatistics {
    category: String!      # Categoría de gastos.
    totalAmount: Float!    # Total en esta categoría.
  }

  # Input para crear una transacción
  input CreateTransactionInput {
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  # Input para actualizar una transacción
  input UpdateTransactionInput {
    transactionId: ID!
    description: String
    paymentType: String
    category: String
    amount: Float
    location: String
    date: String
  }
`;

// Exportación de transactionTypeDef para uso en el servidor GraphQL.
export default transactionTypeDef;
