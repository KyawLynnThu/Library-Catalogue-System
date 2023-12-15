const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const deleteFile = async (key) => {
  try {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    const deleteResponse = await s3Client.send(deleteObjectCommand);
    return deleteResponse;
  } catch (err) {
    console.error(`Error deleting file ${key}:`, err);
    throw err;
  }
};

module.exports = deleteFile;
