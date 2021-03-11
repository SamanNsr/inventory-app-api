import { Model } from 'objection';
import Knex from 'knex';

const knexConfig = require('../../knexfile');
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = knexConfig[environment];

const connection = Knex(connectionConfig);

Model.knex(connection);

export { connection as db };
