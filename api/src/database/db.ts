import { Sequelize } from "sequelize";

const sequelize = new Sequelize("nftapp", "root", "6076", {
  host: "localhost",
  dialect: "mysql",
});

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
export default sequelize;
