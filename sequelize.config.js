require('ts-node').register(); // This allows running TypeScript with Sequelize CLI

const dotenv = require('dotenv');

// Load environment-specific .env file
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config(); // default to .env or another env file based on NODE_ENV
}

module.exports = {
  "development": {
    "dialect": "postgres",
    "url": process.env.DATABASE_URI,
    "migrationStorage": "json",
    "migrationStoragePath": "sequelizeMeta.json",
    "seederStorage": "json",
    "seederStoragePath": "sequelizeSeeders.json",
  },
  "test": {
    "dialect": "postgres",
    "url": process.env.DATABASE_URI,
  },
  "production": {
    "dialect": "postgres",
    "url": process.env.DATABASE_URI,
  }
};
