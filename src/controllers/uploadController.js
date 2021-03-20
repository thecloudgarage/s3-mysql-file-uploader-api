const db = require('../database/models');
const dotenv = require('dotenv');
// TODO: How to avoide file calls with ../
// const httpStatusCodes = require('../constants/httpStatusCodes');
const s3Controller = require('../utils/s3Controller')
dotenv.config();

const { File } = db;

class filesController {

  //method to upload file & insert in the DB
  static async uploadMyFile(req, res) {
    // Check if file was included in the request  
    if (!req.file)
      return res.send('Please upload a file');

    try {
      const targetFile = req.file;

      // upload file to s3 
      const s3Data = await s3Controller.uploadFile(process.env.AWS_BUCKET_NAME, targetFile);

      // save file in db
      const dbData = await File.createFile(s3Data.Key, s3Data.Location);

      // Return success respond with uploaded file info  
      return res.status(200).json({
        Success: true,
        s3: s3Data,
        db: dbData
      })

    } catch (err) {
      console.log('ERROR', err);
      return res.status(500).json({
        Success: false,
        Error: err.message
      });
    }
  }

  //method to return files from DB
  static async getFiles(req, res) {
    try {
      // Get all files from DB 
      const files = await File.getAll();

      // Return files response  
      return res.status(200).json({
        Success: true,
        files: files
      })
    } catch (err) {
      console.log('ERROR', err);
      return res.status(500).json({
        Success: false,
        Error: err.message
      });
    }

  }
}

module.exports = filesController;

// Is there away to rollback s3 trasaction in case of any error that comes later?