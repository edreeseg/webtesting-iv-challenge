const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe('GET /users', () => {
  it('Should return response code 200 OK', async () => {
    try {
      const response = await request(server).get('/users');
      expect(response.status).toBe(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return data of type application/json', async () => {
    try {
      const response = await request(server).get('/users');
      expect(response.type).toBe('application/json');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should repond with an array', async () => {
    try {
      const response = await request(server).get('/users');
      expect(Array.isArray(response.body.users)).toBe(true);
    } catch (error) {
      throw new Error(error);
    }
  });
});

describe('POST /users', () => {
  afterEach(async () => {
    await db('users').truncate();
  });
  const testUser = {
    username: 'edreeseg',
    email: 'edward@reeseg.com',
    department: 'CS',
  };
  it('Should return status 201 CREATED', async () => {
    try {
      const response = await request(server)
        .post('/users')
        .send(testUser);
      expect(response.status).toBe(201);
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return data of type application/json', async () => {
    try {
      const response = await request(server)
        .post('/users')
        .send(testUser);
      expect(response.type).toBe('application/json');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return an id number', async () => {
    try {
      const response = await request(server)
        .post('/users')
        .send(testUser);
      expect(typeof response.body.id).toBe('number');
    } catch (error) {
      throw new Error(error);
    }
  });
});

describe('DELETE /users/:id', () => {
  beforeEach(async () => {
    await db('users').insert({
      username: 'Dead Man Walking',
      email: 'test@test.com',
      department: 'Test Dept',
    });
  });
  afterEach(async () => {
    await db('users').truncate();
  });
  it('Should return response code 200 OK', async () => {
    try {
      const response = await request(server).delete('/users/1');
      expect(response.status).toBe(200);
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return response code 404 NOT FOUND when targeting nonexistent user', async () => {
    try {
      const response = await request(server).delete('/users/999');
      expect(response.status).toBe(404);
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return data of type application/json', async () => {
    try {
      const response = await request(server).delete('/users/1');
      expect(response.type).toBe('application/json');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return number of entries deleted', async () => {
    try {
      const response = await request(server).delete('/users/1');
      expect(typeof response.body.deleted).toBe('number');
      expect(response.body).toEqual({ deleted: 1 });
    } catch (error) {
      throw new Error(error);
    }
  });
});
