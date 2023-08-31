import { Router } from 'express'
import { body, param } from 'express-validator'
import validarCampos from '../middlewares/validarCampos.js'
import verificarJWT from '../middlewares/verificarJWT.js'
import { createVideoCTRL, deleteVideoCTRL, getAllVideosCTRL, getMyVideosCTRL, getVideoIDCTRL, updateVideoCTRL } from '../controllers/videoController.js'
import { existsIdVideo } from '../utils/validar-db.js'
const router = Router()



router.get('/all-videos', getAllVideosCTRL)

router.get('/my-videos', verificarJWT, getMyVideosCTRL)

router.get('/:id', [
  param('id', 'The id is required').not().isEmpty(),
  param('id').custom(existsIdVideo),
  validarCampos
], getVideoIDCTRL)

router.post('/create', [
  verificarJWT,
  body('description', 'The description is required').not().isEmpty(),
  body('video_url', 'The video_url is required').not().isEmpty(),
  body('cover', 'The cover is required').not().isEmpty(),
  validarCampos
], createVideoCTRL)

router.put('/update/:id', [
  verificarJWT,
  param('id', 'The id is required').not().isEmpty(),
  param('id').custom(existsIdVideo),
  validarCampos
], updateVideoCTRL)

router.delete('/delete/:id', [
  verificarJWT,
  param('id', 'The id is required').not().isEmpty(),
  param('id').custom(existsIdVideo),
  validarCampos
], deleteVideoCTRL)

export default router