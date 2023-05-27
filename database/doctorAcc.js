import { Schema , model } from "mongoose";

const doctors = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
}, {timeseries:true});

export default model('doctor' , doctors);