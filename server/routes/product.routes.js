const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

router.route('/product').get(productController.getProducts);
router.route('/product/:id').get(productController.getSingleProduct);

router.route('/admin//product/new').post(productController.newProduct);

router.route('/admin/product/:id').put(productController.editSingleProduct);

module.exports = router;
