const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/register').post(userController.registerUser);
router.route('/login').post(userController.loginUser);
router.route('/password/forgot').post(userController.forgotPassword);

router.route('/logout').get(userController.logout);

module.exports = router;
