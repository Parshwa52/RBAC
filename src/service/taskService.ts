import {Response, Request} from 'express';
import {TTask} from '../model/ttask';
import Task from '../model/task';

//  Get all tasks
const getTasks = async(req: Request, res: Response): Promise<void> => {
 try {
    const tasks: TTask[] = await Task.find();
    res.status(200).json({tasks})
 } catch (error) {
    throw error
 }
}

// Add Task
const addTask = async(req: Request, res: Response): Promise<void> => {
    try {
    const body = req.body.details as Pick<TTask, 'name' | 'description' | 'status'>
    const task: TTask =  new  Task({
        name: body.name,
        description: body.description,
        status: body.status
    })
    const newTask: TTask =  await task.save()
    res.status(201).json({message:'Task added'});
    } catch (error) {
      res.status(500).json({message:'Error adding task', error})
    }
}

// Update Task
const updateTask =  async(req: Request, res: Response): Promise<void> => {
    try {
       const {
        params: {id},
        body,
       }  = req;
       const updateTask: TTask | null = await Task.findOneAndUpdate(
        {_id: id},
        body.details
       )
       res.status(200).json({message: 'Task updated'})
    } catch (error) {
      res.status(500).json({message:'Error updating task', error})
    }
}

// delete Task
const deleteTask  = async (req: Request, res: Response): Promise<void> => {
 try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'Task deleted'})
 } catch (error) {
   res.status(500).json({message:'Error deleting task', error})
 }
}


export {getTasks, addTask, updateTask, deleteTask}