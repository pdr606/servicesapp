import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db";

class User extends Model {
  public id!: number;
  public name!: string;
  public seconName!: string;
  public email!: string;
  public src!: string;
  public password!: string;
  public cpf!: string;
  public cep!: string;
  public telephone!: string;
  public formation!: string;
  public tags!: string[];
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
    secondeName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    src: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    cpf: {
      type: new DataTypes.STRING(14),
      allowNull: false,
    },
    cep: {
      type: new DataTypes.STRING(9),
      allowNull: false,
    },
    telephone: {
      type: new DataTypes.STRING(15),
      allowNull: false,
    },
    formation: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    description: {
      type: new DataTypes.STRING(300),
      allowNull: false
    }
  },
  {
    tableName: "users",
    sequelize,
  }
);

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connect with data base");

    // await sequelize.sync({ force: true });
    //  console.log("Models sync with data base");
  } catch (error) {
    console.log("Error:", error);
  }
}

syncDatabase();

module.exports = User;
