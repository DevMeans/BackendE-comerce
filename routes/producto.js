const Router = require("express");
const { check } = require("express-validator");
const { ObtenerProducto, listarProductos, crearProducto, actualizarProducto, actualizarEstado } = require("../controllers/producto");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router()

router.get('/:id', [

],
    ObtenerProducto)

router.get('/', [

],
    listarProductos)

router.post('/', [
    validarjwt,
    check('nombre', 'nombre es obligatorio').notEmpty(),
    check('categoria', 'categoria es obligatoria').notEmpty(),
    check('categoria', 'Id categoria no valida').isMongoId(),
    validarCampos
],
    crearProducto)

router.put('/:id', [
    validarjwt,
    check('categoria', 'Id categoria no valida').isMongoId(),
    validarCampos
],
    actualizarProducto)
router.put('/estado/:id', [
    validarjwt,
    check('estado', 'el valor no es permitido true/false').isIn(['true', 'false']),
    validarCampos
],
    actualizarEstado)
module.exports = router