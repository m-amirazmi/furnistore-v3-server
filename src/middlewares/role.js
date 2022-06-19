const User = require('../models/user');

exports.checkRoles = async (req, roles = ['Customer']) => {
	const { roles: userRoles } = await User.findOne({ _id: req.user.id });

	if (userRoles.length === 0) return { status: false, message: 'Unauthorized!' };
	const findRole = userRoles.find((role) => roles.includes(role));

	if (!findRole) return { status: false, message: 'Unauthorized!' };
	return { status: true };
};
