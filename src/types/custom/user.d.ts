import { Request } from 'express';
import { UserDocument } from '../../models/userModels';

export interface AppRequest extends Request {
    appUser?:UserDocument | null;
}