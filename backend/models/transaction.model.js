import mongoose from "mongoose";

// Definición del esquema de la transacción en la base de datos.
const transactionSchema = new mongoose.Schema({
  // userId: ID del usuario que realizó la transacción, referenciado al modelo de Usuario.
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dato ObjectId para referenciar un usuario.
    ref: "User", // Nombre del modelo de usuario al que hace referencia.
    required: true, // Campo obligatorio.
  },
  // description: Breve descripción de la transacción.
  description: {
    type: String, // Tipo de dato string para almacenar la descripción.
    required: true, // Campo obligatorio.
  },
  // paymentType: Método de pago utilizado para la transacción.
  paymentType: {
    type: String, // Tipo de dato string.
    enum: ["cash", "card"], // Solo permite valores "cash" o "card".
    required: true, // Campo obligatorio.
  },
  // category: Categoría de la transacción (ahorro, gasto, o inversión).
  category: {
    type: String, // Tipo de dato string.
    enum: ["saving", "expense", "investment"], // Valores permitidos.
    required: true, // Campo obligatorio.
  },
  // amount: Monto de la transacción.
  amount: {
    type: Number, // Tipo de dato numérico.
    required: true, // Campo obligatorio.
  },
  // location: Ubicación de la transacción, con valor por defecto "Unknown".
  location: {
    type: String, // Tipo de dato string.
    default: "Unknown", // Valor por defecto si no se proporciona.
  },
  // date: Fecha en la que se realizó la transacción.
  date: {
    type: Date, // Tipo de dato fecha.
    required: true, // Campo obligatorio.
  },
});

// Creación del modelo Transaction basado en transactionSchema.
const Transaction = mongoose.model("Transaction", transactionSchema);

// Exportación del modelo Transaction para su uso en otras partes del proyecto.
export default Transaction;
