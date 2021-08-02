const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/product').get(productController.getProducts);
router.route('/product/:id').get(productController.getSingleProduct);

router
	.route('/admin/product/new')
	.post(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		productController.newProduct
	);

router
	.route('/admin/product/:id')
	.put(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		productController.editSingleProduct
	)
	.delete(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		productController.deleteSingleProduct
	);

module.exports = router;
