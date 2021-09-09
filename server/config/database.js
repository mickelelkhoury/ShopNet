const mongoose = require('mongoose');

const dbUrl = process.env.DB_URI || 'mongodb://localhost:27017/ecommerce';

const connectDB = () => {
	mongoose
		.connect(dbUrl, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		})
		.then((con) =>
			console.log(
				`MONGODB DATABASE CONNECTED WITH HOST: ${con.connection.host}`
			)
		)
		.catch((error) => console.error('ERROR:', error));
};

module.exports = connectDB;
