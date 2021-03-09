import Knex from 'knex';

const knexConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const connection = Knex(connectionConfig);

export { connection };
