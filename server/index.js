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
app.use(errorMiddleware);

// ROUTES
const productRoutes = require('./routes/product.routes');

app.use('/api/v1', productRoutes);

app.listen(process.env.PORT, () => {
	console.log(
		`SERVER LISTENING ON PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});
