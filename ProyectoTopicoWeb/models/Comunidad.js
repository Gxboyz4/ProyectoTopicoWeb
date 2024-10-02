const mongoose = require('mongoose');
const comunidadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fecha_creacion: {
        type: Date,
        default : Date.now
    },
    etiquetas: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Comunidad', comunidadSchema);  