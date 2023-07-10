import { Request, Response } from "express";
const User = require("../models/user");
const Post = require("../models/create-post");
const Comment = require('../models/create-comments')

class createPost {
  async createPost(req: Request, res: Response) {
    try {
      const { description, title, id } = req.body;

      const user = await User.findOne({ where: { id: id } });

      if (!user) {
        return res
          .status(400)
          .json({ msg: "This user doenst register in Service" });
      }

      const newPost = await Post.create({
        description,
        title,
        userCreatePostId: id,
      });

      return res.status(200).json(newPost);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server error to create User", error });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    try {
      const getAllPosts = await Post.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['name']
          }
        ],
        attributes: { exclude: ['userCreatePostId'] }
      });

      return res.status(200).json(getAllPosts);
    } catch (error) {
      return res.status(500).json({ msg: "Server erro to get all Users" + error });
    }
  }

  async getPostsOfOneUser(req: Request, res: Response) {
    const { id } = req.body;
    try {
      const getPostsOfOneUser = await Post.findAll({
        where: { userCreatePostId: id },
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['name']
          }
        ]
      });

      return res.status(200).json(getPostsOfOneUser);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Server erro to get info of user" + error });
    }
  }

  async deletePost(req: Request, res: Response) {
    const { idOfPost } = req.body;
    try {
      const searchPostById = await Post.findOne({ where: { id: idOfPost } });

      await searchPostById.destroy();

      return res.status(200).json({ msg: "Post has deleted with success" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Error server in delete post", error });
    }
  }
}

module.exports = new createPost();
