const db = require('../database/models');
const dotenv = require('dotenv');
// TODO: How to avoide file calls with ../
// const httpStatusCodes = require('../constants/httpStatusCodes');
const s3UploadFile = require('../utils/s3UploadFile')
dotenv.config();

const { File } = db;

class uploadController {

  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {
    // Check if file was included in the request  
    if (!req.file)
      return res.send('Please upload a file');

    try {
      const targetFile = req.file;

      // upload file to s3
      const s3Data = await s3UploadFile(targetFile);
      
      // save file in db
      const newFile = await File.create({
        fileName: s3Data.Key,
        fileLink: s3Data.Location
      });

      // Return success respond with uploaded file info  
      return res.status(200).json({
        Success: true,
        s3: s3Data,
        db: newFile
      })

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

module.exports = uploadController;

// Is there away to rollback s3 trasaction in case of any error that comes later?