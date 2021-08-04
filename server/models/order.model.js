const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	shippingInfo: {
		address: {
			type: String,
			required: [true, 'Please enter your address'],
		},
		city: {
			type: String,
			required: [true, 'Please enter your city'],
		},
		phoneNumber: {
			type: String,
			required: [true, 'Please enter your phone number'],
		},
		postalCode: {
			type: String,
			required: [true, 'Please enter your postal code'],
		},
		country: {
			type: String,
			required: [true, 'Please enter your country'],
		},
	},
	user: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	orderItems: [
		{
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			image: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
			product: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Product',
			},
		},
	],
	paymentInfo: {
		id: {
			type: String,
		},
		status: {
			type: String,
		},
	},
	paidAt: {
		type: Date,
	},
	itemsPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	taxPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	shippingPrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	totlePrice: {
		type: Number,
		required: true,
		default: 0.0,
	},
	orderStatus: {
		type: String,
		required: true,
		default: 'Processing',
	},
	deliveredAt: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Order', orderSchema);
