const multer = require('multer');
const path = require('path');

const imgpath = "/uploads/profile";

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', imgpath));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storagedata }).single('img'); 

module.exports = upload;

