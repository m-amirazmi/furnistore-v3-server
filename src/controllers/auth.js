const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { createUser } = require('./users');

exports.signup = async (req, res) => {
	return await createUser(req, res);
};

exports.signin = async (req, res) => {
	const { email, password } = req.body;
	if (!password || !email) return res.status(400).json({ message: 'Email & password are required.' });

	const user = await User.findOne({ email }).exec();
	if (!user) return res.sendStatus(409);

	const matchedPassword = await bcrypt.compare(password, user.password);
	if (!matchedPassword) return res.sendStatus(401);

	const accessToken = jwt.sign({ username: user.username, roles: user.roles, id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
	const refreshToken = jwt.sign({ username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

	user.refresh_token = refreshToken;
	await user.save();

	res.cookie('jwt', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
	res.json({ roles: user.roles, accessToken });
};

exports.signout = async (req, res) => {
	console.log('masuk sin?');

	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const findUser = await User.findOne({ refreshToken }).exec();
	if (findUser) {
		findUser.refresh_token = '';
		await findUser.save();
	}

	res.clearCookie('jwt', {});
	return res.sendStatus(204);
};

exports.refreshToken = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;

	const findUser = await User.findOne({ refreshToken }).exec();
	if (!findUser) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || findUser.username !== decoded.username) return res.sendStatus(403);
		const accessToken = jwt.sign({ username: findUser.username, roles: findUser.roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
		return res.json({ roles: findUser.roles, accessToken });
	});
};
