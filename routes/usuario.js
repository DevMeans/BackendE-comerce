const Router = require('express')
const { check } = require('express-validator')
const { crearUsuario } = require('../controllers/usuarios')
const { validarCorreo } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const router = Router()

router.post('/', [
    check('nombre', 'El nombre no puede estar vacio').notEmpty(),
    check('correo', 'El correo no puede estar vacio').notEmpty(),
    check('correo').custom(validarCorreo),
    check('password', 'El password es requerido').notEmpty(),
    validarCampos
],
    crearUsuario)

module.exports = router