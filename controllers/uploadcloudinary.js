const { response } = require("express");
const { request } = require("express");
const producto = require("../models/producto");
const categoria = require("../models/categoria");
const usuario = require("../models/usuario");
const cloudinary = require('cloudinary').v2
const subircloudinary = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontraron archivos que subir'
        })
    }
    const { id, coleccion } = req.params
    let modelo;
    try {
        switch (coleccion) {
            case 'usuario':

                modelo = await usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        ok: false,
                        msg: `el usuario con el id ${id} no existe`
                    })
                }

                break;
            case 'categoria':

                modelo = await categoria.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        ok: false,
                        msg: `la categoria con el id ${id} no existe`
                    })
                }

                break;
            case 'producto':

                modelo = await producto.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        ok: false,
                        msg: `el producto con el id ${id} no existe`
                    })
                }

                break;

            default:
                return res.status(500).json({ msg: `se me olvido validar esto` })
        }
        if (modelo.img) {
            const nombreArr = modelo.img[0].split('/')
            const nombre = nombreArr[nombreArr.length - 1]
            const [public_id] = nombre.split('.')
            cloudinary.uploader.destroy(public_id)
        }
        const { tempFilePath } = req.files.img
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
        modelo.img = secure_url
        await modelo.save()
        res.json(modelo)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }

}
module.exports = {
    subircloudinary
}