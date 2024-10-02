const mongoose = require('mongoose');
const comunidadUsuariosSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    comunidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comunidad',
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ComunidadUsuarios', comunidadUsuariosSchema);