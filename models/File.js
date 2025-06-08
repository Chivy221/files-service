const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // shard key!
  filename: String,
  originalName: String,
  uploadedAt: { type: Date, default: Date.now },
  size: Number
});
