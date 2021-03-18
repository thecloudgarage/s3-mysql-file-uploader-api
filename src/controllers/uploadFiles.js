const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
dotenv.config();

const { File } = db;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class uploadFiles {

  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {
    // Check if file was included in the request  
    if (!req.file)
      return res.send('Please upload a file');

    try {
      const targetFile = req.file;
      //Upload file to S3
      // Setting up S3 upload parameters
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: targetFile.originalname, // File name to be saved on s3
        Body: targetFile.buffer
      };

      // Uploading files to the bucket
      s3.upload(params, async function (err, data) {
        if (err) {
          throw err;
        }

        if (data) {
          //Insert file name and link in DB
          const newFile = await File.create({
            fileName: data.Key,
            fileLink: data.Location
          });

          // Return stored file info 
          return res.status(200).json({
            Success: true,
            s3: data,
            db: newFile
          })
        }
      });
    } catch (err) {
      console.log('ERROR', err);
      return res.status(500).json({
        Success: false,
        Error: err.message
      });
    }
  }

  //method to return files in the DB
  static async getFiles(req, res) {

    // Get all files from DB 
    const files = await File.findAll();

    // Return files
    // Return success msg
    return res.status(200).json({
      Success: true,
      files: files
    })
    
  }
}

module.exports = uploadFiles;