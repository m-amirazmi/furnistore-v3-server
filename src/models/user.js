const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	username: {
		type: String,
		required: false,
	},
	first_name: {
		type: String,
		required: false,
	},
	last_name: {
		type: String,
		required: false,
	},
	phone_number: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: Array,
		default: ['Customer'],
	},
	address: {
		type: Schema.Types.ObjectId,
		ref: 'Address',
		required: false,
	},
	created_at: {
		type: Number,
		default: Date.now(),
	},
	refresh_token: String,
});

module.exports = model('User', userSchema);
