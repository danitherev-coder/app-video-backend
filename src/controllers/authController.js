import { request, response } from 'express'
import authService from '../services/authServices.js'

const registerCTRL = async (req = request, res = response) => {
  try {
    const body = req.body
    const register = await authService.registerService(body)
    return res.status(201).json(register)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error al registrar usuario' })
  }
}

const loginCTRL = async (req = request, res = response) => {
  try {
    const { email, password } = req.body
    const login = await authService.loginService(email, password)
    if (login.msg) return res.status(400).json(login)
    return res.status(200).json(login)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}

const confirmEmailCTRL = async (req = request, res = response) => {
  try {
    const { token } = req.params
    const confirmEmail = await authService.confirmEmailService(token)
    if (confirmEmail.error) return res.status(400).json(confirmEmail)
    return res.status(200).json(confirmEmail)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al confirmar email' })
  }
}

const olvidePassCTRL = async (req = request, res = response) => {
  try {
    const { email } = req.body
    const olvidePass = await authService.olvidePassService(email)
    if (olvidePass.error) return res.status(400).json(olvidePass)
    return res.status(200).json(olvidePass)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al recuperar contraseña' })
  }
}

const verifyTokenCTRL = async (req = request, res = response) => {
  try {
    const { token } = req.params
    const verifyToken = await authService.verifyTokenService(token)
    if (verifyToken.error) return res.status(400).json(verifyToken)
    return res.status(200).json(verifyToken)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al verificar token' })
  }
}

const changePasswordCTRL = async (req = request, res = response) => {
  try {
    const { token } = req.params
    const { password } = req.body
    const changePassword = await authService.changePasswordService(token, password)
    if (changePassword.error) return res.status(400).json(changePassword)
    return res.status(200).json(changePassword)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al cambiar contraseña' })
  }
}

export { registerCTRL, loginCTRL, confirmEmailCTRL, olvidePassCTRL, verifyTokenCTRL, changePasswordCTRL }
