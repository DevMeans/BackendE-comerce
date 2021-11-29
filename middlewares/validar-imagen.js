const { request, response } = require("express");

const validarImagen = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: `no hay archivos que subir`
        })
    }
    const extensionesValida = ['png', 'jpg', 'jpeg', 'gif'];
    const archivo = req.files.img  
    let arrayArchivosTemp = [] 
    let cantidad = 0
 //   console.log(req.files.img)//si el archivo es solo bota el objeto si son 2 es un arreglo que tiene objetos
    if(archivo.length==undefined){
        let extencion=archivo.mimetype.split('/')[1]
        if (!extensionesValida.includes(extencion)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una extension permitida'
            });
        }
        
       console.log(extencion) 
    }else{
        for (let i = 0; i < archivo.length; i++) {
            let elemento = archivo[i]
            arrayArchivosTemp.push(elemento)
            let extencion =archivo[i].mimetype.split('/')[1]
            console.log(extencion)
        }

    }
    console.log(arrayArchivosTemp)
    next()
}
module.exports = {
    validarImagen
}