const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.route('/product').get(productController.getProducts);
router.route('/product/new').post(productController.newProduct);

module.exports = router;
