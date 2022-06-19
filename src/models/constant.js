const { Schema, model } = require('mongoose');

const constantSchema = Schema({
	type: String,
	value: Object,
	created_at: {
		type: Number,
		default: Date.now(),
	},
});

module.exports = model('Constant', constantSchema);
