import {Response, Request, NextFunction} from 'express';
import {TUser} from '../model/tuser';
import User from '../model/user';

const isAllowed = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user: TUser | null = await User.findOne({email: req.body.email, password: req.body.password});
        if(user) {
            if(user.role!=="admin") {
                var path = req.path.toString();
                if(path.includes("/add-task")) {
                    if(user.createTaskPermission===true) {
                        next();
                    } else {
                        res.status(401).json({message:'User Unauthorized'});
                    }
                } else if(path.includes("/update-task")) {
                    if(user.updateTaskPermission===true) {
                        next();
                    } else {
                        res.status(401).json({message:'User Unauthorized'});
                    }
                } else if(path.includes("/delete-task")) {
                    if(user.deleteTaskPermission===true) {
                        next();
                    } else {
                        res.status(401).json({message:'User Unauthorized'});
                    }
                } else if(path.includes("/tasks")) {
                    next();
                } else if(path.includes("/get-user")) {
                    if(user.email===req.body.details.email) {
                        next();
                    } else {
                        res.status(401).json({message:'User Unauthorized'});
                    }
                } else {
                    res.status(404).json({message:'Invalid URL'});
                }
            } 
         else
            {
                next();
            }
        } else if(req.path==="/") {
            res.status(200).send('Welcome to RBAC! Please consume APIs as given in docs attached.')
        } else {
            res.status(401).json({message:'Wrong Username/Password'});
        } 

       } catch (error) {
         res.status(500).json({message:'Internal Server Error', error})
       }
 }

 export {isAllowed}