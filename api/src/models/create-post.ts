const { Model, DataTypes } = require("sequelize");
import sequelize from '../database/db'
const User = require('./user.ts')

class Post extends Model {
    public id!: number;
    public description!: string;
    public title!: string;
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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
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
  }
);

Post.hasMany(User,{
  onDelete: 'CASCADE'
})
User.belongsTo(Post)

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");

    // await sequelize.sync();
    //  console.log("Models synchronized with the database");
  } catch (error) {
    console.log("Error:", error);
  }
}

syncDatabase();


module.exports = Post;

