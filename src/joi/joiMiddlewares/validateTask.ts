import { Request, Response, NextFunction } from 'express';
import { createFeatureJoiSchema, updateFeatureJoiSchema } from '../joiSchemas/featureSchema';
import { createTaskJoiSchema, updateTaskJoiSchema } from '../joiSchemas/taskSchema';

export const validateCreateTask = (req:Request, res:Response, next:NextFunction) => {
    const { error } = createTaskJoiSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message)
    }
    next();
};

export const validateUpdateTask = (req:Request, res:Response, next:NextFunction) => {
    const { error } = updateTaskJoiSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message)
    }
    next();
};