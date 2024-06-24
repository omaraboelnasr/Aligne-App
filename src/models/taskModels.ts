import mongoose from "mongoose";
import { Types } from 'mongoose';

const Schema = mongoose.Schema;
interface Assignee {
    userId: Types.ObjectId;
}

interface Task {
    featureId: Types.ObjectId;
    taskOwner:Types.ObjectId;
    title: string;
    description: string;
    status: string;
    points:number;
    assignee:Assignee[];
}

const assigneeSchema = new Schema<Assignee>({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
});

const taskSchema = new Schema<Task>({
    taskOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    featureId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Feature',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: String,
        enum: ["pending", "in progress", "done"],
        default: "pending"
    },
    points:{
        type:Number,
        required: [true, 'Points is required']
    },
    assignee:{
        type:[assigneeSchema]
    }
})

const Task = mongoose.model<Task>('Task', taskSchema)
