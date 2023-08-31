import { Router } from "express";
import verificarJWT from "../middlewares/verificarJWT.js";
import { body } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";
import { existsIdVideo } from "../utils/validar-db.js";
import { publisheVideoCTRL, unpublisheVideoCTRL } from "../controllers/videoController.js";
const router = Router();


router.put('/', [
  verificarJWT,
  body('id', 'El id es obligatorio').not().isEmpty(),
  body('id').custom(existsIdVideo),
  validarCampos
], publisheVideoCTRL)

router.put('/unpublished', [
  verificarJWT,
  body('id', 'El id es obligatorio').not().isEmpty(),
  body('id').custom(existsIdVideo),
  validarCampos
], unpublisheVideoCTRL)

export default router