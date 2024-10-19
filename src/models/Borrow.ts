import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';

interface BorrowAttributes {
  id: string;
  borrowDate: Date;
  returnDate?: Date;
  status: string;
  userId: string;
  bookId: string;
}

interface BorrowCreationAttributes extends Optional<BorrowAttributes, 'id'> {}

class Borrow extends Model<BorrowAttributes, BorrowCreationAttributes> implements BorrowAttributes {
  public id!: string;
  public borrowDate!: Date;
  public returnDate?: Date;
  public status!: string;
  public userId!: string;
  public bookId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Borrow.belongsTo(models.User, { foreignKey: 'userId' });
    Borrow.belongsTo(models.Book, { foreignKey: 'bookId' });
  }
}

Borrow.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    returnDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
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
  }
);

export default Borrow;
