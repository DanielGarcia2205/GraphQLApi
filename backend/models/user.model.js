import mongoose from "mongoose";

// Definición del esquema de usuario en la base de datos.
const userSchema = new mongoose.Schema(
  {
    // username: Nombre único de usuario para identificar al usuario en el sistema.
    username: {
      type: String, // Tipo de dato string para almacenar el nombre de usuario.
      required: true, // Campo obligatorio.
      unique: true, // Debe ser único en la base de datos para evitar duplicados.
    },
    // name: Nombre real del usuario.
    name: {
      type: String, // Tipo de dato string.
      required: true, // Campo obligatorio.
    },
    // password: Contraseña del usuario, que debe almacenarse encriptada para seguridad.
    password: {
      type: String, // Tipo de dato string.
      required: true, // Campo obligatorio.
    },
    // profilePicture: URL de la imagen de perfil del usuario. Campo opcional.
    profilePicture: {
      type: String, // Tipo de dato string.
      default: "", // Valor por defecto vacío si no se proporciona una imagen.
    },
    // gender: Género del usuario, con valores permitidos "male" o "female".
    gender: {
      type: String, // Tipo de dato string.
      enum: ["male", "female"], // Solo permite valores "male" o "female".
    },
  },
  // timestamps: Agrega automáticamente los campos createdAt y updatedAt.
  { timestamps: true }
);

// Creación del modelo User basado en userSchema.
const User = mongoose.model("User", userSchema);

// Exportación del modelo User para su uso en otras partes del proyecto.
export default User;
