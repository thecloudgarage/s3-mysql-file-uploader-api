const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
var multer = require('multer');
dotenv.config();
const filesController = require('../controllers/filesController');


var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

// var multipleUpload = multer({ storage: storage }).array('file');
var singleUpload = multer({ storage: storage }).single('myFile');

router.get('/', (_, res) => res.send('Welcome to S3 File Uploader'));
router.post('/upload', singleUpload, filesController.uploadMyFile);
router.get('/files/', filesController.getFiles);



module.exports = router;