import { Schema, model} from "mongoose";

const courses =new Schema({
    name:{
        type: String,
        required: true
    },

    code: {
        type: String,
        required: false,
    },

    department:{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'departments'
    }
}, {timestamps: true} )

export default model('courses', courses)


