const { Model, DataTypes } = require("sequelize");
import sequelize from '../database/db'
const User = require("../database/db");

class Post extends Model {
    public id!: number;
    public description!: string;
    public title!: string;
    public eventDate!: string;
    public location!: string;
    public value!: number;
    public userId!: number;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    tableName: "posts",
    sequelize,
    modelName: 'Post'
  }
);

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");

     await sequelize.sync({ force: true });
     console.log("Models synchronized with the database");
  } catch (error) {
    console.log("Error:", error);
  }
}

syncDatabase();

module.exports = Post;

