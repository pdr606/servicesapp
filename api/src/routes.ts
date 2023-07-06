import express from "express";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})

const routes = express.Router();

const UserController = require("./controllers/gerency-user");

routes.post("/registro", upload.single('file'), UserController.createUser);
routes.get("/logar", UserController.userLogin);
routes.get('/logout', UserController.userLogout)
routes.post('/editar-perfil', UserController.editUser)

module.exports = routes;
