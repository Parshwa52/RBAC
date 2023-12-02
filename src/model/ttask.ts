import { Document } from 'mongoose';

export interface TTask extends Document {
    name: string;
    description: string;
    status: string;
  }