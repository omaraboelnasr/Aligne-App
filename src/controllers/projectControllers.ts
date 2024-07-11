import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/custom/user';
import Project from "../models/projectModels";
import { NotAuthorized, NotFoundError } from '../utils/customErrors';

const createProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { title, description, icon, color, members } = req.body
    const projectOwner = req.appUser?._id
    await Project.create({ projectOwner, title, description, icon, color, members })
    res.status(201).json({
        message: 'Project added successfully'
    })
}

const updateProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = req.body
    const updatedProject = await Project.updateOne({ _id: id }, project);
    if (updatedProject.matchedCount === 0) {
        throw new NotFoundError('project', id)
    }
    res.status(200).json({
        message: 'Project updated successfully'
    });
}

const getProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await Project.findOne({ _id: id })
    res.status(201).json({
        message: 'Project get successfully',
        data: project,
    })

}

const getAllProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const userId = req.appUser?._id
    const projects = await Project.find({$or:[{ projectOwner: userId },{ 'members._id': userId }]})
    res.status(201).json({
        message: 'Projects get successfully',
        data: projects,
    })
}

const deleteProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const projectOwnerId = req.appUser?._id
    const proj = await Project.findOne({ _id: id })
    if (!proj) {
        throw new NotFoundError('project', id)
    }
    if (proj?.projectOwner.toString() != projectOwnerId) {
        throw new NotAuthorized('project', 'delete')
    }
    await Project.deleteOne({ _id: id  })
    res.status(201).json({
        message: 'Project deleted successfully',
    })
}


export { createProject, updateProject, getProject, getAllProject, deleteProject };
