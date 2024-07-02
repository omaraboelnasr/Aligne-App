import Joi from 'joi';

export const createFeatureJoiSchema = Joi.object({
    projectId:Joi.string().required(),
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().required(),
    color:Joi.string(),
})

export const updateFeatureJoiSchema = Joi.object({
    title:Joi.string().min(3).max(30),
    description:Joi.string(),
    color:Joi.string(),
})