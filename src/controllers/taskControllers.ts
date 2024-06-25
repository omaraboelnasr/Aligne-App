import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/custom/user';
import { NotAuthorized, NotFoundError } from '../utils/customErrors';
import Task from '../models/taskModels'
import Feature from '../models/featureModels';
import Project from '../models/projectModels';

const createTask = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { title, description, color } = req.body
    const { id } = req.params;
    const userId = req.appUser?._id
    const feature = await Feature.findOne({ _id: id })
    if (!feature) {
        throw new NotFoundError('feature', id)
    }
    // const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == userId)
    // const isUserOwnerOfProject = project?.projectOwner.toString() == userId
    // if (!isUserOwnerOfProject || !isUserMemberOfProject) {
    //     throw new NotAuthorized('feature', 'create')
    // }
    await Feature.create({ projectId: id, title, description, color })
    res.status(201).json({
        message: 'Feature added successfully'
    })
}
