import { Request, Response, NextFunction } from 'express';
import { createProjectJoiSchema, updateProjectJoiSchema } from "../joiSchemas/projectSchema";

export const validateCreateProject = (req:Request, res:Response, next:NextFunction) => {
    const { error } = createProjectJoiSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message)
    }
    next();
};

export const validateUpdateProject = (req:Request, res:Response, next:NextFunction) => {
    const { error } = updateProjectJoiSchema.validate(req.body);
    if (error) {
        throw new Error(error.details[0].message)
    }
    next();
};