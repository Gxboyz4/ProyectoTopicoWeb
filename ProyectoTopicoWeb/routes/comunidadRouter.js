const express = require('express');
const ComunidadController = require('../controllers/comunidadController');
const { model } = require('mongoose');
const router = express.Router();

router.post('/', ComunidadController.crearComunidad);
router.get('/query', ComunidadController.obtenerComunidadesFiltro);
router.get('/:idComunidad', ComunidadController.obtenerComunidadPorId);

module.exports = router;