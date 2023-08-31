import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id }
    const secret = process.env.SECRET_JWT
    const options = { expiresIn: '4h' }
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err)
        reject('No se pudo generar el JWT')
      }
      resolve(token)
    })
  })
}

export default generarJWT