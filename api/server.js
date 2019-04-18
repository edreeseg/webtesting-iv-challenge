const express = require('express');
const server = express();
const db = require('../data/helpers');

server.use(express.json());

server.get('/', async (req, res) => {
    res.status(200).json({ api: 'up'});
})

server.post('/', (req, res) => {
    const { username, email, department } = req.body;
    if (!username || !email || !department) 
        return res.status(400).json({ error: 'Request must include values for username, email, and department keys.'});
    db.insert({ username, email, department })
        .then(id => {
            console.log(id);
            res.status(201).json({id});
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
})

module.exports = server;