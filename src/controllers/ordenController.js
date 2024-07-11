// app/controllers/ordenesController.js
const Ordenes = require('../models/ordenModel');

const ordenesController = {};



ordenesController.getById = async (req, res) => {
  try {
    const orden = await Ordenes.getById(req.params.id);
    if (orden) {
      const productos = await Ordenes.getProductosOrden(req.params.id);
      res.json({ ...orden, productos });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

ordenesController.create = async (req, res) => {
  try {
    const id = await Ordenes.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ordenesController.update = async (req, res) => {
  try {
    const success = await Ordenes.update(req.params.id, req.body);
    if (success) {
      res.json({ id: req.params.id, ...req.body });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

ordenesController.delete = async (req, res) => {
  try {
    const affectedRows = await Ordenes.delete(req.params.id);
    if (affectedRows) {
      res.json({ message: 'Orden eliminada exitosamente' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = ordenesController;
