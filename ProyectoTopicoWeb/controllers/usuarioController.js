const UsuarioDAO = require('../dataAccess/UsuarioDAO');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');


class UsuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, correo, contrasena, avatar } = req.body;
            if (!nombre || !correo || !contrasena || !avatar) {
                return next(new AppError('Debe ingresar todos los campos', 400));
            }
            const usuarioData = { nombre, correo, contrasena, avatar };
            const usuario = await UsuarioDAO.crearUsuario(usuarioData);
            res.status(201).json(usuario);
        } catch (error) {
            next(new AppError('Error al crear usuario', 500));
        }
    }


    static async iniciarSesion(req, res, next) {
        try {
            const { correo, contrasena } = req.body;
            if (!correo || !contrasena) {
                return next(new AppError('Debe ingresar todos los campos', 400));
            }
            const usuarioData = { correo, contrasena };
            const usuario = await UsuarioDAO.iniciarSesion(usuarioData);
            //Se agregó lo siguiente para el manejo de tokens.
            const paylod = {
                userid: usuario._id,
                username: usuario.correo,
                role: 'admin'
            };
            const token = jwt.sign(paylod, process.env.JWT_SECRET, { expiresIn: '4h' });
            res.status(200).json({usuario, token});
        } catch (error) {
            next(new AppError('Error al iniciar sesion', 500));
        }
    }
    static async obtenerPublicacionesLikeadas(req, res, next) {
        try {
            const idUsuario = req.params.id;
            console.log("Prueba :" + idUsuario);
            if (!idUsuario) {
                return next(new AppError('Error, no hay ID', 400));
            }
            const publicaciones = await UsuarioDAO.obtenerPublicacionesLikeadas(idUsuario);
            res.status(200).json(publicaciones);
        } catch (error) {
            next(new AppError('Error al obtener publicaciones likeadas', 500));
        }
    }

    static async obtenerUsuarioPorId(req, res, next) {
        try {
            const idUsuario = req.params.id;
            if (!idUsuario) {
                return next(new AppError('Error, no hay ID', 400));
            }
            const usuario = await UsuarioDAO.buscarUsuarioPorId(idUsuario);
            if (!usuario) {
                return next(new AppError('Usuario no encontrado', 404));
            }
            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al obtener el usuario', 500));
        }
    }

    static async actualizarUsuarioPorId(req, res, next) {
    try{
        const idUsuario = req.params.id;
        const usuario = req.body;
        if(!idUsuario){
            return next(new AppError('Error, no hay ID', 400));
        }
        const usuarioActualizado = await UsuarioDAO.actualizarUsuarioPorId(idUsuario, usuario);
        res.status(200).json(usuarioActualizado);
    }catch(error){
        next(new AppError('Error al actualizar usuario', 500));
    }
    }
}

module.exports = UsuarioController;