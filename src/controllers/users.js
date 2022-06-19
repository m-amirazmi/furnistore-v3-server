const bcrypt = require('bcrypt');
const User = require('../models/user');
const Address = require('../models/address');
const { checkRoles } = require('../middlewares/role');

exports.createUser = async (req, res) => {
	const { email, password, username, address } = req.body;
	if (!password || !email) return res.status(400).json({ message: 'Username, email & password are required.' });

	const user = await User.findOne({ email }).exec();
	if (user) return res.status(400).json({ message: 'Email already exists.' });

	try {
		let addressId;
		if (typeof address === 'object' && Object.keys(address).length > 0) {
			const createAddress = await Address.create(address);
			addressId = createAddress._id.toString();
		}

		const hPassword = await bcrypt.hash(password, 10);
		const data = { ...req.body, password: hPassword, address: addressId };
		await User.create(data);
		return res.status(201).json({ message: `Successfully created new user ${email}!` });
	} catch (error) {
		console.log(error);
	}
};

exports.updateUser = async (req, res) => {
	const user = await User.findOne({ _id: req.user.id }).exec();
	if (!user) return res.status(409).json({ message: 'User not found!' });

	try {
		let addressId;
		if (typeof req.body.address && Object.keys(req.body.address).length > 0) {
			const address = await Address.findOne({ _id: user.address.toString() });

			if (!address) {
				const newAddress = await Address.create(req.body.address);
				addressId = newAddress._id.toString();
			} else {
				Object.assign(address, req.body.address);
				await address.save();
				addressId = address._id.toString();
			}
		}
		const data = { ...req.body, address: addressId };
		Object.assign(user, data);
		await user.save();
		return res.status(201).json({ message: 'Updated' });
	} catch (error) {
		console.log(error);
	}
};

exports.getOneUser = async (req, res) => {
	const data = await User.findOne({ _id: req.user.id }).populate('address', '-password');
	if (!data) return res.status(409).json({ message: 'User not found!' });
	const { password, __v, refresh_token, ...user } = data._doc;
	return res.status(200).json(user);
};

exports.removeUser = async (req, res) => {
	checkRoles(req, ['Admin']);
	const { id } = req.params;
	const user = await User.findOne({ _id: id });
	await Address.findOneAndDelete({ _id: user.address.toString() });
	user.remove();
	return res.status(204).json({ message: 'User removed' });
};
