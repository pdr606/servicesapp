import { Request, Response } from "express";
const Comments = require("../models/create-comments");
const User = require('../models/user')

class CreateComments {
  async createComment(req: Request, res: Response) {
    const { idOfPost, idOfUser, comment } = req.body;

    try {
      if (!comment) {
        return res.status(400).json({ msg: "Please, send a comment" });
      }

      const newComment = await Comments.create({
        comment,
        commentId: idOfPost,
        userId: idOfUser,
      });

      return res.status(200).json(newComment);
    } catch (error) {
      return res.status(500).json({ msg: "Server error in create comment" });
    }
  }

  async deleteComment(req: Request, res:Response){
    const {idOfComment} = req.body

    try{

      const searchCommentWithThisId = await Comments.findOne({where: {id: idOfComment}})

      await searchCommentWithThisId.destroy()

      return res.status(200).json({msg: "Comment deleted with success"})
    }catch(error){
      return res.status(500).json({msg: "Server erro to deleted this comment" + error})
    }
  }

  async getCommentOfUnicPost(req: Request, res: Response) {

    const {postId} = req.body
    try {
      const getAllPosts = await Comments.findAll({
        where: {commentId: postId},
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
      return res.status(500).json({ msg: "Server erro to get all comments" + error });
    }
  }
}

module.exports = new CreateComments();
