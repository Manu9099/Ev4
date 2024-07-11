// controllers/clienteController.js
const Cliente = require('../models/clienteModel');


const clienteController = {};



clienteController.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener el cliente por ID:', error);
    res.status(500).json({ error: 'Error al obtener el cliente por ID' });
  }
};

clienteController.create = async (req, res) => {
  const { nombre, email ,direccion, telefono} = req.body;
  const nuevoCliente = {
    nombre,
    email,
    telefono,
    direccion
  };
  try {
    const clienteId = await Cliente.create(nuevoCliente);
    res.status(201).json({ id: clienteId, ...nuevoCliente });
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

clienteController.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, email,direccion,telefono } = req.body;
  try {
    const success = await Cliente.update(id, { nombre, email,direccion,telefono });
    if (!success) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.send('Cliente actualizado correctamente');
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

clienteController.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const success = await Cliente.delete(id);
    if (!success) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};

module.exports = clienteController;
