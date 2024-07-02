import { Request, Response, NextFunction } from 'express';
import Feature from '../models/featureModels';
import { AppRequest } from '../types/custom/user';
import { NotFoundError } from '../utils/customErrors';

const createFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { projectId,title, description, color } = req.body
    await Feature.create({ projectId, title, description, color })
    res.status(201).json({
        message: 'Feature added successfully'
    })
}

const updateFeature = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = req.body
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
    let deletedFeature = await Feature.findOneAndDelete({ _id: id })
    if (!deletedFeature) {
        throw new NotFoundError('feature', id)
    }
    res.status(201).json({
        message: 'Feature deleted successfully',
    })

}

export { createFeature, updateFeature, getAllFeature, deleteFeature };
