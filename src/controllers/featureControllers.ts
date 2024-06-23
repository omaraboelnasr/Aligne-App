import { Request, Response, NextFunction } from 'express';
import Feature from '../models/featureModels';

const createFeature = async (req: Request, res: Response, next: NextFunction)=>{
    const {title,description,color} = req.body
    const { id } = req.params;
    try{
        await Feature.create({projectId:id,title,description,color})
        res.status(201).json({
            message:'Feature added successfully'
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const updateFeature = async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    const feature = req.body
    try{
        const feat = await Feature.updateOne({_id:id}, feature)
        if(feat.matchedCount===0){
            throw new Error('This feature not found')
        }
        res.status(201).json({
            message:'Feature updated successfully'
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getAllFeature = async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try{
        const Features = await Feature.find({projectId:id})
        res.status(201).json({
            message:'Features get successfully',
			data: Features,
        })
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const deleteFeature = async (req: Request, res: Response, next: NextFunction)=>{
    const { id } = req.params;
    try{
        let feat = await Feature.findOneAndDelete({_id:id})
        if(!feat){
            throw new Error('This feature not found')
        }
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

export { createFeature,updateFeature,getAllFeature,deleteFeature };
