import cron from "cron"; // Módulo para programar tareas cron
import https from "https"; // Módulo para realizar solicitudes HTTPS

// URL del endpoint que se va a consultar periódicamente
const URL = "https://graphql-crash-course.onrender.com";

// Define un nuevo trabajo cron que se ejecutará cada 14 minutos
const job = new cron.CronJob("*/14 * * * *", function () {
  // Realiza una solicitud GET al URL especificado
  https
    .get(URL, (res) => {
      // Verifica el código de estado de la respuesta
      if (res.statusCode === 200) {
        console.log("GET request sent successfully"); // Mensaje de éxito
      } else {
        console.log("GET request failed", res.statusCode); // Mensaje de error con el código de estado
      }
    })
    .on("error", (e) => {
      console.error("Error while sending request", e); // Maneja errores de la solicitud
    });
});

// Exporta el trabajo cron para que pueda ser utilizado en otros módulos
export default job;

// CRON JOB EXPLANATION:
// Los cron jobs son tareas programadas que se ejecutan periódicamente en intervalos fijos o a horas específicas
// En este caso, se envía 1 solicitud GET cada 14 minutos

// Schedule:
// Se define una programación utilizando una expresión cron, que consiste en cinco campos que representan:

//! MINUTO, HORA, DÍA DEL MES, MES, DÍA DE LA SEMANA

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Cada 14 minutos
//* 0 0 * * 0 - A medianoche todos los domingos
//* 30 3 15 * * - A las 3:30 AM, el 15 de cada mes
//* 0 0 1 1 * - A medianoche, el 1 de enero
//* 0 * * * * - Cada hora
