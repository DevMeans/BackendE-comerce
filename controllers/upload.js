const { request, response } = require("express");
const { v4: uuidv4 } = require('uuid');
uuidv4();
const guardarImagen = (req = request, res = response) => {
    const archivos = req.files
    const uuid=uuidv4()
    return res.json({
        ok: true,
        msg: `estas en el guardar imagen`,
        archivos,
        uuid
    })


}
module.exports = {
    guardarImagen
}