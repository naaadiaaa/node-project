import { Schema, model } from "mongoose";

const departmentModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: false,
    }
}, { timestamps: true });

const departmentmodel = model('department', departmentModel);
export default departmentmodel;