const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    resenas_likeadas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resena'
    }]
});

module.exports = mongoose.model('Usuario', usuarioSchema);