// app/routes/ordenesRoutes.js
const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenController');

router.get('/:id', ordenesController.getById);
router.post('/', ordenesController.create);
router.put('/:id', ordenesController.update);
router.delete('/:id', ordenesController.delete);

module.exports = router;

