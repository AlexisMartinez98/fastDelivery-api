require("dotenv").config();
const transporter = require("../config/nodemailerConfig.js");

function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo electrónico:", error);
        reject(error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
        resolve(info);
      }
    });
  });
}

async function sendRegistrationEmail(destinatario, nombreUsuario, token) {
  const mailOptions = {
    from: process.env.USER_MAILER,
    to: destinatario,
    subject: "Por favor confirmar cuenta",
    text: `Hola ${nombreUsuario},\n\n¡Gracias por registrarte en nuestra aplicación!
    a continuacion te dejamos el link para poder confirmar tu cuenta\n\n click en el link --> http://localhost:3000/confirm_account/${token}`,
  };

  try {
    const info = await sendEmail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
}

async function forgetPassword(destinatario, nombreUsuario, token) {
  const mailOptions = {
    from: process.env.USER_MAILER,
    to: destinatario,
    subject: "Recuperar contraseña",
    text: `Hola ${nombreUsuario},\n\n¡Recupera tu contraseña!
    a continuacion te dejamos el link para poder cambiar tu contraseña\n\n click en el link --> http://localhost:3000/new_password/${token}`,
  };

  try {
    const info = await sendEmail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
}

module.exports = { sendRegistrationEmail, forgetPassword };
