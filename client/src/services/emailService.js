const express = require('express');
const nodemailer = require('nodemailer');

// Configuración del transportador de correo electrónico
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Reemplaza con la dirección del servidor SMTP que estés utilizando
  port: 587, // Reemplaza con el puerto del servidor SMTP (587 es común para SMTP con cifrado TLS)
  secure: true, // Puedes configurar esto como true si el servidor SMTP utiliza SSL/TLS
  auth: {
    user: 'muargentinamuargentina@gmail.com', // Reemplaza con tu dirección de correo electrónico
    pass: 'kvxykkgxkdlyhfpp' // Reemplaza con tu contraseña
  }
});

// Función para enviar correos electrónicos
const sendEmail = async (emailDetails) => {
  const { to, subject, message } = emailDetails;

  // Detalles del correo electrónico
  const mailOptions = {
    from: 'muargentinamuargentina@gmail.com', // Reemplaza con tu dirección de correo electrónico
    to,
    subject,
    text: message
  };

  try {
    // Envía el correo electrónico
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
};

module.exports = { sendEmail };
