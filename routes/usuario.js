const Router = require('express')
const { check } = require('express-validator')
const { crearUsuario, actualizarUsuaurio, actulziarEstadoUsuario, listarUsuarios, ObtenerUsuario } = require('../controllers/usuarios')
const { validarCorreo } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarjwt } = require('../middlewares/validar-jwt')
const router = Router()

router.post('/', [
    validarjwt,
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('correo', 'El correo no puede estar vacio').notEmpty(),
    check('correo').custom(validarCorreo),
    check('password', 'El password es requerido').notEmpty(),
    validarCampos
],
    crearUsuario)
router.put('/:id', [
    validarjwt,
    check('correo').custom(validarCorreo),
    validarCampos
],
    actualizarUsuaurio
)

router.put('/estado/:id', [
    validarjwt,
    check('estado', 'el valor no es permitido true/false').isIn(['true', 'false']),
    validarCampos
],
    actulziarEstadoUsuario
)
router.get('/', [

    validarjwt,

],
    listarUsuarios)

router.get('/:id', [

    validarjwt,

],
    ObtenerUsuario)
module.exports = router