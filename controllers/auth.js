const { generarJWT } = require("../helpers/generar-jwt")
const bcryptjs = require('bcryptjs');
const usuario = require("../models/usuario")
const { request, response } = require("../routes/usuario")

const login = async (req = request, res = response) => {
    const { correo, password } = req.body

    try {
        const usuarioDB = await usuario.findOne({ correo })
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: `el correo ${correo} no existe`
            })
        }
        const validPassword = bcryptjs.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: `el password es incorrecto`
            })
        }
        token = await generarJWT(usuarioDB.id)
        return res.json({
            ok: true,
            msg: `token generado exitosamente`,
            token

        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: `error en la consulta hable con el administrador`
        })
    }

}
module.exports = {
    login
}