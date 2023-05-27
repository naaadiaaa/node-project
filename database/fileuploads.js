import { Schema, model } from "mongoose";
var picSchema= new Schema({
    picpath:String
})

//var picModel = model('picsdemo',picSchema);
export default model('picsdemo' , picSchema);

//export default picModel;
