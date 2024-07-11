// controllers/categoriaController.js
const Categoria = require('../models/categoriaModel');

const categoriasController = {};



categoriasController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.getById(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    console.error('Error al obtener la categoría por ID:', error);
    res.status(500).json({ error: 'Error al obtener la categoría por ID' });
  }
};

categoriasController.create = async (req, res) => {
  const { nombre, descripcion } = req.body;
  const nuevaCategoria = {
    nombre,
    descripcion
  };
  try {
    const categoriaId = await Categoria.create(nuevaCategoria);
    res.status(201).json({ id: categoriaId, ...nuevaCategoria });
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ error: 'Error al crear la categoría' });
  }
};

categoriasController.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const success = await Categoria.update(id, { nombre, descripcion });
    if (!success) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.send('Categoría actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
};

categoriasController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await Categoria.delete(id);
    if (!success) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};

module.exports = categoriasController;
