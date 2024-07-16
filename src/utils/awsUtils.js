// src/utils/awsUtils.js

const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadImageToS3 = async (file) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}_${file.originalname}`, // Unique file name
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    const parallelUploads3 = new Upload({
        client: s3Client,
        params: params,
    });

    try {
        const data = await parallelUploads3.done();
        return data;
    } catch (err) {
        throw new Error(`Error uploading file: ${err.message}`);
    }
};

module.exports = {
    uploadImageToS3,
};
