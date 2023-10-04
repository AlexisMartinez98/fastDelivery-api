require("dotenv").config();
const transporter = require("../config/nodemailerConfig.js");

async function sendRegistrationEmail(destinatario, nombreUsuario, token) {
  const mailOptions = {
    from: process.env.USER_MAILER,
    to: destinatario,
    subject: "Por favor confirmar cuenta",
    text: `Hola ${nombreUsuario},\n\n¡Gracias por registrarte en nuestra aplicación!
    a continuacion te dejamos el link para poder confirmar tu cuenta\n\n click en el link --> http://localhost:3001/confirm_account/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
}
async function forgetPassword(destinatario, nombreUsuario, token) {
  const mailOptions = {
    from: process.env.USER_MAILER,
    to: destinatario,
    subject: "Recuperar contraseña",
    text: `Hola ${nombreUsuario},\n\n¡Recupera tu contraseña!
    a continuacion te dejamos el link para poder cambiar tu contraseña\n\n click en el link --> http://localhost:3001/new_password/${token}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
}

const nuevoUsuario = {
  email: "nuevo_usuario@example.com",
  nombre: "Nombre del Nuevo Usuario",
};

module.exports = { sendRegistrationEmail, forgetPassword };
