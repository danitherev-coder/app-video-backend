import { Router } from 'express';
import { body } from 'express-validator';

import verificarJWT from '../middlewares/verificarJWT.js';
import { getVideoLiked, likeVideo } from '../controllers/likeController.js';
import validarCampos from '../middlewares/validarCampos.js'
import { existsIdVideo } from '../utils/validar-db.js';

const router = Router();

router.get('/my-like-video', verificarJWT, getVideoLiked)

router.post('/', [
  verificarJWT,
  body('videoID', 'El id del video es obligatorio').notEmpty(),
  body('videoID').custom(existsIdVideo),
  validarCampos,
], likeVideo)

export default router;