const ComunidadUsuarios = require('../models/ComunidadUsuarios');

class ComunidadUsuarioDAO {
    constructor() { }

    async agregarUsuarioAComunidad(comunidadUsuario) {
        try{
            const nuevoComunidadUsuario = new ComunidadUsuarios(comunidadUsuario);
            return await nuevoComunidadUsuario.save();
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
            const usuarios = await ComunidadUsuarios.find({comunidad: idComunidad});
            if(!usuarios){
                throw new Error('No hay usuarios en esa comunidad');
            }
            return usuarios;
        } catch (error) {
            throw error;
        }
    }

}

module.exports = new ComunidadUsuarioDAO();

