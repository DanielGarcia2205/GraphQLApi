import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

// Configuración de Passport para manejar la autenticación de usuarios.
export const configurePassport = async () => {
  // Función para serializar el usuario. Se llama cuando el usuario inicia sesión.
  passport.serializeUser((user, done) => {
    console.log("Serializing user");
    // Guarda el ID del usuario en la sesión para identificar al usuario en futuras solicitudes.
    done(null, user.id);
  });

  // Función para deserializar el usuario. Se llama en cada solicitud que requiere autenticación.
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user");
    try {
      // Busca al usuario en la base de datos utilizando el ID almacenado en la sesión.
      const user = await User.findById(id);
      done(null, user); // Si se encuentra, pasa el usuario al siguiente middleware.
    } catch (err) {
      done(err); // Si hay un error, pasa el error al siguiente middleware.
    }
  });

  // Configuración de la estrategia local de Passport para GraphQL.
  passport.use(
    new GraphQLLocalStrategy(async (username, password, done) => {
      try {
        // Busca el usuario en la base de datos por nombre de usuario.
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("Invalid username or password"); // Si el usuario no existe, lanza un error.
        }

        // Compara la contraseña ingresada con la contraseña en la base de datos.
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error("Invalid username or password"); // Si la contraseña no coincide, lanza un error.
        }

        // Si el usuario y la contraseña son válidos, devuelve el usuario.
        return done(null, user);
      } catch (err) {
        return done(err); // En caso de error, devuelve el error.
      }
    })
  );
};
