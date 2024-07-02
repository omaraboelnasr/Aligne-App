import { Request, Response, NextFunction } from 'express';
import { createFeatureJoiSchema, updateFeatureJoiSchema } from '../joiSchemas/featureSchema';

export const validateCreateFeature = (req:Request, res:Response, next:NextFunction) => {
    const { error } = createFeatureJoiSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message)
    }
    next();
};

export const validateUpdateFeature = (req:Request, res:Response, next:NextFunction) => {
    const { error } = updateFeatureJoiSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message)
    }
    next();
};