import { Request, Response, NextFunction } from 'express';
import { AppRequest } from '../types/custom/user';
import { NotFoundError } from '../utils/customErrors';
import Task from '../models/taskModels'


const createTask = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { featureId, title, description, points, assignee } = req.body
    const userId = req.appUser?._id
    await Task.create({ taskOwner: userId, featureId, title, description, points, assignee })
    res.status(201).json({
        message: 'Task added successfully'
    })
}

const updateTask = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const feature = req.body
    const updatedfeature = await Task.updateOne({ _id: id }, feature)
    if (updatedfeature.matchedCount === 0) {
        throw new NotFoundError('task', id)
    }
    res.status(201).json({
        message: 'Task updated successfully'
    })
}

const getTask = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id })
    res.status(201).json({
        data: task,
    })
}

// const listTasks = async (req: AppRequest, res: Response, next: NextFunction) => {
//     //Cursor-Based Pagination
//     const { featureId, cursor, limit = 10, owner, status } = req.query;
//     const limitParsed = parseInt(limit as string);
//     const safeLimit = Math.min(limitParsed, 100)
//     //pagination=> pages , 
//     //filter=> owner , status
//     const query: any = {}
//     if (cursor) {
//         query._id = { $gt: cursor };
//     }
//     //   query.featureId=featureId
//     //   query.taskOwner=owner
//     //   query.status=status
//     const tasks = await Task.find(query).limit(safeLimit)
//     const prevCursor = cursor && tasks.length > 0 ? tasks[0]._id : null;

//     const nextCursor = tasks.length > 0 ? tasks[tasks.length - 1]._id : null;

//     res.status(200).json({
//         total: tasks.length,
//         data: tasks,
//         nextCursor,
//         prevCursor,
//     })
// }

const listTasks = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { featureId, taskOwner, status } = req.query;
    const query:any ={}
    if(featureId){
        query.featureId=featureId
    }
    if(taskOwner){
        query.taskOwner = taskOwner
    }
    if(status){
        query.status = status
    }
    const limit = parseInt(req.query.limit as string) || 10; 
    const offset = parseInt(req.query.offset as string) || 0;
    const tasks = await Task.find(query).skip(offset).limit(limit)
    const totalTasks = await Task.countDocuments(query)
    res.status(200).json({
        total:totalTasks,
        limit: limit,
        offset: offset,
        data: tasks,
    })
}

const deleteTask = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let deletedTask = await Task.findOneAndDelete({ _id: id })
    if (!deletedTask) {
        throw new NotFoundError('task', id)
    }
    res.status(201).json({
        message: 'Task deleted successfully',
    })

}
export { createTask, updateTask, getTask, deleteTask, listTasks };
