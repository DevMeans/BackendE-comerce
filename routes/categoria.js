const Router = require("express");
const { check } = require("express-validator");
const { listarCategorias, obtenerCategoria, crearCategoria, actualizarEstadoCategoria, actualizarCategoria } = require("../controllers/categoria");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router()
router.get('/', [
    validarjwt,
],
    listarCategorias)


router.get('/:id', [
    validarjwt,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
],
    obtenerCategoria)


router.post('/', [
    validarjwt,
    check('nombre', 'el nombre es requerido').notEmpty(),//validar el nombre queda pendiente 
    validarCampos
],
    crearCategoria)

router.put('/:id', [
    validarjwt
],
    actualizarCategoria)


router.put('/estado/:id', [
    validarjwt,
    check('estado', 'el valor no es permitido true/false').isIn(['true', 'false']),
    validarCampos
],
    actualizarEstadoCategoria)


module.exports = router