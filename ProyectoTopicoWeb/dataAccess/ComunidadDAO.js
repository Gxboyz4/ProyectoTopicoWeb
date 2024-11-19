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

    async obtenerComunidadesFiltro (limit = 10, offset = 0, filtroContenido = '') {
        return await Comunidad.find({nombre: {$regex: filtroContenido, $options: 'i'}}).skip(offset).limit(limit);
    }

    async obtenerComunidadesPorBusqueda(busqueda){
        try {
            return await Comunidad.find({ nombre: { $regex: busqueda, $options: 'i' } });
        } catch (error) {
            console.log(error);
            throw new Error('Error al realizar la búsqueda de comunidades');
        }
    }

}

module.exports = new ComunidadDAO();