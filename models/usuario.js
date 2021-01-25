const mongoose = require('mongoose')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    cedula: {
        type: String,
        default: false
    },
    estado: {
        type: Boolean,
        default: false
    }, 
    carnetConducir: {
        type: Boolean,
        default: false
    }, 
    fechaNacimiento: {
        type: String,
        default: "false"
    }

});

module.exports = mongoose.model('Usuario', usuarioSchema)