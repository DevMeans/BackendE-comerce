const Router = require("express");
const { guardarImagen } = require("../controllers/upload");
const { upload } = require("../middlewares/subir-archivo");
const router = Router()
router.post('/', [
    upload
],
    guardarImagen)
module.exports = router