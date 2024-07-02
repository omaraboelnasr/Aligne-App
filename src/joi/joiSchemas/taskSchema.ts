import Joi from 'joi';

export const createTaskJoiSchema = Joi.object({
    featureId:Joi.string().required(),
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().required(),
    status:Joi.string(),
    points:Joi.number().required(),
    assignee:Joi.array()
})

export const updateTaskJoiSchema = Joi.object({
    featureId:Joi.string(),
    title:Joi.string().min(3).max(30),
    description:Joi.string(),
    status:Joi.string(),
    points:Joi.number(),
    assignee:Joi.array()
})