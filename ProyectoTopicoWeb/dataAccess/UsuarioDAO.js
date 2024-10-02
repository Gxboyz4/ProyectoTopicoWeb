const Usuario = require('../models/Usuario');
class UsuarioDAO{
    constructor(){}

    async crearUsuario(usuario){
        try{
            const nuevoUsuario = new Usuario(usuario);
            return await nuevoUsuario.save();
        }catch(error){
            throw error;
        }
    }
}  

module.exports = new UsuarioDAO();