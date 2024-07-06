import mongoose from "mongoose";

//Variable declaration
const Schema = mongoose.Schema;

//Task schema declaration
const taskSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum: ["New", "Inprogress", "Pending", "Completed"],
        default: "New"
    },
    dueDate:{
        type: Date,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    organizationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
});
const Task = mongoose.model('Task', taskSchema);
export default Task;