const mongoose = require('mongoose')
let Schema = mongoose.Schema

let AlquilarAuto = new Schema({
    id_auto: {
        type: String,
        required: [true, 'El id del auto es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El id del usuario es requerido']
    },
    totalDias: {
        type: Number,
        required: [true, 'Los dias de alquiler son requeridos']
    }, costoAuto: {
        type: Number,
        required: [true, 'El costo del Auot es requerido']
    },fechasArriendo:{
        type: Date,
        default:Date.now(),
        // required: [true,'La fecha es requerida']
    },fechasEntraga:{
        type: Date,
        default:Date.now(),
        // required: [true,'La fecha es requerida']
    }
})

module.exports = mongoose.model('alquilarAuto', AlquilarAuto)