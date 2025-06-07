const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const filesRoutes = require('./routes/files');
app.use(express.json());
app.use('/files', filesRoutes);
app.get('/ping', (_, res) => res.send('pong'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('File DB connected');
  app.listen(3000, () => console.log('File service on port 3000'));
}).catch(err => console.error(err));
