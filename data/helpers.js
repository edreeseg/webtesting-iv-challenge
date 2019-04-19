const db = require('./dbConfig');

module.exports = {
  insert,
  getAll,
  remove,
};

async function insert(user) {
  return db('users').insert(user);
}

async function getAll() {
  return db('users');
}

async function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
