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
        required: true
    },
    etiquetas: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Comunidad', comunidadSchema);  