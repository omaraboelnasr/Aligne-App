import { Request, Response, NextFunction } from 'express';
import _ from 'lodash'
import { AppRequest } from '../types/custom/user';
import { NotFoundError, NotAuthorized } from '../utils/customErrors';
import Task from '../models/taskModels';

export function validateTaskOwnerOrMemberShip(idPath:string,entity:string,action:string){
    return async(req:AppRequest,res:Response,next:NextFunction)=>{
        const id = _.get(req,idPath)
        const UserId = req.appUser?._id
        const task = await Task.findOne({_id: id})
        if (!task) {
            throw new NotFoundError('task', id)
        }
        const isUserOwnerOfTask = task?.taskOwner.toString() == UserId
        const isUserAssigneeOfTask = task?.assignee.find((user) => user.userId.toString() == UserId)
        // const isUserMemberOfProject = project.members.some((user) => user.userId && user.userId.toString() === projectUserId?.toString());

        if (!isUserOwnerOfTask && !isUserAssigneeOfTask) {
            throw new NotAuthorized(entity, action)
        }

    next()
}
}