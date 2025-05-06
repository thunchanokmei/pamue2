const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');

app.use('/api/products', productRoutes);

module.exports = app;