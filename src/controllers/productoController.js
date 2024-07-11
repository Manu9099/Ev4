// controllers/productoController.js
// app/controllers/productosController.js
const Productos = require('../models/productoModel');

const productosController = {};

productosController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Productos.getById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ error: 'Error al obtener el producto por ID' });
  }
};

productosController.create = async (req, res) => {
  const { nombre, descripcion, precio, stock, id_categoria } = req.body;
  const nuevoProducto = {
    nombre,
    descripcion,
    precio,
    stock,
    id_categoria
  };
  try {
    const productId = await Productos.create(nuevoProducto);
    res.status(201).json({ id: productId, ...nuevoProducto });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

productosController.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;
  const productoActualizado = {
    nombre,
    descripcion,
    precio,
    stock
  };
  try {
    const success = await Productos.update(id, productoActualizado);
    if (!success) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ id, ...productoActualizado });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

productosController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await Productos.delete(id);
    if (!success) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = productosController;
