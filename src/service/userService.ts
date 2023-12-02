import {Response, Request} from 'express';
import {TUser} from '../model/tuser';
import User from '../model/user';

const createUser = async(req: Request, res: Response): Promise<void> => {
   try {
      //const body = req.body as Pick<TUser, 'email' | 'first_name' | 'last_name' | 'password' | 'role' | 'createTaskPermission' |'updateTaskPermission' |'deleteTaskPermission'>
      const user: TUser =  new  User({
         email: req.body.details.email,
         first_name: req.body.details.first_name,
         last_name: req.body.details.last_name,
         password: req.body.details.password,
         role: req.body.details.role,
         createTaskPermission: req.body.details.createTaskPermission,
         updateTaskPermission: req.body.details.updateTaskPermission,
         deleteTaskPermission: req.body.details.deleteTaskPermission
      })
      const newUser: TUser =  await user.save()
      res.status(200).json({message:'User added'});
      } catch (error) {
        res.status(500).json({message:'Error adding user', error})
      }
}

const updatePermissionOrProfile = async(req: Request, res: Response): Promise<void> => {
   try {
     let update: {[index: string]: string} = {};
     for (const key of Object.keys(req.body.details)){
        if (req.body[key] !== '') {
           update[key] = req.body.details[key];
        }
     }

     const updateUser: TUser | null = await User.findOneAndUpdate(
      {email: req.body.details.email},
      {$set: update},
      {new: true}
     )
     
     res.status(200).json({message: 'User permission updated'})
      } catch (error) {
        res.status(500).json({message:'Error adding user', error})
      }
}

const getUser = async(req: Request, res: Response): Promise<void> => {
   try {
      const user: TUser[] = await User.find({email: req.body.details.email});
      res.status(200).json({user})
   } catch (error) {
      res.status(500).json({message:'Invalid user', error})
   }
  }

export {createUser, updatePermissionOrProfile, getUser}