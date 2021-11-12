
const { response, request, json } = require("express")
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

const actualizarUsuaurio = (req = request, res = response) => {
    const { id } = req.params
    const { password, rol, estado, ...newBody } = req.body
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
const actulziarEstadoUsuario = (req = request, res = response) => {
    const { id } = req.params
    const { estado } = req.body
    const usuarioDB = await usuario.findByIdAndUpdate(id, estado)
    if(!usuarioDB){
        return res.status(404).json({
            ok:false,
            msg: `usuario con el id ${id} no existe`
        })
    }
    return res.json({
        ok:false,
        msg: `usuario actualizado correctamente`
    })
}
const listarUsuarios=(req = request, res = response)=>{
    const { limite,desde } =req.params
    
}

module.exports = {
    crearUsuario,
    actualizarUsuaurio,
    actulziarEstadoUsuario
}