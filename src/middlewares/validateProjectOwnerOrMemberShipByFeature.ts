import { Request, Response, NextFunction } from 'express';
import _ from 'lodash'
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';
import { NotFoundError, NotAuthorized } from '../utils/customErrors';
import Feature from '../models/featureModels';

export function validateProjectOwnerOrMemberShipByFeature(idPath:string,entity:string,action:string){
    return async(req:AppRequest,res:Response,next:NextFunction)=>{
        const id = _.get(req,idPath)
        const projectUserId = req.appUser?._id
        const feat = await Feature.findOne({ _id: id })
        if (!feat) {
            throw new NotFoundError('feature', id)
        }
    
        const project = await Project.findOne({ _id: feat?.projectId })
        const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == projectUserId)
        const isUserOwnerOfProject = project?.projectOwner.toString() == projectUserId
        if (!isUserOwnerOfProject && !isUserMemberOfProject) {
            throw new NotAuthorized(entity, action)
        }

    next()
}
}