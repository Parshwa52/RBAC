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
exports.getUser = exports.updatePermissionOrProfile = exports.createUser = void 0;
const user_1 = __importDefault(require("../model/user"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const body = req.body as Pick<TUser, 'email' | 'first_name' | 'last_name' | 'password' | 'role' | 'createTaskPermission' |'updateTaskPermission' |'deleteTaskPermission'>
        const user = new user_1.default({
            email: req.body.details.email,
            first_name: req.body.details.first_name,
            last_name: req.body.details.last_name,
            password: req.body.details.password,
            role: req.body.details.role,
            createTaskPermission: req.body.details.createTaskPermission,
            updateTaskPermission: req.body.details.updateTaskPermission,
            deleteTaskPermission: req.body.details.deleteTaskPermission
        });
        const newUser = yield user.save();
        res.status(200).json({ message: 'User added' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});
exports.createUser = createUser;
const updatePermissionOrProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let update = {};
        for (const key of Object.keys(req.body.details)) {
            if (req.body[key] !== '') {
                update[key] = req.body.details[key];
            }
        }
        const updateUser = yield user_1.default.findOneAndUpdate({ email: req.body.details.email }, { $set: update }, { new: true });
        res.status(200).json({ message: 'User permission updated' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
});
exports.updatePermissionOrProfile = updatePermissionOrProfile;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.find({ email: req.body.details.email });
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: 'Invalid user', error });
    }
});
exports.getUser = getUser;
