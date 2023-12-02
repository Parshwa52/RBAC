"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const taskController_1 = __importDefault(require("./controller/taskController"));
const userController_1 = __importDefault(require("./controller/userController"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(taskController_1.default);
app.use(userController_1.default, (req, res) => console.log(req));
//const uri: string  = `mongodb://localhost:27017/typescript-crud`
const uri = process.env.MONGO_URI;
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log('MongoDB connected successfully...');
})
    .catch((err) => {
    console.log(`Initial Distribution API Database connection error occured -`, err);
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
