const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/categories', productController.getAllCategories);
router.post('/add', productController.addProduct);
router.post('/purchase', productController.purchaseProduct);
router.get('/products', productController.getProductsByCategory);
router.get('/id/:id', productController.getProductById);

module.exports = router;