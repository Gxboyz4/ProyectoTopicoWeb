const ResenaDAO = require('../dataAccess/ResenaDAO');
const { AppError } = require('../utils/appError');

class ResenaController {
    constructor() { }

    async crearResena(req, res, next) {
        try{
            //LA CANTIDAD DE CALIDAD SIEMPRE VA A SER 0, PERO POR CUESTIONES DE ESCALABILIDAD, SE DEJA ASI
            const {usuario, pelicula, cantidad_likes, calificacion, contenido, comunidad} = req.body;
            if(!usuario || !pelicula || !cantidad_likes || !calificacion || !contenido || !comunidad){
                return next(new AppError('Falta llenar datos de la reseña',400));
            }
            const resenaData = {usuario, pelicula, cantidad_likes, calificacion, contenido, comunidad};
            const resena = await ResenaDAO.crearResena(resenaData);
            res.status(201).json(resena);
        }catch(error){
            next(new AppError('Error al crear reseña',500));
        }
    }

    async obtenerResenaFiltro(req, res, next) {
        try {
            const { limit, offset, filtroContenido } = req.query;
            const resenas = await ResenaDAO.obtenerResenasFiltro(
                parseInt(limit) || 10,
                parseInt(offset) || 0,
                filtroContenido || ''
            );
            res.status(200).json(resenas);
        } catch (error) {
            next(new AppError('Error al obtener reseñas', 500));
        }
    }

    async agregarComentarioAResena(req, res, next) {
        try {
            const { idResena } = req.params;
            const { usuario, comentario } = req.body;
            if (!idResena || !usuario || !comentario) {
                return next(new AppError('Faltan datos del comentario', 400));
            }
            const comentarioData = { usuario, comentario };
            const resenaActualizada = await ResenaDAO.agregarComentarioAResena(idResena, comentarioData);
            res.status(200).json(resenaActualizada);
        } catch (error) {
            next(new AppError('Error al agregar comentario', 500));
        }
    }

    async eliminarComentarioDeResena(req, res, next) {
        try {
            const { idResena, idComentario } = req.params;
            if (!idResena || !idComentario) {
                return next(new AppError('Faltan datos del comentario', 400));
            }
            const resenaActualizada = await ResenaDAO.eliminarComentarioDeResena(idResena, idComentario);
            res.status(200).json(resenaActualizada);
        } catch (error) {
            next(new AppError('Error al eliminar comentario', 500));
        }
    }

    async obtenerResenasDePelicula(req, res, next) {
        try {
            const { limit, offset, idPelicula } = req.query;
            const resenas = await ResenaDAO.obtenerResenasDePelicula(
                parseInt(limit) || 10,
                parseInt(offset) || 0,
                idPelicula
            );
            res.status(200).json(resenas);
        } catch (error) {
            next(new AppError('Error al obtener reseñas de pelicula', 500));
        }
    }

    async eliminarResena(req, res, next) {
        try {
            const { idResena } = req.params;
            if (!idResena) {
                return next(new AppError('Falta el id de la reseña', 400));
            }
            const resena = await ResenaDAO.eliminarResena(idResena);
            res.status(200).json(resena);
        } catch (error) {
            next(new AppError('Error al eliminar reseña', 500));
        }
    }

    async obtenerResenasDeComunidad(req, res, next) {
        try {
            const { idComunidad, limit, offset, sortBy, sortOrder } = req.query;
            const resenas = await ResenaDAO.obtenerResenasDeComunidad(
                idComunidad,
                parseInt(limit) || 10,
                parseInt(offset) || 0,
                sortBy || 'fecha_creacion',
                sortOrder || 'desc'
            );
            res.status(200).json(resenas);
        } catch (error) {
            next(new AppError('Error al obtener reseñas de comunidad', 500));
        }
    }

    async darLikeResena(req, res, next) {
        try {
            const { idResena, idUsuario } = req.params;
            if (!idResena || !idUsuario) {
                return next(new AppError('Faltan datos para dar like', 400));
            }
            const resena = await ResenaDAO.darLikeResena(idResena, idUsuario);
            res.status(200).json(resena);
        } catch (error) {
            next(new AppError('Error al dar like', 500));
        }
    }

    async quitarLikeResena(req, res, next) {
        try {
            const { idResena, idUsuario } = req.params;
            if (!idResena || !idUsuario) {
                return next(new AppError('Faltan datos para quitar like', 400));
            }
            const resena = await ResenaDAO.quitarLikeResena(idResena, idUsuario);
            res.status(200).json(resena);
        } catch (error) {
            next(new AppError('Error al quitar like', 500));
        }
    }

}

module.exports = ResenaController;