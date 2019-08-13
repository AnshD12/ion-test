const mongoose = require('mongoose');

const fSchema = new mongoose.Schema(
  {
    filename: { type: String, unique: true },
    path: { type: String },
    createAt: { type: Date, default: Date.now },
  },
  {
    collection: 'files',
  },
);

module.exports = mongoose.model('file', fSchema);
