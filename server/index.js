if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const connectDB = require('./config/database');
const errorMiddleware = require('./middlewares/errors');

// DATABASE CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json());

// ROUTES
const productRoutes = require('./routes/product.routes');

app.use('/api/v1', productRoutes);

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
	console.error(`ERROR: ${err.message}`);
	console.log('STOPING SERVER DUE TO UNHANDLED PROMISE REJECTION');
	server.close(() => {
		process.exit(1);
	});
});
