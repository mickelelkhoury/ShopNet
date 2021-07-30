const mongoose = require('mongoose');

const connectDB = () => {
	mongoose
		.connect(process.env.DB_LOCAL_URL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
		})
		.then((con) =>
			console.log(
				`MONGODB DATABASE CONNECTED WITH HOST: ${con.connection.host}`
			)
		)
		.catch((error) => console.error('ERROR:', error));
};

module.exports = connectDB;
