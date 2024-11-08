

import { comunidadData } from '../data/comunidadData.js';

export class ComunidadService {
    static getComunidades(){
        // HACER PETICION A LA API
        let allComunidades = [];
        comunidadData.forEach(comunidad => {
            allComunidades = allComunidades.concat(comunidad);
        });
        return allComunidades;
    }

    
    static getComunidadesRecomendadas(cantidad = 3) {
        let comunidadesRandom = comunidadData.sort(() => 0.5 - Math.random());
        return comunidadesRandom.slice(0, cantidad);
    }

    static getComunidadById(comunidadId){
        // HACER PETICION A LA API
        return comunidadData.find(comunidad => comunidad.id === Number(comunidadId));
    }


}