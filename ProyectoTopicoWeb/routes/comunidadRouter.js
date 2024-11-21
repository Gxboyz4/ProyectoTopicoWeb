const express = require('express');
const ComunidadController = require('../controllers/comunidadController');
const { model } = require('mongoose');
const router = express.Router();
const validateJWT = require('../utils/validateJWT');

router.post('/', validateJWT, ComunidadController.crearComunidad);
router.get('/search', ComunidadController.obtenerComunidadesPorBusqueda);
router.get('/query', ComunidadController.obtenerComunidadesFiltro);
router.get('/:idComunidad', ComunidadController.obtenerComunidadPorId);
router.get('/etiqueta/:etiqueta', ComunidadController.obtenerComunidadesPorEtiqueta);

module.exports = router;