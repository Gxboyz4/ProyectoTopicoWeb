const Comunidad = require('../models/Comunidad');

class ComunidadDAO {
    constructor() { }

    async crearComunidad(comunidad) {
        try{
            const nuevaComunidad = new Comunidad(comunidad);
            return await nuevaComunidad.save();
        }catch(error){
            throw error;
        }
    }

    async obtenerComunidadPorId(idComunidad){
        try{
            const comunidadConsultada = await Comunidad.findById(idComunidad);
            if(!comunidadConsultada){
                throw new Error('No existe una comunidad con ese id');
            }
            return comunidadConsultada;
        }catch(error){
            throw Error;
        }
    }

}

module.exports = new ComunidadDAO();