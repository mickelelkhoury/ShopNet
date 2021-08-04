if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

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
