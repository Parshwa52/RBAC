"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowed = void 0;
const user_1 = __importDefault(require("../model/user"));
const isAllowed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ email: req.body.email, password: req.body.password });
        if (user) {
            if (user.role !== "admin") {
                var path = req.path.toString();
                if (path.includes("/add-task")) {
                    if (user.createTaskPermission === true) {
                        next();
                    }
                    else {
                        res.status(401).json({ message: 'User Unauthorized' });
                    }
                }
                else if (path.includes("/update-task")) {
                    if (user.updateTaskPermission === true) {
                        next();
                    }
                    else {
                        res.status(401).json({ message: 'User Unauthorized' });
                    }
                }
                else if (path.includes("/delete-task")) {
                    if (user.deleteTaskPermission === true) {
                        next();
                    }
                    else {
                        res.status(401).json({ message: 'User Unauthorized' });
                    }
                }
                else if (path.includes("/tasks")) {
                    next();
                }
                else if (path.includes("/get-user")) {
                    if (user.email === req.body.details.email) {
                        next();
                    }
                    else {
                        res.status(401).json({ message: 'User Unauthorized' });
                    }
                }
                else {
                    res.status(404).json({ message: 'Invalid URL' });
                }
            }
            else {
                next();
            }
        }
        else {
            res.status(401).json({ message: 'Wrong Username/Password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});
exports.isAllowed = isAllowed;
