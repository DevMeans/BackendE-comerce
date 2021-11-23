const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: Array,
        default: ['https://imgs1.goodsmileus.com/image/cache/data/productimages/Nendoroids/TravelerLumine/01_20210916012050-1200x1200.jpg']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    categoria: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Categoria'
    },
    color: {
        required: false,
        type: Array,
        default: []
    },
    talla: {
        required: false,
        type: Array,
        default: []
    }

}, { timestamps: true })

categoriaSchema.methods.toJSON = function () {
    const { __v, _id, ...categoria } = this.toObject();
    categoria.uid = _id
    return categoria
}
module.exports = model('Categoria', categoriaSchema)