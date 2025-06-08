const request = require('supertest');
const express = require('express');
const routes = require('../routes/files');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use('/files', routes);

describe('Files API', () => {
it('GET /files should return 200', async () => {
const res = await request(app).get('/files');
expect(res.statusCode).toBe(200);
});

it('POST /files should upload file', async () => {
const res = await request(app)
.post('/files')
.attach('file', Buffer.from('test content'), 'test.txt');
expect(res.statusCode).toBe(201);
});
});
