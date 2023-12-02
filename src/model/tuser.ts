import { Document } from 'mongoose';

export interface TUser extends Document {
    email: string,
    first_name: string;
    last_name: string;
    password: string,
    role: string,
    createTaskPermission: boolean,
    updateTaskPermission: boolean,
    deleteTaskPermission: boolean
  }