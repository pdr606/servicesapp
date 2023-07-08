import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";

class User extends Model {
  public id!: number;
  public nick!: string;
  public value!: number;
  public name!: string;
  public email!: string;
  // public src?: string;
  public password!: string;
  public description!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    value: {
      type: new DataTypes.INTEGER(),
      defaultValue: 1000,
    },
    nick: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    // src: {
    //   type: new DataTypes.STRING(128),
    //   allowNull: false,
    // },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(300),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

module.exports = User;
