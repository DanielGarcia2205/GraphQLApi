import mongoose from "mongoose"; // biblioteca de modelado para MongoDB en Node.js

// Función asincrónica para conectar a la base de datos MongoDB
export const connectDB = async () => {
  try {
    // Intenta establecer conexión con la base de datos usando la URL de conexión en las variables de entorno
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Muestra en consola un mensaje indicando que la conexión ha sido exitosa
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Muestra el mensaje de error en consola si falla la conexión
    console.error(`Error: ${err.message}`);

    // Finaliza el proceso con un código de salida 1 para indicar error
    process.exit(1);
  }
};
