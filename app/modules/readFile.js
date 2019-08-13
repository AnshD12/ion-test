const appRoot = require('app-root-path');

// configs and utils
const logger = require(`${appRoot}/config/winston`);
const pHandler = require(`${appRoot}/utils/PromiseHandler`);
// models
const fileModel = require('../models/file');

exports.readFile = async (req, res) => {
  if (req.file) {
    const { filename, path, mimetype } = req.file;
    if (mimetype !== 'application/json') {
      return res.status(400).json({ success: false, msg: 'invalid file type' });
    }
    const [insertError, insertResponse] = await pHandler(fileModel.create(
      {
        filename,
        path,
      },
    ));
    if (insertError) {
      if (insertError.code === 11000) {
        return res.status(400).json({ success: false, msg: 'file already exist' });
      }
      logger.error(insertError);
      return res.status(400).json({ success: false, msg: insertError });
    }
    logger.debug(insertResponse);
    return res.status(200).json({ success: false, result: insertResponse });
  }

  return res.status(400).json({ success: false, msg: 'All fields are required' });
};
