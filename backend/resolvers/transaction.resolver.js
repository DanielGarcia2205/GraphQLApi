// Importa el modelo Transaction para acceder y manipular los datos de transacciones
import Transaction from "../models/transaction.model.js";
// Importa el modelo User para acceder a los datos de usuarios
import User from "../models/user.model.js";

// Define el resolver para manejar consultas (Query) y mutaciones (Mutation) de transacciones
const transactionResolver = {
  Query: {
    // Consulta para obtener todas las transacciones del usuario autenticado
    transactions: async (_, __, context) => {
      try {
        // Verifica si el usuario está autenticado
        if (!context.getUser()) throw new Error("Unauthorized");

        // Obtiene el ID del usuario autenticado
        const userId = await context.getUser()._id;

        // Busca las transacciones asociadas al usuario
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (err) {
        // Muestra un error en caso de fallar al obtener las transacciones
        console.error("Error getting transactions:", err);
        throw new Error("Error getting transactions");
      }
    },
    // Consulta para obtener una transacción específica por ID
    transaction: async (_, { transactionId }) => {
      try {
        // Busca la transacción usando el ID proporcionado
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (err) {
        // Muestra un error en caso de fallar al obtener la transacción
        console.error("Error getting transaction:", err);
        throw new Error("Error getting transaction");
      }
    },
    // Consulta para obtener estadísticas de categorías basadas en las transacciones del usuario autenticado
    categoryStatistics: async (_, __, context) => {
      // Verifica si el usuario está autenticado
      if (!context.getUser()) throw new Error("Unauthorized");

      // Obtiene el ID del usuario autenticado
      const userId = context.getUser()._id;
      // Busca todas las transacciones del usuario
      const transactions = await Transaction.find({ userId });
      const categoryMap = {};

      // Recorre cada transacción para sumar los montos según su categoría
      transactions.forEach((transaction) => {
        // Si la categoría aún no existe en el mapa, la inicializa
        if (!categoryMap[transaction.category]) {
          categoryMap[transaction.category] = 0;
        }
        // Agrega el monto de la transacción a la categoría correspondiente
        categoryMap[transaction.category] += transaction.amount;
      });

      // Convierte el mapa de categorías en un arreglo de objetos para la respuesta
      return Object.entries(categoryMap).map(([category, totalAmount]) => ({
        category,
        totalAmount,
      }));
    },
  },
  Mutation: {
    // Mutación para crear una nueva transacción
    createTransaction: async (_, { input }, context) => {
      try {
        // Crea una nueva transacción con los datos proporcionados y el ID del usuario autenticado
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        // Guarda la transacción en la base de datos
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        // Muestra un error en caso de fallar al crear la transacción
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
    // Mutación para actualizar una transacción existente
    updateTransaction: async (_, { input }) => {
      try {
        // Encuentra y actualiza la transacción por su ID con los nuevos datos
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          {
            new: true,
          }
        );
        return updatedTransaction;
      } catch (err) {
        // Muestra un error en caso de fallar al actualizar la transacción
        console.error("Error updating transaction:", err);
        throw new Error("Error updating transaction");
      }
    },
    // Mutación para eliminar una transacción existente
    deleteTransaction: async (_, { transactionId }) => {
      try {
        // Encuentra y elimina la transacción por su ID
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (err) {
        // Muestra un error en caso de fallar al eliminar la transacción
        console.error("Error deleting transaction:", err);
        throw new Error("Error deleting transaction");
      }
    },
  },
  // Resolver adicional para obtener información del usuario de una transacción
  Transaction: {
    user: async (parent) => {
      // Obtiene el ID del usuario desde la transacción
      const userId = parent.userId;
      try {
        // Busca y devuelve los datos del usuario asociado
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        // Muestra un error en caso de fallar al obtener el usuario
        console.error("Error getting user:", err);
        throw new Error("Error getting user");
      }
    },
  },
};

// Exporta el resolver de transacciones para ser utilizado en el servidor de GraphQL
export default transactionResolver;
