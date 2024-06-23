import mongoose from "mongoose";
import { Types } from 'mongoose';

const Schema = mongoose.Schema;
interface Feature {
    projectId: Types.ObjectId;
    title: string;
    description: string;
    color: string;
}

const featureSchema = new Schema<Feature>(
    {
        projectId:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Project',
            required: true
        },
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },color: {
            type: String
        }
    }
)

const Feature = mongoose.model<Feature>('Feature',featureSchema)
export default Feature