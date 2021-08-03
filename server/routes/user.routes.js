const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

const { isAuthenticatedUser } = require('../middlewares/auth');

// AUTH ROUTES
router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);

router.route('/password/forgot').post(userController.forgotPassword);
router.route('/password/reset/:token').put(userController.resetPassword);

router.route('/logout').get(userController.logout);

// USER ROUTES
router.route('/me').get(isAuthenticatedUser, userController.getUserProfile);
router
	.route('/me/update')
	.put(isAuthenticatedUser, userController.updateProfile);
router
	.route('/password/update')
	.put(isAuthenticatedUser, userController.updatePassword);

module.exports = router;
