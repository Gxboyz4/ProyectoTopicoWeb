const mongoose = require('mongoose');
require('dotenv').config({path:'./variables.env'});

const config = {
    url: process.env.URL_MONGOOSE,
    options: {}
}

function conectar(){
    return mongoose.connect(config.url, config.options);
}

function desconectar(){
    return mongoose.disconnect();
}

module.exports = {
    conectar,
    desconectar
};