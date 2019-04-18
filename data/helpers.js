const knex = require('knex');
const knexConfig = require('../knexfile');
const dbEnv = process.env.DB_ENV || 'development';
const db = knex(knexConfig[dbEnv]);

module.exports = {
    insert,
};

async function insert(user){
    const [id] = await db('users')
        .insert(user);
    return db('users').where({ id }).first();
}