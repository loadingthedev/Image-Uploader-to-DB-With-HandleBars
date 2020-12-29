const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    let name = file.originalname.split('.');
    cb(null, name[0] + '-' + Date.now() + '.' + name[1]);
  },
});

module.exports = multer({ storage: storage });
