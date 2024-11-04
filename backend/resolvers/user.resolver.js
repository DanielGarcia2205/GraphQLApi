import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    // Mutation para registrar un nuevo usuario.
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;

        // Validación para asegurar que todos los campos requeridos estén presentes.
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        // Verifica si el usuario ya existe en la base de datos.
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("User already exists");
        }

        // Crea una contraseña encriptada con bcrypt.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // URLs de perfil predeterminadas basadas en el género del usuario.
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Crea un nuevo usuario con los datos proporcionados y la foto de perfil generada.
        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        // Guarda el usuario en la base de datos.
        await newUser.save();

        // Inicia la sesión del usuario recién registrado.
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signUp: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    // Mutation para iniciar sesión.
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;

        // Verifica que ambos campos sean proporcionados.
        if (!username || !password) throw new Error("All fields are required");

        // Usa la autenticación de Passport configurada para GraphQL.
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        // Inicia sesión del usuario autenticado.
        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },

    // Mutation para cerrar sesión.
    logout: async (_, __, context) => {
      try {
        // Cierra la sesión del usuario.
        await context.logout();

        // Destruye la sesión y borra la cookie de sesión.
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (err) {
        console.error("Error in logout:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Query: {
    // Query para obtener el usuario autenticado actual.
    authUser: async (_, __, context) => {
      try {
        // Usa el método `getUser` para obtener el usuario actual desde el contexto.
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser: ", err);
        throw new Error("Internal server error");
      }
    },

    // Query para obtener un usuario por su ID.
    user: async (_, { userId }) => {
      try {
        // Busca el usuario en la base de datos por ID.
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user query:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },

  // Resolver de campo específico para el tipo User.
  User: {
    // Resolver para obtener todas las transacciones asociadas al usuario.
    transactions: async (parent) => {
      try {
        // Busca las transacciones donde el `userId` coincida con el ID del usuario.
        const transactions = await Transaction.find({ userId: parent._id });
        return transactions;
      } catch (err) {
        console.log("Error in user.transactions resolver: ", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
};

export default userResolver;
