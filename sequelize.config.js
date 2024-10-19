require('ts-node').register(); // This allows running TypeScript with Sequelize CLI

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
