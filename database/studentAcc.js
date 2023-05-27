import { Schema , model } from "mongoose";

const students = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    academicNumber: { type: Number, required: true }

}, {timeseries:true});

export default model('student' , students);