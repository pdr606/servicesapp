import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/db';

class UnToken extends Model {
  public id!: number;
  public token!: string;
}

UnToken.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'invalid-tokens', 
  }
);

export default UnToken;