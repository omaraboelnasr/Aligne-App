import Joi, { string } from 'joi';

export const createProjectJoiSchema = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().required(),
    icon:Joi.string(),
    color:Joi.string(),
    members:Joi.array()
})

export const updateProjectJoiSchema = Joi.object({
    title:Joi.string().min(3).max(30),
    description:Joi.string(),
    icon:Joi.string(),
    color:Joi.string(),
    members:Joi.array()
})