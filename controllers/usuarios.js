
const { response, request } = require("express")
const usuario = require("../models/usuario")

const crearUsuario = async (req = request, res = response) => {
    const body = req.body
    const usuarioDB = new usuario(body)
    await usuarioDB.save()
    res.json({
        ok: true,
        usuarioDB,
        msg: 'Estas en el controlador crear usuario !!!!'
    })
}
module.exports = {
    crearUsuario
}