const Router = require("express");
const fileUpload = require('express-fileupload');
const { uploadTest } = require("../controllers/test-1");
const { guardarImagen } = require("../controllers/upload");
const { upload } = require("../middlewares/subir-archivo");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarImagen } = require("../middlewares/validar-imagen");

const router = Router()

router.use(fileUpload());
router.post('/', [
    upload
],
    guardarImagen)


router.post('/test', [
    validarImagen,
    validarCampos
    

], uploadTest)


module.exports = router