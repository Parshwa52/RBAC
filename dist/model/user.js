"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    password: { type: String },
    role: { type: String },
    createTaskPermission: { type: Boolean },
    updateTaskPermission: { type: Boolean },
    deleteTaskPermission: { type: Boolean }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', userSchema);
