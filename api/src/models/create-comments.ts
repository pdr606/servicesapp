const { Model, DataTypes } = require("sequelize");
import sequelize from "../database/db";
const Posts = require("./create-post.ts");
const User = require("./user.ts");

class Comments extends Model {
  public id!: number;
  public commentId!: string;
  // public userId!: number;
}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // userId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: "id",
    //   },
    // },
    // commentId: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: false,
    //   references: {
    //     model: Posts,
    //     key: "id",
    //   },
    // },
  },
  {
    tableName: "comments",
    sequelize,
  }
);

Posts.hasMany(Comments, { onDelete: "CASCADE", foreignKey: "commentId" });
Comments.belongsTo(Posts, { foreignKey: "commentId" });

User.hasMany(Comments, { onDelete: "CASCADE", foreignKey: "userId" });
Comments.belongsTo(User, {as: 'users', foreignKey: "userId" });

module.exports = Comments;
