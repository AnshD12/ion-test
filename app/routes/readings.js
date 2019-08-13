const multer = require('multer');

const { readFile } = require('../modules/readFile');

const storage = multer.diskStorage({
  destination: 'app/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage,
});
const type = upload.single('file');

module.exports = (app) => {
  app.post('/readFile', type, readFile);
};
