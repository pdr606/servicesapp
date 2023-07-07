import {Request, Response} from 'express'
const User = require('../models/user')
const Post = require('../models/create-post')

class createPost{
    async createPost(req: Request, res: Response){
        try {
            const {description, title, eventDate, location, value, id} = req.body

            const userId = parseInt(id, 10)

            const user = await User.findOne({where: {id: userId}})

            if(!user){
                return res.status(400).json({msg: "This user doenst register in Service"})
            }

            const newPost = await Post.create({
                description,
                title,
                eventDate,
                location,
                value,
                userId: userId 
            })

            return res.status(200).json(newPost)

          
        } catch (error) {
            return res.status(500).json({msg: "Server error to create User"})
        }
    

    }

    async getAllPosts(req: Request, res: Response){

        try{
            const getAllPosts = await Post.findAll()

            return res.status(200).json(getAllPosts)
        }catch(error){
            return res.status(500).json({msg: "Server erro to get all Users"})
        }
        
    }

    async getPostsOfOneUser(req: Request, res: Response){
        const {id} = req.body
        try {
            const getPostsOfOneUser = await Post.findAll({where :{userId: id}})

            return res.status(200).json(getPostsOfOneUser)
            
        } catch (error) {
            return res.status(500).json({msg: "Server erro to get info of user", id})
            
        }
    }

}


module.exports = new createPost()