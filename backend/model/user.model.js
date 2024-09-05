import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },



    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task' // Ensure this matches the name of your Task model
    }]
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const User = mongoose.model('user', userSchema);

export default User;