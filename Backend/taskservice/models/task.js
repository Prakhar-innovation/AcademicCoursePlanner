import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    studentId: {
        type: Number,
        required: true
    },

    courseId: {
        type: Number,
        required: true
    },

    dueDate: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        default: "Medium"
    },

    status: {
        type: String,
        default: "Pending"
    }
},
{
    timestamps: true
}
);

const Task =
mongoose.model(
    "Task",
    taskSchema
);

export default Task;