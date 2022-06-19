const whitelist = ['http://localhost:9200', 'http://localhost:9100'];
exports.corsOptions = {
	credentials: true, // This is important.
	origin: (origin, callback) => {
		if (whitelist.includes(origin)) return callback(null, true);

		callback(new Error('Not allowed by CORS'));
	},
};
