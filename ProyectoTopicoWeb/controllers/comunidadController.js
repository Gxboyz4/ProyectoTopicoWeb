const ComunidadDAO = require('../dataAccess/ComunidadDAO');
const { AppError } = require('../utils/appError');

class ComunidadController {

    static async crearComunidad(req, res, next) {
        try {
            const { nombre, descripcion, etiquetas } = req.body;
            if (!nombre || !descripcion || !etiquetas) {
                return next(new AppError('Debe ingresar todos los campos', 400));
            }
            const comunidadData = { nombre, descripcion, etiquetas };
            const comunidad = await ComunidadDAO.crearComunidad(comunidadData);
            res.status(201).json(comunidad);
        } catch (error) {
            next(new AppError('Error al crear la comunidad', 500));
        }
    }

    static async obtenerComunidadPorId(req, res, next) {
        try {
            const idComunidad = req.params.idComunidad;
            if (!idComunidad) {
                return next(new AppError('Error, no hay ID',400));
            }
            const comunidad = await ComunidadDAO.obtenerComunidadPorId(idComunidad);
            res.status(200).json(comunidad);
        } catch (error) {
            next(new AppError('Error al obtener comunidad por id', 500));
        }
    }
    
    static async obtenerComunidadesFiltro(req, res, next) {
        try {
            let { limit, offset, filtro } = req.query;
            if(!limit){
                limit = 10;
            }
            if(!offset){
                offset = 0;
            }
            if(!filtro){
                filtro = '';
            }
            const comunidades = await ComunidadDAO.obtenerComunidadesFiltro(limit, offset, filtro);
            res.status(200).json(comunidades);
        } catch (error) {
            next(new AppError('Error al obtener comunidades por filtro', 500));
        }
    }
}

module.exports = ComunidadController;