const userTypeDef = `#graphql
  # Tipo User: Contiene información básica de un usuario en el sistema.
  type User {
    _id: ID!               # ID único del usuario.
    username: String!      # Nombre de usuario único.
    name: String!          # Nombre real.
    password: String!      # Contraseña segura.
    profilePicture: String # URL de la imagen de perfil (opcional).
    gender: String!        # Género.
    transactions: [Transaction!] # Transacciones asociadas al usuario.
  }

  # Consultas para el tipo User
  type Query {
    authUser: User       # Usuario autenticado actualmente.
    user(userId: ID!): User # Datos de un usuario específico.
    users: [User]        # Lista de todos los usuarios.
  }

  # Mutaciones para usuarios y autenticación
  type Mutation {
    signUp(input: SignUpInput!): User     # Registro de nuevo usuario.
    login(input: LoginInput!): User       # Inicio de sesión.
    logout: LogoutResponse                # Cierre de sesión.
  }

  # Input para registro
  input SignUpInput {
    username: String!
    name: String!
    password: String!
    gender: String!
  }

  # Input para inicio de sesión
  input LoginInput {
    username: String!
    password: String!
  }

  # Respuesta al cerrar sesión
  type LogoutResponse {
    message: String!  # Confirmación de cierre de sesión.
  }
`;

// Exportación de userTypeDef para uso en el servidor GraphQL.
export default userTypeDef;
