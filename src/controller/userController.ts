import { Router } from 'express';
import {createUser, getUser, updatePermissionOrProfile} from '../service/userService';
import { isAllowed } from '../service/authService';

const userController : Router =  Router();

userController.use(isAllowed);
userController.post('/create-user', createUser);
userController.put('/modify-user', updatePermissionOrProfile);
userController.get('/get-user', getUser);

export default userController;

