const Order = require('../models/order.model');
const Product = require('../models/product.model');

const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// CREATE NEW ORDER => /api/v1/order
module.exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const {
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
	} = req.body;

	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		paymentInfo,
		paidAt: Date.now(),
		user: req.user.id,
	});

	res.status(200).json({
		success: true,
		order,
	});
});

// GET SINGLE ORDER DETAILS => /api/v1/order/:id
module.exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);

	if (!order) {
		return next(new ErrorHandler('No order found with this ID', 404));
	}

	res.status(200).json({
		success: true,
		order,
	});
});