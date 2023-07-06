import { Sequelize } from "sequelize";

const sequelize = new Sequelize("servicesapp", "root", "pdr606", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
