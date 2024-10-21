import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface BookAttributes {
  id: number;
  title: string;
  author: string;
  genre?: string;
  availableCopies: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
  public genre?: string;
  public availableCopies!: number;

  public readonly createdAt!: Date;

  static associate(models: any) {
    Book.hasMany(models.Borrow, { foreignKey: 'bookId', as: 'borrows' });
  }
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    availableCopies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

export default Book;
