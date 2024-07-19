// src/index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // Añadir rutas de clientes, órdenes y categorías
const ordenRoutes = require('./routes/ordenRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const connection = require('./database/database');
const auth = require(`./auth`);

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//rutas protegidas
app.get('/', (req, res) => {
  res.send('Bienvenido a to TechStore API');
});

// Rutas protegidas
app.get('/api/protected', auth, (req, res) => {
  res.send(`Welcome ${req.user.name}`);
});


// Rutas principales
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/categorias', categoriaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
