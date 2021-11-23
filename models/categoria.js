const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: String,
        default: 'https://static.zerochan.net/Lumine.%28Genshin.Impact%29.full.3133637.jpg'
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }

}, { timestamps: true })

categoriaSchema.methods.toJSON = function () {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid = _id
    return categoria
}
module.exports = model('Categoria', categoriaSchema)