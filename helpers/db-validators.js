const categoria = require("../models/categoria")
const usuario = require("../models/usuario")
const producto = require("../models/producto")
const validarCorreo=async(correo='')=>{
        const existeCorreo=await usuario.findOne({correo})
        if(existeCorreo){
            throw new Error(`el Correo : ${correo } existe en la base de datos`)
        }
}
const validaridCategoria=async(id='')=>{
    const existeid=await producto.findById(id)
    if(!existeid){
        throw new Error(`el id : ${ id } no existe en la base de datos`)
    }
}
const colecionesPermitidas=(coleccion='',colecciones=[])=>{
    const incluioo=colecciones.includes(coleccion)
    if(!incluioo){
        throw new Error(`la ${ coleccion } no esta permitida`)
    }
    return true
}
module.exports={
    validarCorreo,
    validaridCategoria,
    colecionesPermitidas
}