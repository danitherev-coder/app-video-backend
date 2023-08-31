import { request, response } from "express"
import jwt from 'jsonwebtoken'
import UserModel from "../models/UserModel.js"


const verificarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) return res.status(401).json({ msg: 'Token is required' })

  try {

    const decoded = jwt.verify(token, process.env.SECRET_JWT)
    const usuario = await UserModel.findByPk(decoded.id)

    if (!usuario) return res.status(401).json({ msg: 'Invalid token' })
    req.usuario = usuario

    next()

  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Invalid token' })
  }
}

export default verificarJWT