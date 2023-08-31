import nodemailer from 'nodemailer'
import 'dotenv/config'

const emailRegistro = async (datos) => {
  const transporter = nodemailer.createTransport({
    // host service gmail
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });


  const { firstname, lastname, email, token } = datos
  await transporter.sendMail({
    from: "<Bienes Raices>",
    to: email,
    subject: 'Confirma tu Cuenta',
    text: 'Confirma tu Cuenta',
    html: `
            <p>Hola ${firstname} ${lastname} confirma tu cuenta en la pagina de APP VIDEO</p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/api/auth/confirmar-email/${token}">confirmar cuenta</a>
        `
  })
}

const olvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    // host service gmail
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });


  const { firstname, lastname, email, token } = datos
  await transporter.sendMail({
    from: "<Bienes Raices>",
    to: email,
    subject: 'Restablecer Password',
    text: 'Olvide mi Password',
    html: `
            <p>Hola ${firstname} ${lastname} para restablecer su password, ve al siguiente enlace</p>
            <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/api/auth/olvide-password/${token}">Restablecer Password</a>
        `
  })
}

export {
  emailRegistro,
  olvidePassword
}