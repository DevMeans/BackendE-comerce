const { request, response } = require("express");
const uploadTest = (req = request, res = response) => {
    console.log(req.files)
    return res.json({
        ok: true,
        msg: `estas en el subir archivo`
    })
}

module.exports = {
    uploadTest
}