const multer = require('multer'); //install

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg' )
    // (file.mimetype == 'application/pdf') for pdf files
    {
        cb(null, true)

    }
    else {
        cb(null, false)
    }

}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
module.exports = upload;