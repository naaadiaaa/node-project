import { Schema, model } from "mongoose";

const students = new Schema({
   username: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   academicnumber: {
      type: String,
      required: true,
   },


}, { timestamps: true });

export default model('students', students);