const mongoose = require('mongoose')

let Schema = mongoose.Schema;


let autoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    marca: {
        type: String,
        required: [true, 'Marca es necesaria']
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es necesaria']
    }, costoAlquiler: {
        type: Number,
        required: [true, 'La cantidad es necesaria']
    },
    caracteristicas: {
        type: String,
        required: false,
    }
})

module.exports = mongoose.model('Auto', autoSchema)