const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileRoutes = require('./routes/files');
const { sendLog } = require('./utils/logger');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/files', fileRoutes);

app.get('/health', (, res) => res.json({ status: 'ok' }));
app.get('/metrics', (, res) => res.send('files_service_total_requests 42'));

mongoose.connect(process.env.MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
}).then(() => {
app.listen(process.env.PORT, () => {
console.log(Files service running on port ${process.env.PORT});
sendLog('Files service started');
});
}).catch(console.error);
