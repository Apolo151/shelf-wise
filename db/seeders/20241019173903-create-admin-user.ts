import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

export const up = async (queryInterface: QueryInterface) => {
  const hashedPassword = await bcrypt.hash('adminpassword', 10); // Hashing password

  return queryInterface.bulkInsert('users', [
    {
      name: 'admin',
      email: 'admin@example.com',
      password: hashedPassword, // Store the hashed password
      role: 'admin', // Setting the role as admin
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async (queryInterface: QueryInterface) => {
  return queryInterface.bulkDelete('users', { email: 'admin@example.com' }, {});
};
