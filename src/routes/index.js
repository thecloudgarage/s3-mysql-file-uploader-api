const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
var multer = require('multer');
dotenv.config();
const uploadController = require('../controllers/uploadController');


var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});
// var multipleUpload = multer({ storage: storage }).array('file');
var singleUpload = multer({ storage: storage }).single('myFile');

router.get('/', (_, res) => res.send('Welcome to S3 File Uploader'));
router.post('/upload', singleUpload, uploadController.uploadMyFile);
router.get('/files/', uploadController.getFiles);


module.exports = router;