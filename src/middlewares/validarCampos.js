import { request, response } from 'express'
import { validationResult } from 'express-validator'

// devolver un middleware
const validarCampos = (req = request, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

export default validarCampos
