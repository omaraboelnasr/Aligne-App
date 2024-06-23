import { Request, Response, NextFunction } from 'express';
import Feature from '../models/featureModels';
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';

const createFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { title, description, color } = req.body
    const { id } = req.params;
    const userId = req.appUser?._id

    try {
        const proj = await Project.findOne({ _id: id })
        if (!proj) {
            throw new Error('Project not found')
        }
        if (proj?.projectOwner.toString() !== userId) {
            throw new Error('You are not authorized to create a feature for this project')
        }
        await Feature.create({ projectId: id, title, description, color })
        res.status(201).json({
            message: 'Feature added successfully'
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const updateFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = req.body
    const userId = req.appUser?._id
    try {
        const feat = await Feature.findOne({ _id: id })
        if (!feat) {
            throw new Error('Feature not found')
        }
        const project = await Project.findOne({ _id: feat?.projectId })
        const isUserMemberOfProject = project?.members.find((user)=>user.userId.toString() == userId)
        const isUserOwnerOfProject = project?.projectOwner.toString() == userId
        if (!isUserOwnerOfProject || !isUserMemberOfProject) {
            throw new Error('You are not authorized to update this feature')
        }
        const updatedfeature = await Feature.updateOne({ _id: id }, feature)
        if (updatedfeature.matchedCount === 0) {
            throw new Error('This feature not found')
        }
        res.status(201).json({
            message: 'Feature updated successfully'
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getAllFeature = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const Features = await Feature.find({ projectId: id })
        res.status(201).json({
            message: 'Features get successfully',
            data: Features,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const deleteFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId: any = req.appUser?._id
    try {
        const feat = await Feature.findOne({ _id: id })
        if (!feat) {
            throw new Error('Feature not found')
        }
        const project = await Project.findOne({ _id: feat?.projectId })
        const isUserMemberOfProject = project?.members.find((user)=>user.userId.toString() == userId)
        const isUserOwnerOfProject = project?.projectOwner.toString() == userId
        if (!isUserOwnerOfProject || !isUserMemberOfProject) {
            throw new Error('You are not authorized to delete this feature')
        }
        let deletedFeature = await Feature.findOneAndDelete({ _id: id })
        if (!deletedFeature) {
            throw new Error('This feature not found')
        }
        res.status(201).json({
            message: 'Project deleted successfully',
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

export { createFeature, updateFeature, getAllFeature, deleteFeature };
