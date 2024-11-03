const transactionTypeDef = `#graphql

  # Tipo Transaction: Representa una transacción individual de un usuario.
  # Este tipo incluye información sobre la transacción, como su ID, ID del usuario,
  # descripción, tipo de pago, categoría, cantidad, ubicación y fecha de la transacción.
  type Transaction {
    _id: ID!                # Identificador único de la transacción.
    userId: ID!             # Identificador del usuario al que pertenece la transacción.
    description: String!    # Descripción de la transacción (por ejemplo, "Compra en supermercado").
    paymentType: String!    # Tipo de pago (por ejemplo, "Tarjeta de crédito", "Efectivo").
    category: String!       # Categoría de la transacción (por ejemplo, "Alimentos", "Transporte").
    amount: Float!          # Monto de la transacción.
    location: String        # Ubicación opcional donde se realizó la transacción.
    date: String!           # Fecha de la transacción en formato de cadena.
    user: User!             # Referencia al usuario asociado con la transacción.
  }

  # Consultas disponibles para el tipo Transaction.
  type Query {
    # transactions: Devuelve una lista de todas las transacciones.
    # Utilizado para recuperar todas las transacciones de la base de datos.
    transactions: [Transaction!]

    # transaction: Devuelve una transacción específica.
    # Recibe como argumento el 'transactionId' de la transacción deseada.
    transaction(transactionId: ID!): Transaction

    # categoryStatistics: Devuelve estadísticas por categoría.
    # Retorna un array de objetos CategoryStatistics con el total por cada categoría.
    categoryStatistics: [CategoryStatistics!]
  }

  # Mutaciones disponibles para gestionar transacciones.
  type Mutation {
    # createTransaction: Crea una nueva transacción.
    # Recibe los datos de la transacción en el objeto CreateTransactionInput.
    createTransaction(input: CreateTransactionInput!): Transaction!

    # updateTransaction: Actualiza una transacción existente.
    # Recibe los datos a modificar en el objeto UpdateTransactionInput.
    updateTransaction(input: UpdateTransactionInput!): Transaction!

    # deleteTransaction: Elimina una transacción específica.
    # Recibe el ID de la transacción a eliminar.
    deleteTransaction(transactionId: ID!): Transaction!
  }

  # Tipo CategoryStatistics: Representa las estadísticas de gastos por categoría.
  # Este tipo contiene la categoría y el monto total asociado a dicha categoría.
  type CategoryStatistics {
    category: String!      # Categoría de gastos (por ejemplo, "Alimentos").
    totalAmount: Float!    # Suma total de los montos en esta categoría.
  }

  # Entrada para la creación de una transacción.
  # Contiene los campos obligatorios y opcionales para registrar una nueva transacción.
  input CreateTransactionInput {
    description: String!   # Descripción de la transacción.
    paymentType: String!   # Tipo de pago.
    category: String!      # Categoría de la transacción.
    amount: Float!         # Monto de la transacción.
    date: String!          # Fecha de la transacción.
    location: String       # Ubicación opcional.
  }

  # Entrada para actualizar una transacción.
  # Permite actualizar campos específicos de una transacción existente.
  input UpdateTransactionInput {
    transactionId: ID!     # Identificador de la transacción a actualizar.
    description: String    # Descripción actualizada de la transacción.
    paymentType: String    # Tipo de pago actualizado.
    category: String       # Categoría actualizada de la transacción.
    amount: Float          # Monto actualizado.
    location: String       # Ubicación actualizada.
    date: String           # Fecha actualizada.
  }

`;

// Exportación de transactionTypeDef para que pueda ser utilizado en el servidor GraphQL.
export default transactionTypeDef;
