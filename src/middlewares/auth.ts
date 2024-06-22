import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/custom/user.d'
import { promisify } from 'util';
import User from "../models/userModels";

const jwtVerify: (
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions & { complete?: false },
)=>Promise<jwt.JwtPayload> = promisify(jwt.verify)

export async function auth(req: AppRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "You must login" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "Server configuration error" });
  }
  try {
    const decoded = await jwtVerify(authorization, secret) as {id:string}
    const user = await User.findById(decoded.id)
    req.appUser = user
    next()
  } catch (err) {
    return res.status(401).json({ message: "User can't access this" });
  }

}
