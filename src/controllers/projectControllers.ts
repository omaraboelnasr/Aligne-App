import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/custom/user';
import Project from "../models/projectModels";

const createProject = async (req: AppRequest, res: Response, next: NextFunction)=>{
    let {title,description,icon,color,members} = req.body
    let projectOwner = req.appUser?._id
    try{
        await Project.create({projectOwner,title,description,icon,color,members})
        res.status(201).json({
            message:'Project added successfully'
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const updateProject = async (req: AppRequest, res: Response, next: NextFunction)=>{
    let { id } = req.params;
    let project = req.body
    try{
        await Project.findByIdAndUpdate(id, project, {
			new: true,
			runValidator: true,
		});
        res.status(201).json({
            message:'Project updated successfully'
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getProject = async (req: AppRequest, res: Response, next: NextFunction)=>{
    let { id } = req.params;
    try{
        const project = await Project.findById(id)
        res.status(201).json({
            message:'Project get successfully',
			data: project,
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getAllProject = async (req: AppRequest, res: Response, next: NextFunction)=>{
    let projectOwner = req.appUser?._id
    try{
        const projects = await Project.find({projectOwner})
        res.status(201).json({
            message:'Projects get successfully',
			data: projects,
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const deleteProject = async (req: AppRequest, res: Response, next: NextFunction)=>{
    let { id } = req.params;
    try{
        await Project.findByIdAndDelete(id)
        res.status(201).json({
            message:'Project deleted successfully',
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}


export { createProject,updateProject,getProject,getAllProject,deleteProject };
