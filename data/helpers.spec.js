const request = require('supertest');
const db = require('../data/dbConfig');
const helpers = require('./helpers');

describe('getAll', () => {
  it('Should return an array', async () => {
    try {
      const users = await helpers.getAll();
      expect(Array.isArray(users)).toBe(true);
    } catch (error) {
      throw new Error(error);
    }
  });
});

describe('insert', () => {
  afterEach(async () => {
    await db('users').truncate();
  });
  const testUser = {
    username: 'edreeseg',
    email: 'edward@reeseg.com',
    department: 'CS',
  };
  it('Should return an ID number', async () => {
    try {
      const [id] = await helpers.insert(testUser);
      expect(typeof id).toBe('number');
    } catch (error) {
      throw new Error(error);
    }
  });
  it('Should return null if malformed user object is sent', async () => {
    try {
      const response = await helpers.insert({ test: 'test' });
      expect(response).toBe(null);
    } catch (error) {
      throw new Error(error);
    }
  });
});

describe('remove', () => {
  beforeEach(async () => {
    await db('users').insert({
      username: 'Test',
      email: 'test@test.com',
      department: 'Test Dept',
    });
  });
  afterEach(async () => {
    await db('users').truncate();
  });
  it('Should return number of users deleted', async () => {
    try {
      const deleted = await helpers.remove(1);
      expect(deleted).toBe(1);
      const notDeleted = await helpers.remove(999);
      expect(notDeleted).toBe(0);
    } catch (error) {
      throw new Error(error);
    }
  });
});
