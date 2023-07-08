const { Model, DataTypes } = require("sequelize");
import sequelize from "../database/db";
const User = require("./user.ts");

class Post extends Model {
  public id!: number;
  public description!: string;
  public title!: string;
  public userCreatePostId!: number;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userCreatePostId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    tableName: "posts",
    sequelize,
  }
);

User.hasMany(Post, {
  onDelete: "CASCADE",
  foreignKey: "userCreatePostId",
});
Post.belongsTo(User, {
  foreignKey: "userCreatePostId",
});

module.exports = Post;
