import { Request, Response, NextFunction } from 'express';
import _ from 'lodash'
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';
import { NotFoundError, NotAuthorized } from '../utils/customErrors';

export function validateProjectOwnerShip(idPath:string,entity:string,action:string){
    return async(req:AppRequest,res:Response,next:NextFunction)=>{
        const id = _.get(req,idPath)
        const projectOwnerId = req.appUser?._id
    const proj = await Project.findOne({_id: id})
    if (!proj) {
        throw new NotFoundError(entity, id)
    }
    if (proj?.projectOwner.toString() != projectOwnerId) {
        throw new NotAuthorized(entity, action)
    }
    next()
}
}