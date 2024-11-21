const ComunidadUsuario = require('../dataAccess/ComunidadUsuarioDAO');
const { AppError } = require('../utils/appError');
const Usuario = require('../dataAccess/UsuarioDAO');
const Comunidad = require('../dataAccess/ComunidadDAO');
const Resena = require('../dataAccess/ResenaDAO');

class ComunidadUsuarioController {
    static async agregarUsuarioAComunidad(req, res, next) {
        try {
            const { usuario, comunidad, rol } = req.body;
            if (!usuario || !comunidad || !rol) {
                return next(new AppError('Faltan datos de la comunidad Usuario', 400));
            }
            const usuarioConsultado = await Usuario.buscarUsuarioPorId(usuario);
            if (!usuarioConsultado) {

                return next(new AppError('El usuario no existe', 404));
            }
            const comunidadConsultada = await Comunidad.obtenerComunidadPorId(comunidad);
            if (!comunidadConsultada) {
                return next(new AppError('La comunidad no existe', 404));
            }
            const comunidadUsuarioData = { usuario, comunidad, rol };
            const comunidadUsuario = await ComunidadUsuario.agregarUsuarioAComunidad(comunidadUsuarioData);
            res.status(201).json(comunidadUsuario);
        } catch (error) {
            next(new AppError('Error al agregar usuario a comunidad', 500));
        }
    }

    static async cambiarRolUsuario(req, res, next) {
        try {
            const { idComunidad, idUsuario, nuevoRol } = req.query;
            const comunidadUsuario = await ComunidadUsuario.cambiarRolUsuario(idComunidad, idUsuario, nuevoRol);
            res.status(200).json(comunidadUsuario);
        } catch (error) {
            next(new AppError('Error al cambiar rol de usuario', 500));
        }
    }

    static async obtenerUsuariosDeComunidad(req, res, next) {
        try {
            const { idComunidad } = req.params;
            const usuarios = await ComunidadUsuario.obtenerUsuariosDeComunidad(idComunidad);
            res.status(200).json(usuarios);
        } catch (error) {
            next(new AppError('Error al obtener usuarios de comunidad', 500));
        }
    }

    static async obtenerComunidadesPorUsuario(req, res, next) {
        try {
            const { idUsuario } = req.params;
            const comunidades = await ComunidadUsuario.obtenerComunidadesPorUsuario(idUsuario);
            res.status(200).json(comunidades);
        } catch (error) {
            next(new AppError('Error al obtener comunidades de usuario', 500));
        }
    }

    static async obtenerPublicacionesComunidadesPorUsuario(req, res, next) {
        try {
            const { idUsuario } = req.params;
            console.log(idUsuario);
            const comunidades = await ComunidadUsuario.obtenerComunidadesPorUsuario(idUsuario);
    
            if (!comunidades || comunidades.length === 0) {
                return res.status(404).json({ mensaje: 'El usuario no pertenece a ninguna comunidad.' });
            }
    
            const todasLasPublicaciones = (
                await Promise.all(
                    comunidades.map(async (comunidad) => {
                        return Resena.obtenerResenasDeComunidad(comunidad._id);
                    })
                )
            ).flat(); 
    
            if (todasLasPublicaciones.length === 0) {
                return res.status(404).json({ mensaje: 'No hay publicaciones en las comunidades de este usuario.' });
            }
    
            const publicacionesMasRecientes = todasLasPublicaciones
                .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)) 
                .slice(0, 5); 
    
            res.status(200).json({ publicaciones: publicacionesMasRecientes });
        } catch (error) {
            console.log(error.message);
            next(new AppError('Error al obtener publicaciones de comunidades de usuario', 500));
        }
    }
    
     static async buscarUsuarioEnComunidad(req, res, next){
        try {
            const { idComunidad, idUsuario } = req.query;
            const comunidadUsuario = await ComunidadUsuario.buscarUsuarioEnComunidad(idComunidad, idUsuario);
            if(!comunidadUsuario){
                return next(new AppError('El usuario no pertenece a la comunidad', 404));
            }
            res.status(200).json(comunidadUsuario);
        } catch (error) {
            next(new AppError('Error al buscar usuario en comunidad', 500));
        }
    }

}

module.exports = ComunidadUsuarioController;

