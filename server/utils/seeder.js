if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const Product = require('../models/product.model.js');
const connectDB = require('../config/database');

const products = require('../data/products.json');

connectDB();

const seedProducts = async () => {
	try {
		await Product.deleteMany();
		console.log('Product Deleted');

		await Product.insertMany(products);
		console.log('Products added');
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

seedProducts();
