import { Router } from "express"
import { body } from "express-validator"
import verificarJWT from "../middlewares/verificarJWT.js"
import validarCampos from "../middlewares/validarCampos.js"
import { existsIdUser } from "../utils/validar-db.js";
import { followCTRL, unFollowCTRL, seguidosCTRL } from "../controllers/followController.js";
const router = Router();


router.get('/seguidos', verificarJWT, seguidosCTRL)

router.post('/', [
  verificarJWT,
  body('followedID', 'El followerID es obligatorio').not().isEmpty(),
  body('followedID').custom(existsIdUser),
  // body('followedID', 'El followedID es obligatorio').not().isEmpty(),
  // body('followedID').custom(existsIdUser),
  validarCampos
], followCTRL)

router.delete('/unfollow', [
  verificarJWT,
  body('followedID', 'El followerID es obligatorio').not().isEmpty(),
  body('followedID').custom(existsIdUser),
  // body('followedID', 'El followedID es obligatorio').not().isEmpty(),
  // body('followedID').custom(existsIdUser),
  validarCampos
], unFollowCTRL)

export default router