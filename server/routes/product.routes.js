const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

const { isAuthenticatedUser } = require('../middlewares/auth');

router
	.route('/product')
	.get(isAuthenticatedUser, productController.getProducts);
router.route('/product/:id').get(productController.getSingleProduct);

router.route('/admin/product/new').post(productController.newProduct);

router
	.route('/admin/product/:id')
	.put(productController.editSingleProduct)
	.delete(productController.deleteSingleProduct);

module.exports = router;
