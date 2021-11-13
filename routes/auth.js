const Router = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const router = Router()
router.post('/', [
    check('correo', 'el correo no debe estar vacio').notEmpty(),
    check('correo', 'el correo debe ser valido').isEmail(),
    check('password', 'el password no debe estar vacio').notEmpty()

],
    login)
module.exports = router