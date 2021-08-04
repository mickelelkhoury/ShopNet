const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, orderController.newOrder);

module.exports = router;
