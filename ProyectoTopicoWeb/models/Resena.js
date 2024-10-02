const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    fecha_hora: {
        type: Date,
        default : Date.now
    }
});

const resenaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    pelicula: {
        type: String,
        required: true
    },
    cantidad_likes: {
        type: Number,
        required: true
    },
    calificacion: {
        type: Number,
        required: true
    },
    contenido:{
        type: String,
        required: true
    },
    comunidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comunidad',
        required: true
    },
    comentarios: [comentarioSchema]
});

module.exports = mongoose.model('Resena', resenaSchema);