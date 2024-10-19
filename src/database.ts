import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URI as string, {
  dialect: 'postgres',
  logging: false, // Set to true for logging SQL queries
});

// Test the database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Export the Sequelize instance and the test function
export { sequelize, testConnection };