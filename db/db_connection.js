const promise = require('bluebird')
const options = {
  promiseLib: promise
}

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/chat_app';
const db = pgp(connectionString);
db.connect();

module.exports = db
