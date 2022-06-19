const Constant = require('../models/constant');

exports.createConstant = async (req, res) => {
	const { type } = req.body;
	const constant = await Constant.findOne({ type });
	if (constant) return res.status(409).json({ message: `Type ${type} already exists` });

	await Constant.create(req.body);
	return res.status(201).json({ message: 'Created' });
};

exports.getConstants = async (req, res) => {
	const { type } = req.query;
	const constant = type ? await Constant.findOne({ type }) : await Constant.find();
	return res.status(200).json(constant);
};
