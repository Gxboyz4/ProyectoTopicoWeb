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

}

module.exports = new ComunidadDAO();