const { Model, DataTypes } = require("sequelize");
import sequelize from '../database/db';
const Posts = require('./create-post.ts')
const User = require('./user.ts');

class Comments extends Model {
  public id!: number;
  public commentId!: string;
  public userId!: number;
}

Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
     },
    // userId: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   references :{
    //     model: User,
    //     key: "id"
    //   }
    // },
    // commentId: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   allowNull: false,
    //   references: {
    //     model: Posts,
    //     key: 'id'
    //   }
    // }
   },
  {
    tableName: "comments",
    sequelize,
  }
);



async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");

    await sequelize.sync();
    console.log("Models synchronized with the database");
  } catch (error) {
    console.log("Error:", error);
  }
}

syncDatabase();

module.exports = Comments;