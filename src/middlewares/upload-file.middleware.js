const multer = require('multer');

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb('Please upload only images.', false);
  }
};

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, //20mb
});

module.exports = {
  upload,
};
