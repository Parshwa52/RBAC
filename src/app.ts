import express, {Express} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import taskController from './controller/taskController';
import userController from './controller/userController';
import {isAllowed} from "./service/authService";
require('dotenv').config()

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(taskController);
app.use(userController);


//const uri: string  = `mongodb://localhost:27017/typescript-crud`
const uri: string | any= process.env.MONGO_URI;

mongoose
.connect(uri)
.then(() => {
    console.log('MongoDB connected successfully...')
})
.catch((err) => {
  console.log(
    `Initial Distribution API Database connection error occured -`,
    err
  );
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
