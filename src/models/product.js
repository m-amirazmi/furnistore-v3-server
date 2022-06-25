const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	images: {
		type: Array,
		required: true,
	},
	sku: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	discounted_price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	is_enabled: {
		type: Boolean,
		default: true,
	},
	is_featured: {
		type: Boolean,
		default: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	vendor: {
		type: String,
		required: true,
	},
	created_at: {
		type: Number,
		default: Date.now(),
	},
});

module.exports = model('Product', productSchema);
