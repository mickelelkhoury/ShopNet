if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.json());

// ROUTES
const productRoutes = require('./routes/product.routes');

app.use('/api/v1', productRoutes);

app.listen(process.env.PORT, () => {
	console.log(
		`SERVER LISTENING ON PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
	);
});
