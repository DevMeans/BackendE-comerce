const { request, response } = require("express")
const categoria = require("../models/categoria")

const crearCategoria = async (req = request, res = response) => {
    const { estado, usuario, ...newBody } = req.body
    newBody.usuario = req.uid
    const categoriaDB = new categoria(newBody)
    await categoriaDB.save()
    return res.json({
        ok: true,
        msg: 'categoria creada',
        result: categoriaDB
    })
}
const actualizarCategoria = async (req = request, res = response) => {
    const { estado, usuario, ...newBody } = req.body
    newBody.usuario = req.uid
    const { id } = req.params
    const categoriaDB = await categoria.findByIdAndUpdate(id, newBody, { new: true })
    if (!categoriaDB) {
        return res.status(404).json({
            ok: false,
            msg: `la categoria no fue encontrada`
        })
    }
    return res.json({
        ok: true,
        msg: `categoria actualizada correctamente`,
        result:categoriaDB
    })
}
const actualizarEstadoCategoria = async (req = request, res = response) => {

    const { estado } = req.body
    const idCate  = req.params.id
    const id = req.uid
    data = {
        estado,
        usuario: id
    }
    const categoriaDB = await categoria.findByIdAndUpdate(idCate, data, { new: true })
    if (!categoriaDB) {
        return res.status(404).json({
            ok: false,
            msg: `la categoria no fue encontrada con ${id}`
        })
    }
    return res.json({
        ok: true,
        msg: `categoria:/ estado  actualizada correctamente`,
        result:categoriaDB
    })
}
const obtenerCategoria = async (req = request, res = response) => {

    const { id } = req.params
    const categoriaDB = await categoria.findById(id)
    if (!categoriaDB) {
        return res.status(404).json({
            ok: false,
            msg: `la categoria no fue encontrada`
        })
    }
    return res.json({
        ok: true,
        msg: `categoria encontrada`,
        result: categoriaDB
    })

}
const listarCategorias = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = Number(req.params)
    const [categorias, total] = await Promise.all([
        categoria.find().
            skip(desde).
            limit(limite),
        categoria.count()
    ])
    res.json({
        ok: true,
        results: categorias,
        total
    })
}
module.exports = {
    crearCategoria,
    actualizarCategoria,
    actualizarEstadoCategoria,
    obtenerCategoria,
    listarCategorias
}
