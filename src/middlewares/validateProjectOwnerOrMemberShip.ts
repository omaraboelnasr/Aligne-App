import { Request, Response, NextFunction } from 'express';
import _ from 'lodash'
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';
import { NotFoundError, NotAuthorized } from '../utils/customErrors';

export function validateProjectOwnerOrMemberShip(idPath:string,entity:string,action:string){
    return async(req:AppRequest,res:Response,next:NextFunction)=>{
        const id = _.get(req,idPath)
        const projectUserId = req.appUser?._id

        const project = await Project.findOne({ _id: id })
        if (!project) {
            throw new NotFoundError(entity, id)
        }
        const isUserOwnerOfProject = project.projectOwner.toString() == projectUserId?.toString()
        
        const isUserMemberOfProject = project.members.some((user) => user.userId && user.userId.toString() === projectUserId?.toString());

        if (!isUserOwnerOfProject && !isUserMemberOfProject) {
            throw new NotAuthorized(entity, action)
        }
    next()
}
}