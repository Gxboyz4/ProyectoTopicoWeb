const Resena = require('../models/Resena');

class ResenaDAO {
    constructor() { }

    async crearResena(resena) {
        try{
            const nuevaResena = new Resena(resena);
            return await nuevaResena.save();
        }catch(error){
            throw error;
        }
    }

    async obtenerResenasFiltro(limit = 10, offset = 0, filtroContenido = '') {
        return await Resena.find({contenido: {$regex: filtroContenido, $options: 'i'}}).skip(offset).limit(limit);
    }

    async agregarComentarioAResena(idResena, comentario){
        const resena = await Resena.findById(idResena);
        if(!resena){
            throw new Error('No existe una resena con ese id');
        }
        resena.comentarios.push(comentario);
        return await resena.save();
    }

    async obtenerResenasDePelicula(limit = 10, offset = 0, idPelicula){
        return await Resena.find({pelicula: idPelicula}).skip(offset).limit(limit);
    }

}

module.exports = new ResenaDAO();