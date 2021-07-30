const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.route('/products').get(productController.getProducts);

module.exports = router;
