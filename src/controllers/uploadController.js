const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
dotenv.config();

const { File } = db;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class uploadController {

  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {
    // Check if file was sent 
    if (!req.file)
      return res.send('Please upload a file');

    try {
      const file_target = req.file;
      //Upload file to S3
      // Setting up S3 upload parameters
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file_target.originalname, // File name to be saved on s3
        Body: file_target.buffer
      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }

        //Insert file name and link in DB


        // Return success msg
        return res.status(200).json({
          Success: true,
          Location: data.Location
        })
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

    //Code to get all files from DB and return them
    
  }
}

module.exports = uploadController;