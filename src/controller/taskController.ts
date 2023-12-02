import { Router } from 'express';
import {getTasks, addTask, updateTask, deleteTask} from '../service/taskService';
import { isAllowed } from '../service/authService';

const taskController : Router =  Router();

taskController.use(isAllowed);
taskController.get('/tasks',getTasks);
taskController.post('/add-task', addTask);
taskController.put('/update-task/:id', updateTask);
taskController.delete('/delete-task/:id', deleteTask);

export default taskController;

