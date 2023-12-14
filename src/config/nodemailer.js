const nodemailer = require('nodemailer')
const settings = require('../config/command/commander')


const nodeM = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: settings.nodemailer_user,
        pass: settings.nodemailer_password
    }
})

async function sendMail(mailOptions) {
    try {
      const result = await nodeM.sendMail(mailOptions);
      console.log('Correo enviado con éxito:', result);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }

module.exports = { sendMail }