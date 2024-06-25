import { Request, Response, NextFunction } from 'express';
import _ from 'lodash'
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';
import { NotFoundError, NotAuthorized } from '../utils/customErrors';

export function validateProjectMemberShip(idPath:string,entity:string,action:string){
    return async(req:AppRequest,res:Response,next:NextFunction)=>{
        const id = _.get(req,idPath)
        const projectMemberId = req.appUser?._id
    const project = await Project.findOne({_id: id})
    if (!project) {
        throw new NotFoundError(entity, id)
    }
    const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == projectMemberId)
    if (!isUserMemberOfProject) {
        throw new NotAuthorized(entity, action)
    }
    next()
}
}