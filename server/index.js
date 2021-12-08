if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
const cloudinary = require('cloudinary');
const cors = require('cors');

const connectDB = require('./config/database');
const errorMiddleware = require('./middlewares/errors');

// Handle Uncaught exceptions
process.on('uncaughtException', (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log('SHUTTING DOWN SERVER DUE TO UNCAUGHT EXCEPTIONS');
	process.exit(1);
});

// DATABASE CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// CLOUDINARY SETUP
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ROUTES
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');

app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', orderRoutes);

// ERROR MIDDLEWARE
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
	console.log(
		`SERVER LISTENING ON PORT: ${PORT} in ${process.env.NODE_ENV} mode.`
	);
});

// Handle Unhandled promise rejections
process.on('unhandledRejection', (err) => {
	console.log(`ERROR: ${err.message}`);
	console.log('SHUTTING DOWN SERVER DUE TO UNHANDLED PROMISE REJECTION');
	server.close(() => process.exit(1));
});
