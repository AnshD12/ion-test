const readings = require('./routes/readings');
const files = require('./routes/files');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.json({ working: true });
  });
  readings(app);
  files(app);
};
