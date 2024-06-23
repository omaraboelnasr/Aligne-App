import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/custom/user';
import Project from "../models/projectModels";

const createProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { title, description, icon, color, members } = req.body
    const projectOwner = req.appUser?._id
    try {
        await Project.create({ projectOwner, title, description, icon, color, members })
        res.status(201).json({
            message: 'Project added successfully'
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const updateProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = req.body
    const projectOwnerId = req.appUser?._id
    try {
        const proj = await Project.findOne({ _id: id })
        if (!proj) {
            throw new Error('Project not found')
        }
        if (proj?.projectOwner.toString() != projectOwnerId) {
            throw new Error('Not authorized to update this project')
        }
        const updatedProject = await Project.updateOne({ _id: id }, project);
        if (updatedProject.matchedCount === 0) {
            throw new Error('This project not found')            
        }
        res.status(200).json({
            message: 'Project updated successfully'
        });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id)
        res.status(201).json({
            message: 'Project get successfully',
            data: project,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getAllProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const projectOwner = req.appUser?._id
    try {
        const projects = await Project.find({ projectOwner })
        res.status(201).json({
            message: 'Projects get successfully',
            data: projects,
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const deleteProject = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const projectOwnerId = req.appUser?._id
    try {
        const proj = await Project.findOne({ _id: id })
        if (!proj) {
            throw new Error('Project not found')
        }
        if (proj?.projectOwner.toString() != projectOwnerId) {
            throw new Error('Not authorized to delete this project')
        }
        await Project.deleteOne({id})
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


export { createProject, updateProject, getProject, getAllProject, deleteProject };
