const appRoot = require('app-root-path');

// configs and utils
const logger = require(`${appRoot}/config/winston`);
const pHandler = require(`${appRoot}/utils/PromiseHandler`);
// models
const fileModel = require('../models/file');

exports.getFiles = async (req, res) => {
  const [findError, findResponse] = await pHandler(fileModel.find());
  if (findError) {
    logger.error(findError);
    return res.status(400).json({ success: false, msg: findError });
  }
  logger.debug(findResponse);
  return res.status(200).json({ success: false, result: findResponse });
};
