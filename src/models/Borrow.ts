import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './database';

interface BorrowAttributes {
  id: string;
  borrowDate: Date;
  returnDate?: Date;
  userId: string;
  bookId: string;
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, 'id'> {}

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
  public id!: string;
  public borrowDate!: Date;
  public returnDate?: Date;
  public userId!: string;
  public bookId!: string;

  public readonly createdAt!: Date;

  static associate(models: any) {
    Borrow.belongsTo(models.User, { foreignKey: 'userId' });
    Borrow.belongsTo(models.Book, { foreignKey: 'bookId' });
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
      type: DataTypes.UUID,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.UUID,
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
