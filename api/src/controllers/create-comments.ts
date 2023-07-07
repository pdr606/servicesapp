import {Request, Response} from 'express'
const Comments = require('../models/create-comments')


class CreateComments{
    async createComment(req: Request, res: Response){
        const {idOfPost, comment} = req.body

        try{

            if(!comment){
                return res.status(400).json({msg: "Please, send a comment"})
            }

            const newComment = await Comments.create({
                comment,
                commentId: idOfPost
            })

            return res.status(200).json(newComment)

        }catch(error){
            return res.status(500).json({msg: "Server error in create comment"})
        }

    }
}