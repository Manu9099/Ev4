// models/Cliente.js
const database = require('../database/database');



const Clientes = {};

Clientes.getById = (id) => {
  return new Promise((resolve, reject) => {
    database.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null); // No se encontró el cliente
      }
      return resolve(results[0]);
    });
  });
};

Clientes.create = (cliente) => {
  const { nombre, email,direccion,telefono } = cliente;
  return new Promise((resolve, reject) => {
    database.query(
      'INSERT INTO clientes (nombre, email,telefono,direccion) VALUES (?, ?,?,?)',
      [nombre, email,telefono,direccion],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.insertId); // ID del cliente insertado
      }
    );
  });
};

Clientes.update = (id, datosActualizados) => {
  const { nombre, email,direccion,telefono } = datosActualizados;
  return new Promise((resolve, reject) => {
    database.query(
      'UPDATE clientes SET nombre = ?, email = ?,telefono=?,direccion=? WHERE id = ?',
      [nombre, email,telefono,direccion, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.changedRows > 0); // True si se actualizó, false si no
      }
    );
  });
};

Clientes.delete = (id) => {
  return new Promise((resolve, reject) => {
    database.query('DELETE FROM clientes WHERE id = ?', [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.affectedRows > 0); // True si se eliminó, false si no
    });
  });
};

module.exports = Clientes;

