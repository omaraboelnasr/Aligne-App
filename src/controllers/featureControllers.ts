import { Request, Response, NextFunction } from 'express';
import Feature from '../models/featureModels';
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';
import { NotAuthorized, NotFoundDataError, NotFoundError } from '../utils/customErrors';

const createFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { title, description, color } = req.body
    const { id } = req.params;
    const userId = req.appUser?._id
    const project = await Project.findOne({ _id: id })
    if (!project) {
        throw new NotFoundError('project', id)
    }
    const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == userId)
    const isUserOwnerOfProject = project?.projectOwner.toString() == userId
    if (!isUserOwnerOfProject || !isUserMemberOfProject) {
        throw new NotAuthorized('feature', 'create')
    }
    await Feature.create({ projectId: id, title, description, color })
    res.status(201).json({
        message: 'Feature added successfully'
    })
}

const updateFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = req.body
    const userId = req.appUser?._id
    const feat = await Feature.findOne({ _id: id })
    if (!feat) {
        throw new NotFoundError('feature', id)
    }
    const project = await Project.findOne({ _id: feat?.projectId })
    const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == userId)
    const isUserOwnerOfProject = project?.projectOwner.toString() == userId
    if (!isUserOwnerOfProject || !isUserMemberOfProject) {
        throw new NotAuthorized('feature', 'create')
    }
    const updatedfeature = await Feature.updateOne({ _id: id }, feature)
    if (updatedfeature.matchedCount === 0) {
        throw new NotFoundError('feature', id)
    }
    res.status(201).json({
        message: 'Feature updated successfully'
    })
}

const getAllFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.appUser?._id
    const project = await Project.findOne({ _id: id })
    if (!project) {
        throw new NotFoundError('project', id)
    }
    const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == userId)
    const isUserOwnerOfProject = project?.projectOwner.toString() == userId
    if (!isUserOwnerOfProject || !isUserMemberOfProject) {
        throw new NotAuthorized('feature', 'get')
    }
    const Features = await Feature.find({ projectId: id })
    if (!Features) {
        throw new NotFoundDataError('Features')
    }
    res.status(201).json({
        message: 'Features get successfully',
        data: Features,
    })

}

const deleteFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId: any = req.appUser?._id
    const feat = await Feature.findOne({ _id: id })
    if (!feat) {
        throw new NotFoundError('feature', id)
    }
    const project = await Project.findOne({ _id: feat?.projectId })
    const isUserMemberOfProject = project?.members.find((user) => user.userId.toString() == userId)
    const isUserOwnerOfProject = project?.projectOwner.toString() == userId
    if (!isUserOwnerOfProject || !isUserMemberOfProject) {
        throw new NotAuthorized('feature', 'delete')
    }
    let deletedFeature = await Feature.findOneAndDelete({ _id: id })
    if (!deletedFeature) {
        throw new NotFoundError('feature', id)
    }
    res.status(201).json({
        message: 'Project deleted successfully',
    })

}

export { createFeature, updateFeature, getAllFeature, deleteFeature };
