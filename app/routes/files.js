const { getFiles } = require('../modules/getFiles');

module.exports = (app) => {
  app.get('/getFiles', getFiles);
};
