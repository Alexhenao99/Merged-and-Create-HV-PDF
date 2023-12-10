'use client'

import nodemailer from 'nodemailer';

export default async function sendEmail(req, res) {
  const { data, pdfData } = req.body; // Asumiendo que 'email' contiene la dirección de correo electrónico y 'pdfData' el PDF en formato de datos

  // Configuración del servicio de correo electrónico (aquí se utiliza Gmail como ejemplo)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'hojasdevidafumdir@gmail.com', // Coloca aquí tu dirección de correo
      pass: 'HojadeVida1234', // Coloca aquí tu contraseña
    },
  });

  // Opciones del correo electrónico
  const mailOptions = {
    from: 'hojasdevidafumdir@gmail.com',
    to: 'waha@gmail.com',
    subject: 'PDF combinado enviado desde tu aplicación',
    text: 'Adjunto encontrarás el PDF combinado que solicitaste.',
    attachments: [
      {
        filename: 'combined.pdf',
        content: pdfData, // Aquí deberías incluir los datos del PDF
      },
    ],
  };

  try {
    // Envío del correo electrónico
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar el correo electrónico', details: error });
  }
}