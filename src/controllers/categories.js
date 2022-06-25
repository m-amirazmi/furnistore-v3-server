const { checkRoles } = require('../middlewares/role');
const Category = require('../models/categories');

exports.createCategory = async (req, res) => {
	const { status, message } = await checkRoles(req, ['Product']);
	if (!status) return res.status(400).json(message);

	const category = await Category.create(req.body);
	return res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
	const categories = await Category.find({});
	return res.status(200).json(categories);
};

exports.getCategory = async (req, res) => {
	const { id } = req.params;
	const category = await Category.findOne({ _id: id });
	return res.status(200).json(category);
};

exports.updateCategory = async (req, res) => {
	const { status, message } = await checkRoles(req, ['Product']);
	if (!status) return res.status(400).json(message);

	const { id } = req.params;
	const category = await Category.findOneAndUpdate({ _id: id }, req.body, { new: true });
	return res.status(201).json(category);
};

exports.removeCategory = async (req, res) => {
	const { status, message } = await checkRoles(req, ['Product']);
	if (!status) return res.status(400).json(message);

	const { id } = req.params;
	await Category.findOneAndRemove({ _id: id });
	return res.sendStatus(204);
};
