const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, orderController.newOrder);
router
	.route('/order/:id')
	.get(isAuthenticatedUser, orderController.getSingleOrder);
router
	.route('/orders/me')
	.get(isAuthenticatedUser, orderController.getLoggedUserOrders);

router
	.route('/admin/orders')
	.get(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		orderController.getAllOrders
	);

module.exports = router;
