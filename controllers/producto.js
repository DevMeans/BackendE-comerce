const { request, response } = require("express")
const producto = require("../models/producto")

const crearProducto = (req = request, res = response) => {
    const { estado, usuario, ...newBody } = req.body

    const productoDB = new producto(newBody)
    await productoDB.save()
    return res.json({
        ok: true,
        msg: `producto creado`,
        result: productoDB
    })
}
const actualizarProducto = (req = request, res = response) => {

    const { estado, usuario, ...newBody } = req.body
    const idprod = req.params.id
    const productoDB = producto.findByIdAndUpdate(idprod, newBody, { new: true })
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
const actualizarEstado = (req = request, res = response)=>{
    const idprod = req.params.id
}
module.exports = {
    crearProducto,
    actualizarProducto
}