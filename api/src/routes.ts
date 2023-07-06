import express from "express";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})

const routes = express.Router();

const UserController = require("./controllers/gerency-user");
const CreatePost = require('./controllers/create-posts')

routes.post("/registro", upload.single('file'), UserController.createUser);
routes.get("/logar", UserController.userLogin);
routes.get('/logout', UserController.userLogout)
routes.post('/editar-perfil', UserController.editUser)

routes.post('/criar-postagem', CreatePost.createPost)

module.exports = routes;
