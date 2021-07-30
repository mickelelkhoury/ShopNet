const Product = require('../models/product.model');

// Create new product
module.exports.newProduct = async (req, res, next) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		success: true,
		product,
	});
};

// Get all products
module.exports.getProducts = async (req, res, next) => {
	res.status(200).json({
		success: true,
		message: 'This route will show all products in DB.',
	});
};
