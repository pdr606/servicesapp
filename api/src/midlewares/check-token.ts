import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Do you need a token" });
  }

  try {
    const secret: string = process.env.SECRET || "";

    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Invalid token", error });
  }
};
