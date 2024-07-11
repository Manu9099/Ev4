// models/Producto.js
const database = require('../database/database');

const Productos = {};

Productos.getById = (id) => {
  return new Promise((resolve, reject) => {
    database.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null); // No se encontró el producto
      }
      return resolve(results[0]);
    });
  });
};

Productos.create = (producto) => {
  const { nombre, descripcion, precio, stock, id_categoria } = producto;
  return new Promise((resolve, reject) => {
    database.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria) VALUES (?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, id_categoria],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.insertId); // ID del producto insertado
      }
    );
  });
};

Productos.update = (id, producto) => {
  const { nombre, descripcion, precio, stock } = producto;
  return new Promise((resolve, reject) => {
    database.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
      [nombre, descripcion, precio, stock, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.changedRows > 0); // True si se actualizó, false si no
      }
    );
  });
};

Productos.delete = (id) => {
  return new Promise((resolve, reject) => {
    database.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.affectedRows > 0); // True si se eliminó, false si no
    });
  });
};

module.exports = Productos;

