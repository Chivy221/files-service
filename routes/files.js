const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const cache = require('../utils/cache');
const { encrypt, decrypt } = require('../utils/crypto');
const { sendLog } = require('../utils/logger');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
try {
const encryptedName = encrypt(req.file.originalname);
const file = new File({
filename: req.file.filename || 'memory',
originalName: encryptedName,
size: req.file.size
});
await file.save();
cache.set(`file:${file._id}`, file);
sendLog(`New file uploaded: ${req.file.originalname}`);
res.status(201).json({ id: file._id });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Upload failed' });
}
});

router.get('/', async (_, res) => {
try {
const cached = cache.get('fileList');
if (cached) return res.json(cached);
  const files = await File.find();
const decrypted = files.map(f => ({
  ...f.toObject(),
  originalName: decrypt(f.originalName)
}));
cache.set('fileList', decrypted);
res.json(decrypted);
} catch (e) {
res.status(500).json({ error: 'Could not get files' });
}
});

module.exports = router;
