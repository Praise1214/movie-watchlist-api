import type { Response, Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import {prisma} from "../config/db";

//Read the token from the endpoint
//check if the token is valid
export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth Middleware Reached")
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  else if(req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if(!token) {
    return res.status(401).json({error: "Not authorized, no token provides"})
  }
  try{
    //Verify token and extract the user id
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ error: "JWT_SECRET is not set" });
    }
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    const user = await prisma.user.findUnique ({
      where: {id : decoded.id}
    })

    if(!user) {
      return res.status(401).json({error: "User no longer exists"})
    }
    req.user = user;
    next()
  }

  
  catch (err) {
    return res.status(401).json({error: "Not authorized, token failed"})
  }
}