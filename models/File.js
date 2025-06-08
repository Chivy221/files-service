const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
filename: String,
originalName: String,
uploadedAt: { type: Date, default: Date.now },
size: Number
});
module.exports = mongoose.model('File', fileSchema);
