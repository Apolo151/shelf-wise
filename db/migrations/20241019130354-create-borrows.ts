import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('borrows', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Name of the users table
        key: 'id',
      },
      onUpdate: 'CASCADE', // When user id updates, cascade to borrows
      onDelete: 'CASCADE', // When user is deleted, cascade to borrows
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books', // Name of the books table
        key: 'id',
      },
      onUpdate: 'CASCADE', // When book id updates, cascade to borrows
      onDelete: 'CASCADE', // When book is deleted, cascade to borrows
    },
    borrowedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Default to current timestamp
    },
    returnedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Can be null if the book has not been returned
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });
};

export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('borrows');
};