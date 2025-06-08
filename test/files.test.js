const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const express = require('express');
const fileRoutes = require('../routes/files');

let mongod, app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);

  app = express();
  app.use(express.json());
  app.use('/files', fileRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

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
