const { checkRoles } = require('../middlewares/role');
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
	const { status, message } = await checkRoles(req, ['Product']);
	if (!status) return res.status(400).json(message);

	const product = await Product.create(req.body);
	return res.status(201).json(product);
};

exports.getProducts = async (req, res) => {
	const products = await Product.find({}).populate('category');
	return res.status(200).json(products);
};

exports.getProduct = async (req, res) => {
	const { id } = req.params;
	const product = await Product.find({ _id: id }).populate('category');
	return res.status(200).json(product);
};

exports.updateProduct = async (req, res) => {
	const { status, message } = await checkRoles(req, ['Product']);
	if (!status) return res.status(400).json(message);

	const { id } = req.params;
	const product = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
	return res.status(201).json(product);
};

exports.removeProduct = async (req, res) => {
	const { status, message } = await checkRoles(req, ['Product']);
	if (!status) return res.status(400).json(message);

	const { id } = req.params;
	await Product.findOneAndRemove({ _id: id });
	return res.sendStatus(204);
};
