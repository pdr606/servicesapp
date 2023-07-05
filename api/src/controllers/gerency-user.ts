import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = require("../models/user");

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password, cpf, cep, telephone, formation, tags } =
        req.body;

      const userExist = await User.findOne({ where: { email: email } });

      if (userExist) {
        return res.status(422).json({ msg: "This email are register" });
      }

      const saltRounds: number = 12;
      const salt: string = await bcrypt.genSalt(saltRounds);
      const passwordHash: string = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: passwordHash,
        cpf,
        cep,
        telephone,
        formation,
        tags,
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
}

module.exports = new UserController();
