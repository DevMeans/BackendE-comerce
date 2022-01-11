const { request, response } = require("express");
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const producto = require("../models/producto")
const categoria = require("../models/categoria");
const { subirArchivo } = require("../helpers/subir-archivo");
const usuario = require("../models/usuario");


const guardarImagen = async (req = request, res = response) => {
    const archivos = req.files
    console.log(req.files)
    console.log(req.file)
    const { coleccion, id } = req.params
    let paths = []
    for (let i = 0; i < archivos.length; i++) {
        let element = archivos[i].path;
        paths.push(element)

    }

    if (coleccion == 'categoria') {
        const imgDb = await categoria.findByIdAndUpdate(id, { img: paths[0] }, { new: true })
        return res.json({
            ok: true,
            msg: `imagen subida satisfactoriamente`
        })
    }
    if (coleccion == 'producto') {
        const imgDb = await producto.findByIdAndUpdate(id, { img: paths }, { new: true })
        return res.json({
            ok: true,
            msg: `imagenes subida satisfactoriamente`,
            imgDb
        })
    }


}
const subirImagen = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontraron archivos que subir'
        })
    }
    try {

        const pathCompleto = await subirArchivo(req.files)
        return res.json({
            path: pathCompleto
        })
    } catch (error) {
        return res.json({
            error
        })
    }


}
const actualizarImagen = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No se encontraron archivos que subir'
        })
    }
    const { id, coleccion } = req.params
    let modelo;
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



    const pathCompleto = await subirArchivo(req.files)
    modelo.img = pathCompleto
    await modelo.save();
    res.json({
        ok: true,
        modelo
    })
}



module.exports = {
    guardarImagen,
    subirImagen,
    actualizarImagen
}