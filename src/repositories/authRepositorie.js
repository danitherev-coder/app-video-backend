import UserModel from "../models/UserModel.js"
import { emailRegistro, olvidePassword } from "../utils/email.js"
import { encrypt, verifyPassword } from "../utils/encrypt.js"
import generarJWT from "../utils/generarJWT.js"


const createUserRepository = async (user) => {
  const register = new UserModel(user)

  // encrypt password
  const encryptPwd = encrypt(register.password)
  register.password = encryptPwd

  // generate token with JWT
  const token = await generarJWT(register.id)
  register.token = token

  emailRegistro({
    firstname: register.firstname,
    lastname: register.lastname,
    email: register.email,
    token: register.token
  })

  await register.save()
  return register
}

const loginRepository = async (email, password) => {
  const user = await UserModel.findOne({ where: { email } })
  if (!user) return { msg: 'Email not registred' }
  if (!user.state) {
    return { msg: 'Please confirm your account' }
  }

  const validPassword = verifyPassword(password, user.password)
  if (!validPassword) return { msg: 'Email or password are incorrect' }

  const token = await generarJWT(user.id)

  return { user, token }
}

const confirmEmailRepository = async (token) => {
  const usuario = await UserModel.findOne({ where: { token } })
  if (!usuario) return { msg: 'Token is not valid' }

  usuario.state = true
  usuario.token = null
  await usuario.save()

  return { msg: 'Account confirmed' }
}

const olvidePassRepository = async (email) => {
  const user = await UserModel.findOne({ where: { email } })
  if (!user) return { error: 'Email not registred' }

  // generate token with JWT
  const token = await generarJWT(user.id)
  user.token = token
  await user.save()

  olvidePassword({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    token: user.token
  })

  return { msg: 'Email sent, please check your inbox' }
}

const verifyTokenRepository = async (token) => {
  const user = await UserModel.findOne({ where: { token } })
  if (!user) return { error: 'Token incorrect' }

  return { msg: 'Token correct, you can change password' }
}

const changePassRepository = async (token, password) => {
  const user = await UserModel.findOne({ where: { token } })
  if (!user) return { error: 'Token incorrect' }

  // encrypt password
  const encryptPwd = encrypt(password)
  user.password = encryptPwd
  user.token = null
  await user.save()

  return { msg: 'Password changed correctly' }
}

const authRepository = {
  createUserRepository,
  loginRepository,
  confirmEmailRepository,
  olvidePassRepository,
  verifyTokenRepository,
  changePassRepository
}

export default authRepository