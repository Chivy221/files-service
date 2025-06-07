const express = require('express');
const router = express.Router();
const File = require('../models/File');

router.post('/', async (req, res) => {
  try {
    const file = new File(req.body);
    await file.save();
    res.status(201).json(file);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get('/', async (_, res) => {
  const files = await File.find();
  res.json(files);
});

module.exports = router;
