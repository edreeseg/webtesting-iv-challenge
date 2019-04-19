const express = require('express');
const server = express();
const db = require('../data/helpers');

server.use(express.json());

server.get('/users', async (req, res) => {
  try {
    const users = await db.getAll();
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

server.post('/users', async (req, res) => {
  try {
    const { username, email, department } = req.body;
    if (!username || !email || !department)
      return res.status(400).json({
        error:
          'Request must include values for username, email, and department keys.',
      });
    const [id] = await db.insert({ username, email, department });
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.remove(id);
    if (deleted === 0)
      return res.status(404).json({ error: 'No user with that ID found.' });
    else res.json({ deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = server;
