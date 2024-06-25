import { Request, Response, NextFunction } from 'express';
import Feature from '../models/featureModels';
import { AppRequest } from '../types/custom/user';
import Project from '../models/projectModels';
import { NotAuthorized, NotFoundError } from '../utils/customErrors';

const createFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { title, description, color } = req.body
    const { id } = req.params;
    await Feature.create({ projectId: id, title, description, color })
    res.status(201).json({
        message: 'Feature added successfully'
    })
}

const updateFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = req.body
    const feat = await Feature.findOne({ _id: id })
    if (!feat) {
        throw new NotFoundError('feature', id)
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
    const features = await Feature.find({ projectId: id })
    res.status(200).json({
        message: 'Features get successfully',
        data: features,
    })

}

const deleteFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feat = await Feature.findOne({ _id: id })
    if (!feat) {
        throw new NotFoundError('feature', id)
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
