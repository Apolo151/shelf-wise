// src/database.ts
import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import envFilePath from '../config/env-config';
import Book from './Book';
import Borrow from './Borrow';

// Load environment variables from .env file
dotenv.config({ path: envFilePath });

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URI as string, {
  dialect: 'postgres',
  logging: false, // Set to true for logging SQL queries
});

// Initialize the models
const db: any = {};
const basename = path.basename(__filename);

// Read all model files and initialize them
fs.readdirSync(__dirname)

  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Changed to .ts for TypeScript
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach(async (file) => {
    // const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    const model = new (await import(path.join(__dirname, file))).default(sequelize, DataTypes); // Use dynamic import
    db[model.name] = model;
  });

// Call associate method on models if defined
Object.keys(db).forEach((modelName) => {
  console.log(modelName)
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the Sequelize instance to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Connect to the database
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate(); // Use authenticate instead of sync for testing
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

// Close the database connection (after tests)
export const closeDatabaseConnection = async () => {
  try {
    console.log('Database connection closed');
    await sequelize.close();
    
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
};


export { sequelize, db }; // Export db and testConnection
