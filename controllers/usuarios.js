const bcryptjs = require('bcryptjs');
const { response, request, json } = require("express")
const usuario = require("../models/usuario")

const crearUsuario = async (req = request, res = response) => {
    const {estado,rol,password, ...newBody} = req.body
    const salt = bcryptjs.genSaltSync();
    pwsecrp = bcryptjs.hashSync(password, salt);
    newBody.password = pwsecrp
    const usuarioDB = new usuario(newBody)
    await usuarioDB.save()
    res.json({
        ok: true,
        result: usuarioDB,
        msg: 'Estas en el controlador crear usuario !!!!'
    })
}

const actualizarUsuaurio = async (req = request, res = response) => {
    const { id } = req.params
    const { password, rol, estado, ...newBody } = req.body
    const salt = bcryptjs.genSaltSync();
    pwsecrp = bcryptjs.hashSync(password, salt);
    newBody.password = pwsecrp
    const usuarioDB = await usuario.findByIdAndUpdate(id, newBody)
    if (!usuarioDB) {
        return res.status(494).json({
            ok: false,
            msg: `usuario con el id ${id} no existe`
        })
    }
    return res.json({
        ok: true,
        msg: `usuario actualizado correctamente`
    })

}
const actulziarEstadoUsuario = async (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body
    const usuarioDB = await usuario.findByIdAndUpdate(id, estado)
    if (!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: `usuario con el id ${id} no existe`
        })
    }
    return res.json({
        ok: false,
        msg: `usuario actualizado correctamente`
    })
}
const ObtenerUsuario = async (req = request, res = response) => {
    const { id } = req.params
    const usuarioDB = await usuario.findById(id)
    if (!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: `usuario con el id ${id} no existe`
        })
    }
    return res.json({
        ok: true,
        result: usuarioDB

    })
}

const listarUsuarios = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = Number(req.params)
    const [usuarios, total] = await Promise.all([
        usuario.find().
            skip(desde).
            limit(limite),
        usuario.count()
    ])
    res.json({
        ok: true,
        results: usuarios,
        total
    })

}



module.exports = {
    crearUsuario,
    actualizarUsuaurio,
    actulziarEstadoUsuario,
    ObtenerUsuario,
    listarUsuarios
}