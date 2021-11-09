require('dotenv').config()
const Router = require('express')
const { crear } = require('../controllers/usuarios')
const router = Router()

router.get('/', [],
    crear)

module.exports=router