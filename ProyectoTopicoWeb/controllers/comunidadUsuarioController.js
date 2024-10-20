const ComunidadUsuario = require('../dataAccess/ComunidadUsuarioDAO');
const { AppError } = require('../utils/appError');

class ComunidadUsuarioController {
    static async agregarUsuarioAComunidad(req, res, next) {
        try{
            const {usuario, comunidad, rol} = req.body;
            if(!usuario || !comunidad || !rol){
                return next(new AppError('Faltan datos de la comunidad Usuario', 400));
            }
            const comunidadUsuarioData = {usuario, comunidad, rol};
            const comunidadUsuario = await ComunidadUsuario.agregarUsuarioAComunidad(comunidadUsuarioData);
            res.status(201).json(comunidadUsuario);
        }catch(error){
            next(new AppError('Error al agregar usuario a comunidad', 500));
        }
    }

    static async cambiarRolUsuario(req, res, next) {
        try{
            const {idComunidad, idUsuario, nuevoRol} = req.query;
            const comunidadUsuario = await ComunidadUsuario.cambiarRolUsuario(idComunidad, idUsuario, nuevoRol);
            res.status(200).json(comunidadUsuario);
        }catch(error){
            next(new AppError('Error al cambiar rol de usuario', 500));
        }
    }

    static async obtenerUsuariosDeComunidad(req, res, next) {
        try{
            const {idComunidad} = req.params;
            const usuarios = await ComunidadUsuario.obtenerUsuariosDeComunidad(idComunidad);
            res.status(200).json(usuarios);
        }catch(error){
            next(new AppError('Error al obtener usuarios de comunidad', 500));
        }
    }

}

module.exports = ComunidadUsuarioController;

