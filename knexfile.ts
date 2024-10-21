import type { Knex } from 'knex';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();
console.log(process.env.DATABASE_URL);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    pool: {
      min: 2,
      max: 10,
    },
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './db/seeds',
    },
    debug: false,
  },
  test: {
    client: 'pg',
    pool: {
      min: 2,
      max: 10,
    },
    connection: process.env.TEST_DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './db/seeds',
    },
    debug: false,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
      extension: 'js',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};

module.exports = config;

export default config;