import { Router } from 'express'
import { body, param } from 'express-validator'
import { changePasswordCTRL, confirmEmailCTRL, loginCTRL, olvidePassCTRL, registerCTRL, verifyTokenCTRL } from '../controllers/authController.js'
import validarCampos from '../middlewares/validarCampos.js'
import { existeEmail } from '../utils/validar-db.js'

const router = Router()

router.post(
  '/register',
  [
    // validations
    body('firstname', 'FirstName is required').not().isEmpty(),
    body('lastname', 'LastName is required').not().isEmpty(),
    body('email', 'Email is required').isEmail(),
    body('email').custom(existeEmail),
    body('password', 'Password is required').not().isEmpty().trim(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validarCampos
  ],
  registerCTRL
)

router.post('/login', [
  body('email', 'Email is required').isEmail(),
  body('password', 'Password is required').not().isEmpty().trim(),
  validarCampos
], loginCTRL)

router.get('/confirmar-email/:token', [
  param('token', 'Token is required').not().isEmpty(),
  validarCampos
], confirmEmailCTRL)

router.post('/olvide-password', [
  body('email', 'Email is required').isEmail(),
  validarCampos
], olvidePassCTRL)

router.get('/olvide-password/:token', [
  param('token', 'Token is required').not().isEmpty(),
  validarCampos
], verifyTokenCTRL)

router.post('/restablecer-password/:token', [
  body('password', 'Password is required').not().isEmpty().trim(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  validarCampos
], changePasswordCTRL)


export default router
