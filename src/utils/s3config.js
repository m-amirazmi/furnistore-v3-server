const AWS = require('aws-sdk');

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS,
	secretAccessKey: process.env.AWS_SECRET,
});

exports.uploadFile = async (file, uploadedFile) => {
	const params = {
		Bucket: process.env.AWS_BUCKET,
		Key: `fileupload/images-${Date.now()}-${file.name}`,
		Body: uploadedFile,
		ACL: 'public-read',
	};
	const data = await s3.upload(params).promise();
	return data.Location;
};
