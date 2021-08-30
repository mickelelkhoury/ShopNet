const crypto = require('crypto');

const User = require('../models/user.model');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

// REGISTER USER => /api/v1/register
module.exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: 'Avatars/img_avatar_sm2toq',
			url: 'https://res.cloudinary.com/mickel/image/upload/v1627734959/Avatars/img_avatar_sm2toq.png',
		},
	});

	const token = user.getJwtToken();

	sendToken(user, 200, res);
});

// LOGIN USER => /api/v1/login
module.exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;

	// Check is email and password exist
	if (!email || !password) {
		return next(new ErrorHandler('Please enter email & password', 400));
	}

	// Find correct user
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		return next(new ErrorHandler('Invalid email or password', 401));
	}

	// Check if password is correct or not
	const isPasswordMatch = await user.comparePassword(password);

	if (!isPasswordMatch) {
		return next(new ErrorHandler('Invalid email or password', 401));
	}

	sendToken(user, 200, res);
});

// FORGOT PASSWORD => /api/v1/password/forgot
module.exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler('No user was found with this email', 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// Reset password url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/api/v1/password/reset/${resetToken}`;

	const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

	try {
		await sendEmail({
			email: user.email,
			subject: 'ShopNet Password Recovery',
			message,
		});

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

// RESET PASSWORD => /api/v1/password/reset/:token
module.exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// Hash the url token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});

	if (!user) {
		return next(
			new ErrorHandler('Password reset token is invalid or has expired', 400)
		);
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Password does not match', 400));
	}

	// Setup new password
	user.password = req.body.password;

	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// GET CURRENTLY LOGGED IN USER DETAILS => /api/v1/me
module.exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user,
	});
});

// UPDATE USER PROFILE => /api/v1/me/update
module.exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};

	//TODO: Update avatar

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		user,
	});
});

// UPDATE / CHANGE PASSWORD => /api/v1/password/update
module.exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	// Check previous user password
	const isMatched = await user.comparePassword(req.body.oldPassword);

	if (!isMatched) {
		return next(new ErrorHandler('Old password is incorrect', 400));
	}

	user.password = req.body.password;
	await user.save();

	sendToken(user, 200, res);
});

// LOGOUT USER => /api/v1/logout
module.exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: 'Logged Out',
	});
});

// ADMIN ROUTES

// GET ALL USERS => /api/v1/admin/users
module.exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	const usersCount = await User.countDocuments();

	res.status(200).json({
		success: true,
		usersCount,
		users,
	});
});

// GET SINGLE USER DETAILS => /api/v1/admin/user/:id
module.exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// UPDATE USER PROFILE FROM ADMIN => /api/v1/admin/user/:id
module.exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
	});

	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		user,
	});
});

// DELETE SINGLE USER => /api/v1/admin/user/:id
module.exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(
			new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404)
		);
	}

	//TODO: Remove avatar from cloudinary

	await user.remove();

	res.status(200).json({
		success: true,
		user,
	});
});
