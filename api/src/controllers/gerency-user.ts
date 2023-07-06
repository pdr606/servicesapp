import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Tokens = require('../models/insert-token')
const User = require("../models/user");

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, secondeName, email, password, cpf, cep, telephone, formation, tags, description } =
        req.body;

      const file = req.file

      const userExist = await User.findOne({ where: { email: email } });

      if (userExist) {
        return res.status(422).json({ msg: "This email are register" });
      }

      const saltRounds: number = 12;
      const salt: string = await bcrypt.genSalt(saltRounds);
      const passwordHash: string = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        secondeName,
        email,
        src: file?.path,
        password: passwordHash,
        cpf,
        cep,
        telephone,
        formation,
        tags,
        description
      });

      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json("Esse foi o erro" + error);
    }
  }

  async userLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(402)
        .json({ msg: "Complete your email and your password" });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(200)
        .json({ msg: "You dont have register in ServicesApp" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Invalid password" });
    }

    try {
      const secret: string = process.env.SECRET || "";

      const token = jwt.sign(
        {
          id: user._id,
          nome: user.name,
          cep: user.cep,
          telephone: user.telephone,
          formation: user.formation,
          tags: user.tag,
        },
        secret
      );

      res.status(200).json({ msg: "Welcome to ServiceApp", token });
    } catch (err) {
      res.status(500).json({ msg: "Server error" + err });
    }
  }

  async userLogout(req: Request, res: Response){
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    const tokenExister = await Tokens.findOne({where :{token : token}})

    if(!tokenExister){
      await Tokens.create({
        token
      })

      return res.status(200).json({msg: "Token save"})
    }
    
  }

  async editUser(req: Request, res: Response){
    const {id, description, cep, telephone} = req.body
    const file = req.file

    try {
      const user = await User.findOne({where: {id: id}})

      if(!user){
        return res.status(400).json({msg: "This user dont exist"})
      }

      if(file){
        user.src = file?.path 
      }
      user.description = description
      user.cep = cep
      user.telephone = telephone

      await user.save()

      return res.status(200).json({msg: "Edit with success"})
      
    } catch (error) {
      return res.status(500).json({msg: "Server error in edit profile", error})
    }
  }

    async deleteUser(req: Request, res:Response){
      const {id} = req.body

      try{
        const user = await User.findOne({where: {id: id}})

        if(!user){
          return res.status(400).json({msg: "This user doesnt exist"})
        }

        await user.destroy()
        
        return res.status(200).json({msg: "User deleted successfully"})
        
      } catch(error){
        return res.status(500).json({msg: "Server error in deleting user", error})
      }
    }

}

module.exports = new UserController();
