const { request, response } = require("express")
const producto = require("../models/producto")

const crearProducto = async (req = request, res = response) => {
    const { estado, usuario, ...newBody } = req.body
    newBody.usuario = req.uid
    const productoDB = new producto(newBody)
    await productoDB.save()
    return res.json({
        ok: true,
        msg: `producto creado`,
        result: productoDB
    })
}
const actualizarProducto = async (req = request, res = response) => {

    const { estado, usuario, ...newBody } = req.body
    const idprod = req.params.id
    newBody.usuario = req.uid
    const productoDB = await producto.findByIdAndUpdate(idprod, newBody, { new: true })
    if (!productoDB) {
        return res.status(404).json({
            ok: false,
            msg: `Producto con el id ${idprod} no econtrado`
        })
    }
    return res.json({
        ok: false,
        msg: `producto actualizado correctamente`,
        result: productoDB
    })

}
const actualizarEstado = async (req = request, res = response) => {
    const idprod = req.params.id
    const id = req.uid
    const { estado } = req.body
    data = {
        estado,
        usuario: id
    }
    const productoDB = await producto.findByIdAndUpdate(idprod, data, { new: true })
    if (!producto) {
        return res.status(404).json({
            ok: false,
            msg: `Producto con el id ${idprod} no encontrado`
        })
    }
    return res.json({
        ok: true,
        msg: `Producto actualizado correctamente`,
        result: productoDB
    })

}

const ObtenerProducto = async (req = request, res = response) => {
    const { id } = req.params
    const productoDB = await producto.findById(id)
    if (!productoDB) {
        return res.status(404).json({
            ok: false,
            msg: `producto con el id ${id} no existe`
        })
    }
    return res.json({
        ok: true,
        result: productoDB

    })
}

const listarProductos = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = Number(req.params)
    const [productos, total] = await Promise.all([
        producto.find().
            skip(desde).
            limit(limite),
        producto.count()
    ])
    res.json({
        ok: true,
        results: productos,
        total
    })

}

module.exports = {
    crearProducto,
    actualizarProducto,
    actualizarEstado,
    ObtenerProducto,
    listarProductos
}