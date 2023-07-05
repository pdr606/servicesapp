import { Sequelize } from "sequelize";

const sequelize = new Sequelize("servicesapp", "root", "6076", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
