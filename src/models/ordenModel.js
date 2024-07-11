// app/models/ordenesModel.js
const poool = require('../database/database1');

const Ordenes = {};


Ordenes.getById = async (id) => {
  const [rows] = await poool.query('SELECT * FROM ordenes WHERE id = ?', [id]);
  return rows[0];
}

Ordenes.create = async (orden) => {
  const conn = await poool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      'INSERT INTO ordenes (id_cliente,productos ,estado, total) VALUES (?,?, ?, ?)',
      [orden.id_cliente,orden.productos ,orden.estado, orden.total]
    );
    const ordenId = result.insertId;

    for (const productos1 of orden.productos1) {
      await conn.query(
        'INSERT INTO productos_orden (id_orden,id_producto, cantidad, precio_unitario) VALUES (?,?, ?,? )',
        [ordenId,productos1.id_producto, productos1.cantidad, productos1.precio_unitario]
      );
    }

    await conn.commit();
    return ordenId;
  } catch (error) {
   await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

Ordenes.update = async (id, orden) => {
  const conn = await poool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      'UPDATE ordenes SET  estado = ?  WHERE id = ?',
      [ orden.estado, id]
    );

    await conn.query('DELETE FROM productos_orden WHERE id_orden = ?', [id]);

    for (const producto of orden.productos) {
      await conn.query(
        'INSERT INTO productos_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [id, producto.id_producto, producto.cantidad, producto.precio_unitario]
      );
    }

    await conn.commit();
    return true;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};


Ordenes.delete = async (id) => {
  const conn = await poool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query('DELETE FROM productos_orden WHERE id_orden = ?', [id]);
    const [result] = await conn.query('DELETE FROM ordenes WHERE id = ?', [id]);

    await conn.commit();
    return result.affectedRows;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
Ordenes.getProductosOrden = async(id)  =>{
  const [rows] = await poool.query(
    `SELECT po.id_producto, p.nombre, po.cantidad, po.precio_unitario
     FROM productos_orden po
     JOIN productos p ON po.id_producto = p.id
     WHERE po.id_orden = ?`,
    [id]
  );
  return rows;
};


module.exports = Ordenes;

