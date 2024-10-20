const UsuarioDAO = require('../dataAccess/UsuarioDAO');
const { AppError } = require('../utils/appError');
const jwt = require('jsonwebtoken');


class UsuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, correo, contrasena } = req.body;
            if (!nombre || !correo || !contrasena) {
                return next(new AppError('Debe ingresar todos los campos', 400));
            }
            const usuarioData = { nombre, correo, contrasena };
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
            if(correo === usuario.correo && contrasena === usuario.contrasena){
                const paylod = {
                   userid: usuario._id,
                   username: usuario.correo,
                   role: 'admin'
                };
                const token = jwt.sign(paylod, process.env.JWT_SECRET, {expiresIn: '1h'});
                   res.json({
                       msg: 'Login exitoso',
                       token
                   });
            }else{
                   res.status(401).json({
                       msg: 'Credenciales incorrectas'
                   });
            }
            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al iniciar sesion', 500));
        }
    }
    static async obtenerPublicacionesLikeadas(req, res, next) {
        try {
            const idUsuario = req.params.idUsuario;
            if (!idUsuario) {
                return next(new AppError('Error, no hay ID', 400));
            }
            const publicaciones = await UsuarioDAO.obtenerPublicacionesLikeadas(idUsuario);
            res.status(200).json(publicaciones);
        } catch (error) {
            next(new AppError('Error al obtener publicaciones likeadas', 500));
        }
    }
}

module.exports = UsuarioController;