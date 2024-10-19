require('ts-node').register(); // This allows running TypeScript with Sequelize CLI
require('dotenv').config(); // This allows reading environment variables from .env file

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
