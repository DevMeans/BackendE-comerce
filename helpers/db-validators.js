const usuario = require("../models/usuario")

const validarCorreo=async(correo='')=>{
        const existeCorreo=await usuario.findOne({correo})
        if(existeCorreo){
            throw new Error(`el Correo : ${correo } existe en la base de datos`)
        }
}
module.exports={
    validarCorreo
}