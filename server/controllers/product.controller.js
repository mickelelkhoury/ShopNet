const Product = require('../models/product.model');

// CREATE NEW PRODUCT => /api/v1/admin/product/new
module.exports.newProduct = async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
};

// GET ALL PRODUCTS => /api/v1/product
module.exports.getProducts = async (req, res, next) => {
	const products = await Product.find({});
	res.status(200).json({
		success: true,
		message: 'All product from DB',
		count: products.length,
		products,
	});
};

// GET SINGLE PRODUCT DETAILS => /api/v1/product/:id
module.exports.getSingleProduct = async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({
			seccess: false,
			message: 'Product not found',
		});
	}

	res.status(200).json({
		success: true,
		message: 'Product found',
		product,
	});
};

// EDIT SINGLE PRODUCT => /api/v1/admin/product/:id
module.exports.editSingleProduct = async (req, res, next) => {
	const { id } = req.params;
	let product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({
			seccess: false,
			message: 'Product not found',
		});
	}

	product = await Product.findByIdAndUpdate(id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});

	res.status(200).json({
		success: true,
		message: 'Product found and edited',
		product,
	});
};

// DELETE SINGLE PRODUCT => /api/v1/admin/product/:id
module.exports.deleteSingleProduct = async (req, res, next) => {
	const { id } = req.params;
	let product = await Product.findById(id);

	if (!product) {
		return res.status(404).json({
			seccess: false,
			message: 'Product not found',
		});
	}

	product = await Product.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: 'Product found and deleted',
		product,
	});
};
