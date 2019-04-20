const db = require('./dbConfig');

module.exports = {
  insert,
  getAll,
  remove,
};

async function insert(user) {
  const { username, email, department } = user;
  if (!username || !email || !department) return null;
  return db('users').insert({ username, email, department });
}

async function getAll() {
  return db('users');
}

async function remove(id) {
  return db('users')
    .where({ id })
    .del();
}
