const Product = require('../models/product.model');

const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// CREATE NEW PRODUCT => /api/v1/admin/product/new
module.exports.newProduct = catchAsyncErrors(async (req, res, next) => {
	req.body.user = req.user.id;

	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
});

// GET ALL PRODUCTS => /api/v1/product
module.exports.getProducts = catchAsyncErrors(async (req, res, next) => {
	const resPerPage = 4;
	const productCount = await Product.countDocuments();

	const apiFeatures = new APIFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resPerPage);

	const products = await apiFeatures.query;

	res.status(200).json({
		success: true,
		message: 'All product from DB',
		count: products.length,
		productCount,
		products,
	});
});

// GET SINGLE PRODUCT DETAILS => /api/v1/product/:id
module.exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		message: 'Product found',
		product,
	});
});

// EDIT SINGLE PRODUCT => /api/v1/admin/product/:id
module.exports.editSingleProduct = catchAsyncErrors(async (req, res, next) => {
	const { id } = req.params;
	let product = await Product.findById(id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	product = await Product.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		success: true,
		message: 'Product found and edited',
		product,
	});
});

// DELETE SINGLE PRODUCT => /api/v1/admin/product/:id
module.exports.deleteSingleProduct = catchAsyncErrors(
	async (req, res, next) => {
		const { id } = req.params;
		let product = await Product.findById(id);

		if (!product) {
			return next(new ErrorHandler('Product not found', 404));
		}

		product = await Product.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: 'Product found and deleted',
			product,
		});
	}
);
