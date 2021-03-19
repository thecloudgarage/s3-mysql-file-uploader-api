const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

async function uploadFile(targetFile) {
    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: targetFile.originalname, // File name to be saved on s3
        Body: targetFile.buffer
    };

    // Upload file to the bucket
    try {
        const uploadData = await s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
        }).promise()
        return uploadData;
    } catch (err) {
        return err;
    }
};

module.exports = uploadFile;

// TODO: what if building an s3 handler class, should I use it as a controller?


