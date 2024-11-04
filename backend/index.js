import express from "express"; // Framework para manejar el servidor
import http from "http"; // Módulo para crear servidores HTTP
import cors from "cors"; // Middleware para permitir solicitudes entre dominios
import dotenv from "dotenv"; // Módulo para manejar variables de entorno
import path from "path"; // Módulo para manejar rutas de archivos
import passport from "passport"; // Middleware para autenticación
import session from "express-session"; // Middleware para manejar sesiones
import connectMongo from "connect-mongodb-session"; // Almacena sesiones en MongoDB

import { ApolloServer } from "@apollo/server"; // Servidor Apollo para GraphQL
import { expressMiddleware } from "@apollo/server/express4"; // Middleware de Apollo para Express
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer"; // Plugin para drenar el servidor HTTP

import { buildContext } from "graphql-passport"; // Contexto para la autenticación GraphQL

import mergedResolvers from "./resolvers/index.js"; // Resolvers fusionados para GraphQL
import mergedTypeDefs from "./typeDefs/index.js"; // TypeDefs fusionados para GraphQL

import { connectDB } from "./db/connectDB.js"; // Función para conectar a la base de datos
import { configurePassport } from "./passport/passport.config.js"; // Configuración de Passport

import job from "./cron.js"; // Importa la tarea cron

// Carga las variables de entorno desde un archivo .env
dotenv.config();

// Configura Passport para la autenticación
configurePassport();

// Inicia la tarea cron
job.start();

// Establece el directorio base
const __dirname = path.resolve();
const app = express(); // Crea una nueva aplicación Express

const httpServer = http.createServer(app); // Crea un servidor HTTP usando la aplicación Express

// Configura el almacenamiento de sesiones en MongoDB
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI, // URI de conexión a MongoDB desde las variables de entorno
  collection: "sessions", // Nombre de la colección donde se guardarán las sesiones
});

// Manejo de errores para el almacenamiento de sesiones
store.on("error", (err) => console.log(err));

// Middleware para manejar sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Clave secreta para firmar la cookie de sesión
    resave: false, // Indica si se debe guardar la sesión en el almacenamiento en cada solicitud
    saveUninitialized: false, // Indica si se deben guardar sesiones no inicializadas
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Duración de la cookie (7 días)
      httpOnly: true, // Previene ataques de Cross-Site Scripting (XSS)
    },
    store: store, // Almacenamiento de sesiones en MongoDB
  })
);

// Inicializa Passport y maneja la sesión
app.use(passport.initialize());
app.use(passport.session());

// Inicializa el servidor Apollo
const server = new ApolloServer({
  typeDefs: mergedTypeDefs, // Fusiona los typeDefs
  resolvers: mergedResolvers, // Fusiona los resolvers
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], // Plugin para drenar el servidor HTTP
});

// Asegura que el servidor Apollo esté listo antes de continuar
await server.start();

// Configura el middleware de Express para manejar CORS, análisis de cuerpos de solicitudes,
// y el middleware de Apollo Server.
app.use(
  "/graphql", // Ruta para las solicitudes GraphQL
  cors({
    origin: "http://localhost:3000", // Permite solicitudes desde el cliente en esta dirección
    credentials: true, // Permite el envío de cookies y credenciales
  }),
  express.json(), // Middleware para analizar solicitudes JSON
  // expressMiddleware acepta los mismos argumentos:
  // una instancia de Apollo Server y opciones de configuración opcionales
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }), // Configura el contexto para las resoluciones
  })
);

// Sirve archivos estáticos desde la carpeta frontend/dist
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Captura todas las rutas no definidas y envía el archivo index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html")); // Envía el archivo principal del frontend
});

// Modificación del inicio del servidor
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve)); // Escucha en el puerto 4000
await connectDB(); // Conecta a la base de datos

// Mensaje de confirmación de que el servidor está listo
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
