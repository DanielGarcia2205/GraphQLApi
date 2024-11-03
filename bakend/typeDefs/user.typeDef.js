const userTypeDef = `#graphql

  # Tipo User: Representa a un usuario en el sistema.
  # Este tipo contiene la información básica de un usuario, incluida su
  # identificación, nombre de usuario, nombre real, contraseña (almacenada con seguridad),
  # foto de perfil, género y una lista de sus transacciones.
  type User {
    _id: ID!               # Identificador único del usuario.
    username: String!      # Nombre de usuario único para el usuario.
    name: String!          # Nombre real del usuario.
    password: String!      # Contraseña del usuario (debe almacenarse de forma segura).
    profilePicture: String # URL opcional de la imagen de perfil del usuario.
    gender: String!        # Género del usuario.
    transactions: [Transaction!] # Lista de transacciones asociadas con el usuario.
  }

  # Consultas disponibles para el tipo User.
  type Query {
    # authUser: Devuelve el usuario autenticado actualmente.
    # Utilizado para obtener los datos del usuario que está actualmente logueado.
    authUser: User

    # user: Obtiene los datos de un usuario específico.
    # Recibe como argumento el 'userId' del usuario deseado.
    user(userId: ID!): User
  }

  # Mutaciones disponibles para gestionar usuarios y autenticación.
  type Mutation {
    # signUp: Permite a un nuevo usuario registrarse en el sistema.
    # Recibe los datos de registro en el objeto SignUpInput.
    signUp(input: SignUpInput!): User

    # login: Permite a un usuario iniciar sesión.
    # Recibe las credenciales en el objeto LoginInput.
    login(input: LoginInput!): User

    # logout: Cierra la sesión del usuario autenticado.
    # Devuelve un mensaje de confirmación en LogoutResponse.
    logout: LogoutResponse
  }

  # Entrada para el registro de un nuevo usuario.
  # Contiene los campos obligatorios para crear un usuario en el sistema.
  input SignUpInput {
    username: String!  # Nombre de usuario único.
    name: String!      # Nombre real del usuario.
    password: String!  # Contraseña para el usuario.
    gender: String!    # Género del usuario.
  }

  # Entrada para el inicio de sesión de un usuario.
  # Incluye las credenciales requeridas.
  input LoginInput {
    username: String!  # Nombre de usuario registrado.
    password: String!  # Contraseña asociada.
  }

  # Respuesta al cerrar sesión.
  # Devuelve un mensaje de confirmación al usuario.
  type LogoutResponse {
    message: String!   # Mensaje confirmando el cierre de sesión.
  }

`;

// Exportación de userTypeDef para que pueda ser utilizado en el servidor GraphQL.
export default userTypeDef;
