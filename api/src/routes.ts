import express from "express";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const routes = express.Router();

const UserController = require("./controllers/gerency-user");
const CreatePost = require("./controllers/create-posts");
const CommentController = require("./controllers/create-comments");

routes.post("/registro", upload.single("file"), UserController.createUser);
routes.get("/logar", UserController.userLogin);
routes.get("/logout", UserController.userLogout);
routes.post("/editar-perfil", UserController.editUser);
routes.post("/deletar-usuario", UserController.deleteUser);

routes.post("/criar-postagem", CreatePost.createPost);
routes.get("/buscar-postagens", CreatePost.getAllPosts);
routes.get("/buscar-postanges-usuario-unico", CreatePost.getPostsOfOneUser);
routes.delete("/deletar-post", CreatePost.deletePost);

routes.post("/criar-comentario", CommentController.createComment);

module.exports = routes;
