const ComunidadUsuarios = require('../models/ComunidadUsuarios');

class ComunidadUsuarioDAO {
    constructor() { }

    async agregarUsuarioAComunidad(comunidadUsuario) {
        try{
            const nuevoComunidadUsuario = new ComunidadUsuarios(comunidadUsuario);
            const verificacion = await this.buscarUsuarioEnComunidad(comunidadUsuario.comunidad, comunidadUsuario.usuario) 
            if(verificacion){
                throw new Error('Ya existe un usuario con ese id en esa comunidad');
            }
            return await nuevoComunidadUsuario.save();
        }catch(error){
            throw error;
        }
    }

    async buscarUsuarioEnComunidad(idComunidad, idUsuario){
        try{
            const comunidadUsuarioConsultado = await ComunidadUsuarios.findOne({comunidad: idComunidad, usuario: idUsuario});
            return comunidadUsuarioConsultado;
        }catch(error){
            throw error;
        }
    }

    async obtenerComunidadesPorUsuario(idUsuario){
        try{
            const comunidadesUsuario = await ComunidadUsuarios.find({usuario: idUsuario})
            .populate('comunidad');
            if(!comunidadesUsuario || comunidadesUsuario.length === 0){
                throw new Error('No hay comunidades para ese usuario');
            }
            const comunidades = comunidadesUsuario.map((comunidadUsuario) => comunidadUsuario.comunidad);
            return comunidades;
        }catch(error){
            throw error;
        }
    }

    async cambiarRolUsuario(idComunidad, idUsuario, nuevoRol){
        try{
            const comunidadUsuarioConsultado = await ComunidadUsuarios.findOneAndUpdate(
            {comunidad: idComunidad, 
            usuario: idUsuario},
            {rol: nuevoRol},
            {new: true});
            if(!comunidadUsuarioConsultado){
                throw new Error('No existe un usuario con ese id en esa comunidad');
            }
            return comunidadUsuarioConsultado;
        }catch(error){
            throw error;
        }
    }

    async obtenerUsuariosDeComunidad(idComunidad){
        try {
            const comunidadUsuarios  = await ComunidadUsuarios.find({ comunidad: idComunidad })
            .populate({
                path: 'usuario',  
                select: '-contrasena -resenas_likeadas' 
            });
            if(!comunidadUsuarios ){
                throw new Error('No hay usuarios en esa comunidad');
            }

            const usuarios = comunidadUsuarios.map((comunidadUsuario) => {
                return comunidadUsuario.usuario;
            });

            return usuarios;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ComunidadUsuarioDAO();

