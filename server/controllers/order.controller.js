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

// GET LOGGED IN USER ORDERS => /api/v1/order/me
module.exports.getLoggedUserOrders = catchAsyncErrors(
	async (req, res, next) => {
		const orders = await Order.find({ user: req.user.id });

		res.status(200).json({
			success: true,
			orders,
		});
	}
);

// GET ALL ORDERS ADMIN => /api/v1/admin/orders
module.exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find();

	const ordersCount = await Order.countDocuments();

	let totalAmount = 0;
	orders.forEach((order) => (totalAmount += order.totalPrice));

	res.status(200).json({
		success: true,
		totalAmount,
		ordersCount,
		orders,
	});
});

// UPDATE / PROCESS ORDER ADMIN => /api/v1/admin/order/:id
module.exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);

	if (!order) {
		return next(new ErrorHandler('No order found with this ID', 404));
	}

	if (order.orderStatus === 'Delivered') {
		return next(new ErrorHandler('You have already delivered this order', 400));
	}

	order.orderItems.forEach(async (item) => {
		await updateStock(item.product, item.quantity);
	});

	order.orderStatus = req.body.orderStatus;
	order.deliveredAt = Date.now();

	await order.save();

	res.status(200).json({
		success: true,
		order,
	});
});

// FUNCTIONS //

async function updateStock(id, quantity) {
	const product = await Product.findById(id);

	product.stock -= quantity;

	await product.save();
}
