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
	const resPerPage = 8;
	const productsCount = await Product.countDocuments();

	const apiFeatures = new APIFeatures(Product.find(), req.query)
		.search()
		.filter()
		.pagination(resPerPage);

	const products = await apiFeatures.query;

	res.status(200).json({
		success: true,
		message: 'All product from DB',
		// count: products.length,
		productsCount,
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

// TODO: CREATE REVIEW MODEL!!!!!!!!!!!!!!!!!!!!!!!!
// REVIEWS //

// CREATE NEW REVIEW => /api/v1/review
module.exports.createProductReview = catchAsyncErrors(
	async (req, res, next) => {
		const { rating, comment, productId } = req.body;

		const review = {
			user: req.user._id,
			name: req.user.name,
			rating: Number(rating),
			comment,
		};

		const product = await Product.findById(productId);

		if (!product) {
			return next(new ErrorHandler('Product not found', 404));
		}

		const isReviwed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		);

		if (isReviwed) {
			product.reviews.forEach((review) => {
				if (review.user.toString() === req.user._id.toString()) {
					review.comment = comment;
					review.rating = rating;
				}
			});
		} else {
			product.reviews.push(review);
			product.numOfReviews = product.reviews.length;
		}

		product.ratings =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save({ validateBeforeSave: false });

		res.status(200).json({
			success: true,
			product,
		});
	}
);

// GET PRODUCT REVIEWS => /api/v1/reviews
module.exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
	const product = await Product.findById(req.query.id);

	if (!product) {
		return next(new ErrorHandler('Product not found', 404));
	}

	res.status(200).json({
		success: true,
		reviews: product.reviews,
	});
});

// DELETE PRODUCT REVIEW => api/v1/reviews
module.exports.deleteProductReview = catchAsyncErrors(
	async (req, res, next) => {
		const product = await Product.findById(req.query.productId);

		if (!product) {
			return next(new ErrorHandler('Product not found', 404));
		}

		const reviews = product.reviews.filter(
			(review) => review._id.toString() !== req.query.reviewId.toString()
		);

		const numOfReviews = reviews.length;

		const ratings =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			reviews.length;

		await Product.findByIdAndUpdate(
			req.query.productId,
			{
				reviews,
				ratings,
				numOfReviews,
			},
			{ new: true, runValidators: true }
		);

		res.status(200).json({
			success: true,
			product,
		});
	}
);
