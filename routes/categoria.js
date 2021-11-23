const Router = require("express");
const { listarCategorias, obtenerCategoria, crearCategoria, actualizarEstadoCategoria, actualizarCategoria } = require("../controllers/categoria");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router()
router.get('/', [
    validarjwt
],
    listarCategorias)


router.get('/:id', [
    validarjwt
],
    obtenerCategoria)


router.post('/', [
    validarjwt
],
    crearCategoria)


router.put('/:id', [
    validarjwt
],
    actualizarCategoria)


router.put('/estado/:id', [
    validarjwt,
],
    actualizarEstadoCategoria)


module.exports = router