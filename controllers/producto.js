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
const actualizarProducto  =(req = request, res = response)=>{
}
module.exports = {
    crearProducto
}