import config from '../config/config.js';

const API_URL = 'http://www.omdbapi.com/';

export class PeliculaService {

    static getNombrePeliculaRandom(){
        const peliculas = ['toy story', 'star wars', 'avengers', 'interstellar', 'arcane', 'click'];
        return peliculas[Math.floor(Math.random() * peliculas.length)];
    }

    static getPeliculas(nombre = ''){
        nombre = nombre === '' ? PeliculaService.getNombrePeliculaRandom() : nombre;
        return fetch(`${API_URL}/?s=${nombre}&page=1&apikey=${config.API_KEY}`)
            .then(response => response.json())
            .then(data => data.Search);
    }
 
    static getPeliculaPorId(id){
        return fetch(`${API_URL}/?i=${id}&apikey=${config.API_KEY}`)
            .then(response => response.json())
            .then(data => data);
    }

}

//CONSULTA POR ID
//http://www.omdbapi.com/?i=imdbID&apikey=APIKEY 

//CONSULTA POR NOMBRE
//http://www.omdbapi.com/?s=nombre&page=1&apikey=APIKEY 