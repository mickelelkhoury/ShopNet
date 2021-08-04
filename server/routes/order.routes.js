const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, orderController.newOrder);
router
	.route('/order/:id')
	.get(isAuthenticatedUser, orderController.getSingleOrder);
router
	.route('/order/me')
	.get(isAuthenticatedUser, orderController.getLoggedUserOrders);

module.exports = router;
