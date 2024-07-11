// routes/productoRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para gestión de productos
router.post('/', productoController.create);
router.get('/:id', productoController.getById);
router.put('/:id', productoController.update);
router.delete('/:id', productoController.delete);

module.exports = router;
