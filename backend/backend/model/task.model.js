import mongoose from "mongoose";

const taskScheme = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    important: {
        type: Boolean,
        default: false
    },

    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Task = mongoose.model('task', taskScheme)

export default Task