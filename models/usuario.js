const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
        default: 'https://static.zerochan.net/Lumine.%28Genshin.Impact%29.full.3133637.jpg'
    },
    rol: {
        type: String,
        emun: ['ADMIN_ROLE', 'VENTAS_ROLE', 'DEV_ROL', 'INVITADO_ROLE'],
        default: 'INVITADO_ROLE'
    },

    estado: {
        type: Boolean,      
        default: true
    }


}, { timestamps: true })

usuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario
}


module.exports = model('Usuario', usuarioSchema)