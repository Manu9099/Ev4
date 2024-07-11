// models/Categoria.js
const db = require('../database/database');



const Categorias = {};

Categorias.getAll = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categorias', (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

Categorias.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM categorias WHERE id = ?', [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null); // No se encontró la categoría
      }
      return resolve(results[0]);
    });
  });
};

Categorias.create = (categoria) => {
  const { nombre, descripcion } = categoria;
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
      [nombre, descripcion],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.insertId); // ID de la categoría insertada
      }
    );
  });
};

Categorias.update = (id, datosActualizados) => {
  const { nombre, descripcion } = datosActualizados;
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
      [nombre, descripcion, id],
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result.changedRows > 0); // True si se actualizó, false si no
      }
    );
  });
};

Categorias.delete = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM categorias WHERE id = ?', [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result.affectedRows > 0); // True si se eliminó, false si no
    });
  });
};

module.exports = Categorias;
