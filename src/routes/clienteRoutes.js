// routes/clienteRoutes.js
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas para gestión de clientes
router.post('/', clienteController.create);
router.get('/:id', clienteController.getById);
router.put('/:id', clienteController.update);
router.delete('/:id', clienteController.delete);

module.exports = router;
