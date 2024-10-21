const Resena = require('../models/Resena');
const Usuario = require('../models/Usuario');

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

    async obtenerResenaPorID(idResena) {
        try {
            const resena = await Resena.findById(idResena);
            return resena;
        } catch (error) {
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

    async eliminarComentarioDeResena(idResena, idComentario){
        const resenaActualizada = await Resena.findOneAndUpdate(
            { _id: idResena }, 
            { $pull: { comentarios: { _id: idComentario } } }, 
            { new: true } 
        );
        if (!resenaActualizada) {
            throw new Error('Reseña no encontrada o comentario no existe');
        }

        return resenaActualizada;
    }

    async obtenerResenasDePelicula(limit = 10, offset = 0, idPelicula){
        return await Resena.find({pelicula: idPelicula}).skip(offset).limit(limit);
    }

    async eliminarResena(idResena){
        try {
            const resena = await Resena.findByIdAndDelete(idResena);
            if(!resena){
                throw new Error('No existe una reseña con ese id');
            }
            return resena;
        } catch (error) {
            throw error;
        }
    }

    async obtenerResenasDeComunidad(idComunidad, limit = 10, offset = 0, sortBy = 'fecha_creacion', sortOrder = 'desc') {
        try {
            const order = sortOrder === 'asc' ? 1 : -1;
    
            const resenas = await Resena.find({ comunidad: idComunidad })
                .skip(offset)
                .limit(limit)
                .sort({ [sortBy]: order });
            if (!resenas) {
                throw new Error('No se pudieron obtener las reseñas de la comunidad.');
            }
            
            return resenas;
        } catch (error) {
            throw new error;
        }
    }


    async darLikeResena(idResena, idUsuario) {
        const resena = await Resena.findById(idResena);
        if (!resena) {
            throw new Error('No existe una reseña con ese id');
        }
        resena.cantidad_likes++;
        const usuarioLike = await Usuario.findOneAndUpdate(
            { _id: idUsuario }, 
            { $push: { resenas_likeadas: idResena } }, 
            { new: true } 
        )
        return await resena.save();
    }

    async quitarLikeResena(idResena, idUsuario) {
        const resena = await Resena.findById(idResena);
        if (!resena) {
            throw new Error('No existe una reseña con ese id');
        }
        if (resena.cantidad_likes > 0) {
            resena.cantidad_likes--;
            const usuarioLike = await Usuario.findOneAndUpdate(
                { _id: idUsuario }, 
                { $pull: { resenas_likeadas: idResena } }, 
                { new: true } 
            )
        } else {
            throw new Error('La cantidad de likes no puede ser menor que cero');
        }
    
        return await resena.save();
    }

    async obtenerComentariosDeResena(idResena) {
        const resena = await Resena.findById(idResena);
        if (!resena) {
            throw new Error('No existe una reseña con ese id');
        }
        return resena.comentarios;
    }
    
}

module.exports = new ResenaDAO();
