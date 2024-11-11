import { comunidadData } from '../data/comunidadData.js';
export class ComunidadService {
    #API_URL = 'http://localhost:3000/';
    #URL_COMUNIDADES = 'api/comunidades/'; 
    /*Los primeros métodos son para datos de prueba */
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

    /*Métodos del servicio */
    static crearComunidad(comunidad, token) {
        return fetch(`${this.API_URL}${this.URL_COMUNIDADES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(comunidad)
        }).then(response => response.json())
          .then(data => data);
    }

    static obtenerComunidadPorId(comunidadId) {
        return fetch(`${this.API_URL}${this.URL_COMUNIDADES}${comunidadId}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => data);
    }

    static obtenerComunidadesFiltro(filtro) {
        return fetch(`${this.API_URL}${this.URL_COMUNIDADES}query?filtro=${filtro}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => data);
    }





}