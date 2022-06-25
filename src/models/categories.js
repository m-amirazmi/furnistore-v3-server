const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
	name: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	images: {
		type: Array,
		required: false,
	},
	is_featured: {
		type: Boolean,
		default: true,
	},
	is_enabled: {
		type: Boolean,
		default: true,
	},
	created_at: {
		type: Number,
		default: Date.now(),
	},
});

module.exports = model('Category', categorySchema);
