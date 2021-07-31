const User = require('../models/user.model');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

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

	res.status(201).json({
		success: true,
		token,
	});
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

	const token = user.getJwtToken();

	res.status(200).json({
		success: true,
		token,
	});
});
