import mongoose from "mongoose";
import { Types } from 'mongoose';

const Schema = mongoose.Schema;
interface Member {
    userId: Types.ObjectId;
    username:string
}

interface Project {
    projectOwner: Types.ObjectId;
    title: string;
    description: string;
    icon: string;
    color: string;
    members: Member[]
}
const memberSchema = new Schema<Member>({
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    username:{type:String}
});

const projectSchema = new Schema<Project>(
    {
        projectOwner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
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
        icon: {
            type: String
        },
        color: {
            type: String
        },
        members: {
            type: [memberSchema]
        }
    }
)

const Project = mongoose.model<Project>('Project', projectSchema)
export default Project;