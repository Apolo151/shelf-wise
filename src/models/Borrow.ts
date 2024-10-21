import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface BorrowAttributes {
  id: number;
  borrowDate: Date;
  returnDate?: Date;
  userId: number;
  bookId: number;
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, 'id'> {}

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
  public id!: number;
  public borrowDate!: Date;
  public returnDate?: Date;
  public userId!: number;
  public bookId!: number;

  public readonly createdAt!: Date;

  static associate(models: any) {
    Borrow.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Borrow.belongsTo(models.Book, { foreignKey: 'bookId', as: 'book' });
  }
}

Borrow.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Borrow',
    tableName: 'borrows',
  }
);

export default Borrow;
