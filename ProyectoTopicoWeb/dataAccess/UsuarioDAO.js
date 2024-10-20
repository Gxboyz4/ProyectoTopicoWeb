const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

class UsuarioDAO {
    constructor() { }

    async crearUsuario(usuario) {
        try {
            const salt = await bcrypt.genSalt(10);
            const contrasenaHasheada = await bcrypt.hash(usuario.contrasena, salt);
            usuario.contrasena = contrasenaHasheada;
            const nuevoUsuario = new Usuario(usuario);
            return await nuevoUsuario.save();
        } catch (error) {
            throw error;
        }
    }

    async iniciarSesion(usuario) {
        try {
            const usuarioConsultado = await Usuario.findOne({ correo: usuario.correo });
            if (!usuarioConsultado) {
                throw new Error('No existe un usuario con ese correo');
            }
            const coincideContrasena = await bcrypt.compare(usuario.contrasena, usuarioConsultado.contrasena); 
            if (!coincideContrasena) {
                throw new Error('La contraseña es incorrecta');
            }
            return usuarioConsultado;
        } catch (error) {
            throw error;
        }
    }

    async obtenerPublicacionesLikeadas(idUsuario){
        try{
            const usuarioConsultado = await Usuario.findById(idUsuario, 'resenas_likeadas');
            return usuarioConsultado.resenas_likeadas;
        }catch(error){
            throw error;
        }
    }

}

module.exports = new UsuarioDAO();