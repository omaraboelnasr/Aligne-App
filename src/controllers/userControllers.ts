import { NextFunction, Request, Response } from 'express'
import User from '../models/userModels'


const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({},{username:1})
    res.status(201).json({
        data: users,
    })
}

export {getAllUsers};
