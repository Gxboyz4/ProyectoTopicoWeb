const express = require('express');
const ComunidadController = require('../controllers/comunidadController');
const { model } = require('mongoose');
const router = express.Router();

router.post('/', ComunidadController.crearComunidad);
router.get('/:idComunidad', ComunidadController.obtenerComunidadPorId);
router.get('/query', ComunidadController.obtenerComunidadesFiltro);

module.exports = router;