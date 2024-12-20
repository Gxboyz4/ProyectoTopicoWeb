import { comunidadData } from '../data/comunidadData.js';
const API_URL = 'http://localhost:3000/';
const URL_COMUNIDADES = 'api/comunidades/';

export class ComunidadService {

    /*Los primeros métodos son para datos de prueba*/
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


    /*Métodos del servicio*/
    static crearComunidad(comunidad, token) {
        return fetch(`${API_URL}${URL_COMUNIDADES}`, {
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
        return fetch(`${API_URL}${URL_COMUNIDADES}${comunidadId}`, {
            method: 'GET'
        }).then(response => {
            return response.ok ? response.json() : null;
        });
    }

    static obtenerComunidadesFiltro(filtro) {
        return fetch(`${API_URL}${URL_COMUNIDADES}query?filtro=${filtro}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => data);
    }

    static getComunidadesPorBusqueda(busqueda) {
        return fetch(`${API_URL}${URL_COMUNIDADES}search?busqueda=${busqueda}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => data)
          .catch(error => {
              console.log(error);
              return [];
          });
    }

    static getComunidadesByGenero(genero){
        // HACER PETICION A LA API
        return comunidadData.filter(comunidad => comunidad.genero === genero);
    }

    static getComunidadesPorEtiqueta(etiqueta){
        return fetch(`${API_URL}${URL_COMUNIDADES}etiqueta/${etiqueta}`, {
            method: 'GET'
        }).then(response => response.json())
          .then(data => data)
          .catch(error => {
              console.log(error);
              return [];
          });
    }



}