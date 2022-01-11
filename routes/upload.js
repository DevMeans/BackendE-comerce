const Router = require("express");
const { check } = require("express-validator");
const { guardarImagen, subirImagen, testimagen, actualizarImagen } = require("../controllers/upload");
const { subircloudinary } = require("../controllers/uploadcloudinary");
const { validaridCategoria, colecionesPermitidas } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require('../middlewares/validar-jwt')
const  { upload } =require("../middlewares/subir-archivo")
const router = Router()


router.post('/:coleccion/:id', [
    validarjwt,
    check('id', 'No es un id de mongo').isMongoId(),
    check('id').custom(validaridCategoria),
    check('coleccion', 'el valor no es permitido categoria/producto').isIn(['categoria', 'producto']),
    upload,
    validarCampos,

],
    guardarImagen)


router.post('/test/:coleccion/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas(c, ['usuario', 'producto', 'categoria'])),
    validarCampos
], subirImagen)


router.put('/test/:coleccion/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('coleccion').custom(c => colecionesPermitidas(c, ['usuario', 'producto', 'categoria'])),
    validarCampos
], subircloudinary)
module.exports = router