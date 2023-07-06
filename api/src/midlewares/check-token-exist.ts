import { NextFunction, Request, Response } from "express";
const Tokens = require('../models/insert-token')

const checkTokenExiste = async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];

    const tokenIsValid = await Tokens.findOne({where: {token:token}})

    if(tokenIsValid){
        return res.status(200).json({msg: "Token invalid"})
    }

    next()
  
};
