
const ResenaDAO = require('../dataAccess/ResenaDAO');
const { AppError } = require('../utils/appError');

class ResenaController {
    constructor() { }

    static async crearResena(req, res, next) {
        console.log("Crear resena");

        try {
            //LA CANTIDAD DE CALIDAD SIEMPRE VA A SER 0, PERO POR CUESTIONES DE ESCALABILIDAD, SE DEJA ASI
            const { usuario, pelicula, cantidad_likes, calificacion, contenido, comunidad } = req.body;
            if (!usuario || !pelicula || cantidad_likes < 0 || !calificacion || !contenido || !comunidad) {
                console.log(req.body);
                return next(new AppError('Falta llenar datos de la reseña', 400));
            }
            const resenaData = { usuario, pelicula, cantidad_likes, calificacion, contenido, comunidad };
            const resena = await ResenaDAO.crearResena(resenaData);
            res.status(201).json(resena);
        } catch (error) {
            next(new AppError('Error al crear reseña', 500));
        }
    }

    static async obtenerResenaPorID(req, res, next) {
        try {
            const { idResena } = req.params;
            if (!idResena) {
                return next(new AppError('Falta el id de la reseña', 400));
            }
            const resena = await ResenaDAO.obtenerResenaPorID(idResena);
            if (!resena) {
                return next(new AppError('No se encontro la reseña', 404));
            }
            res.status(200).json(resena);
        } catch (error) {
            next(new AppError('Error al obtener reseña', 500));
        }
    }

    static async obtenerResenaFiltro(req, res, next) {
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

    static async agregarComentarioAResena(req, res, next) {
        try {
            const { idResena } = req.params;
            const { usuario, comentario } = req.body;
            if (!idResena || !usuario || !comentario) {
                return next(new AppError('Faltan datos del comentario', 400));
            }
            const comentarioData = { usuario, comentario };
            const comentarioAgregado = await ResenaDAO.agregarComentarioAResena(idResena, comentarioData);
            res.status(200).json(comentarioAgregado); 
        } catch (error) {
            next(new AppError('Error al agregar comentario', 500));
        }
    }

    static async eliminarComentarioDeResena(req, res, next) {
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

    static async obtenerResenasDePelicula(req, res, next) {
        try {
            const { idPelicula } = req.params;
            const { limit, offset } = req.query;
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

    static async eliminarResena(req, res, next) {
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

    static async obtenerResenasDeComunidad(req, res, next) {
        try {
            const { idComunidad } = req.params;
            const { limit, offset, sortBy, sortOrder } = req.query;
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

    static async darLikeResena(req, res, next) {
        try {
            const { idResena, idUsuario } = req.params;
            if (!idResena || !idUsuario) {
                return next(new AppError('Es necesario el id de la reseña y usuario para dar like', 400));
            }
            const resena = await ResenaDAO.darLikeResena(idResena, idUsuario);
            res.status(200).json(resena);
        } catch (error) {
            next(new AppError('Error al dar like', 500));
        }
    }

    static async quitarLikeResena(req, res, next) {
        try {
            const { idResena, idUsuario } = req.params;
            if (!idResena || !idUsuario) {
                return next(new AppError('Es necesario el id de la reseña y usuario para quitar like', 400));
            }
            const resena = await ResenaDAO.quitarLikeResena(idResena, idUsuario);
            res.status(200).json(resena);
        } catch (error) {
            console.log(error);
            next(new AppError('Error al quitar like', 500));
        }
    }

    static async obtenerComentariosDeResena(req, res, next) {
        try {
            const { idResena } = req.params;
            if (!idResena) {
                return next(new AppError('Falta el id de la reseña', 400));
            }
            const resena = await ResenaDAO.obtenerComentariosDeResena(idResena);
            res.status(200).json(resena);
        } catch (error) {
            next(new AppError('Error al obtener comentarios de reseña', 500));
        }
    }

    /*
    static async obtenerResenasConMasLikes(req, res, next) {
        console.log("Obtener resenas con mas likes");
        try {
            let { likes, limit, offset } = req.query;
            const resenas = await ResenaDAO.obtenerResenasConMasLikes(
                parseInt(likes) || 10,
                parseInt(limit) || 10,
                parseInt(offset) || 0);
            res.status(200).json(resenas);
        } catch (error) {
            console.log(error);
            next(new AppError('Error al obtener reseñas con mas likes', 500));
        }
    }
    */
    static async obtenerResenasConMasLikes(req, res, next) {
        try {
            let {limit, offset } = req.query;
            const resenas = await ResenaDAO.obtenerResenasConMasLikes(
                parseInt(limit) || 10,
                parseInt(offset) || 0);
            res.status(200).json(resenas);
        } catch (error) {
            next(new AppError('Error al obtener reseñas con mas likes', 500));
        }
    }
}

module.exports = ResenaController;