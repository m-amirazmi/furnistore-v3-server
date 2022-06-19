const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) return res.status(401).json({ message: 'You are not authenticated!' });

	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return res.sendStatus(403);

		req.user = decoded;
		next();
	});
};
