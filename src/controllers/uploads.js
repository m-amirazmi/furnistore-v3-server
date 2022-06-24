const fs = require('fs');
const { uploadFile } = require('../utils/s3config');

exports.uploadSmallImage = async (req, res) => {
	// Make sure the size under 512kb
	const { image } = req.files;
	const size512kb = 512000;
	if (image.size > size512kb) return res.status(400).json({ message: `The image size too big. Makesure the image size below ${size512kb / 1000}kb` });

	fs.readFile(image.tempFilePath, async (err, uploadedFile) => {
		if (err) throw err;
		const data = await uploadFile(image, uploadedFile);
		return res.status(201).json(data);
	});
};
