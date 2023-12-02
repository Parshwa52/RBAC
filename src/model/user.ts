import {TUser} from './tuser';
import {model, Schema} from 'mongoose';

const userSchema = new Schema ({
    email: { type: String, unique: true, required: true },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    password: { type: String },
    role: {type: String},
    createTaskPermission: {type: Boolean},
    updateTaskPermission: {type: Boolean},
    deleteTaskPermission: {type: Boolean}
  },
    {timestamps: true}
)
export default model<TUser>('User', userSchema);
