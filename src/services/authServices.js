import UserModel from '../models/UserModel.js'
import authRepository from '../repositories/authRepositorie.js'
import { olvidePassword } from '../utils/email.js'
import { encrypt, verifyPassword } from '../utils/encrypt.js'
import generarJWT from '../utils/generarJWT.js'

const registerService = async (data) => {
  const register = await authRepository.createUserRepository(data)
  return { msg: 'User register correctly, please confirm your account', register }
}

const loginService = async (email, password) => {
  const usuario = await authRepository.loginRepository(email, password)
  return usuario
}

const confirmEmailService = async (token) => {
  const confirmEmail = await authRepository.confirmEmailRepository(token)
  return confirmEmail
}

const olvidePassService = async (email) => {
  const usuario = await authRepository.olvidePassRepository(email)
  return usuario
}

const verifyTokenService = async (token) => {
  const usuario = await authRepository.verifyTokenRepository(token)
  return usuario
}

const changePasswordService = async (token, password) => {
  const usuario = await authRepository.changePassRepository(token, password)
  return usuario
}

const authService = {
  registerService,
  loginService,
  confirmEmailService,
  olvidePassService,
  verifyTokenService,
  changePasswordService
}

export default authService
