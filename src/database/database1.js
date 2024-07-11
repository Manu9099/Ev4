const mysql = require('mysql2/promise');
require('dotenv').config();

// Configurar el pool de conexiones
const pool = mysql.createPool({
  
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Probar la conexión al pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
//  connection.release(); // Liberar la conexión al pool después de probarla
});

module.exports = pool;
