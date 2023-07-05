import express from "express";

const routes = express.Router();

const UserController = require("./controllers/gerency-user");

routes.post("/registro", UserController.createUser);
routes.get("/logar", UserController.userLogin);

module.exports = routes;
