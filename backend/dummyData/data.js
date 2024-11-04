// Datos de ejemplo para probar la API de seguimiento de gastos sin conexión a una base de datos.
const users = [
  {
    _id: "1", // Identificador único del usuario.
    username: "user1", // Nombre de usuario.
    name: "User One", // Nombre real del usuario.
    password: "password1", // Contraseña del usuario.
    profilePicture: "profile1.jpg", // URL de la imagen de perfil del usuario.
    gender: "male", // Género del usuario.
  },
  {
    _id: "2",
    username: "user2",
    name: "User Two",
    password: "password2",
    profilePicture: "profile2.jpg",
    gender: "female",
  },
  {
    _id: "3",
    username: "user3",
    name: "User Three",
    password: "password3",
    profilePicture: "profile3.jpg",
    gender: "male",
  },
  {
    _id: "4",
    username: "user4",
    name: "User Four",
    password: "password4",
    profilePicture: "profile4.jpg",
    gender: "female",
  },
  {
    _id: "5",
    username: "user5",
    name: "User Five",
    password: "password5",
    profilePicture: "profile5.jpg",
    gender: "male",
  },
];

// Cada transacción está asociada a un usuario específico mediante el campo userId.
const transactions = [
  {
    _id: "1", // Identificador único de la transacción.
    userId: "1", // ID del usuario que realizó la transacción.
    description: "Transaction One", // Descripción de la transacción.
    paymentType: "CASH", // Tipo de pago (por ejemplo, "CASH" o "CARD").
    category: "Category One", // Categoría de la transacción.
    amount: 100.0, // Monto de la transacción.
    location: "Location One", // Ubicación donde se realizó la transacción.
    date: "2024-01-01", // Fecha de la transacción.
  },
  {
    _id: "2",
    userId: "2",
    description: "Transaction Two",
    paymentType: "CARD",
    category: "Category Two",
    amount: 200.0,
    location: "Location Two",
    date: "2024-01-02",
  },
  {
    _id: "3",
    userId: "3",
    description: "Transaction Three",
    paymentType: "CASH",
    category: "Category Three",
    amount: 300.0,
    location: "Location Three",
    date: "2024-01-03",
  },
  {
    _id: "4",
    userId: "4",
    description: "Transaction Four",
    paymentType: "CARD",
    category: "Category Four",
    amount: 400.0,
    location: "Location Four",
    date: "2024-01-04",
  },
  {
    _id: "5",
    userId: "5",
    description: "Transaction Five",
    paymentType: "CASH",
    category: "Category Five",
    amount: 500.0,
    location: "Location Five",
    date: "2024-01-05",
  },
];

// Exportación de los datos para uso en otros módulos del proyecto.
export { users, transactions };
