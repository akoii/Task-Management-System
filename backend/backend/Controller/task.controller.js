import Task from "../model/task.model.js";
import User from "../model/user.model.js";

export const createTask = async(req, res) => {
    try {
        const id = req.user.id; // Adjust as needed

        const { title, desc } = req.body;

        // Create and save the new task
        const newTask = new Task({
            title: title,
            desc: desc,
        });

        const task = await newTask.save();

        // Update the user's task list
        await User.findByIdAndUpdate(id, {
            $push: {
                tasks: task._id,
            },
        });

        // Send success response
        res.status(200).json({ message: "Task created successfully" });
    } catch (error) {
        console.error("Error creating task:", error.message); // Improved logging
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllTask = async(req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the authenticated user

        // Find the user and populate tasks
        const userData = await User.findById(userId).populate({
            path: "tasks",
            select: "title desc important completed",
            options: { sort: { createdAt: -1 } }, // Sort tasks by creation date in descending order
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Send success response
        res.status(200).json({
            username: userData.username,
            email: userData.email,
            tasks: userData.tasks
        }); // Use 200 for successful retrieval
    } catch (error) {
        console.error("Error fetching tasks:", error.message); // Improved logging
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteTask = async(req, res) => {
    try {
        const { id } = req.params
        const userID = req.user.id
        await Task.findByIdAndDelete(id)
        await User.findByIdAndUpdate(userID, {
            $pull: {
                tasks: id
            }
        });

        return res.status(200).json({
            message: 'Task deleted successfully'
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });

    }

}

export const updateTask = async(req, res) => {
    try {
        const { id } = req.params
        const { title, desc } = req.body

        await Task.findByIdAndUpdate(id, { title: title, desc: desc }),
            res.status(200).json({ message: "Task updated successfully" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });

    }
}
export const updateImpTask = async(req, res) => {
    try {
        const { id } = req.params;
        const taskData = await Task.findById(id); // Await the promise
        const important = taskData.important;

        await Task.findByIdAndUpdate(id, { important: !important });

        res.status(200).json({ message: "Important status updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateCompTask = async(req, res) => {
    try {
        const { id } = req.params;

        // Fetch the task by ID with await
        const taskData = await Task.findById(id);

        if (!taskData) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Toggle the completed status
        const updatedTask = await Task.findByIdAndUpdate(
            id, { completed: !taskData.completed }, { new: true } // Ensure the returned document is the updated one
        );

        res.status(200).json({ message: "Completion status updated successfully", task: updatedTask });
    } catch (error) {
        console.error("Error updating task:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getImpTasks = async(req, res) => {
    try {
        const userID = req.user.id;


        // Find user and populate tasks where `important` is true
        const user = await User.findById(userID).populate({
            path: 'tasks',
            match: { important: true },
            options: { sort: { createdAt: -1 } }
        });

        const impTasks = user.tasks

        res.status(200).json({
            message: 'Important tasks fetched successfully',
            impTasks
        });

    } catch (error) {
        console.error('Error fetching important tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCompTasks = async(req, res) => {
    try {
        const userID = req.user.id

        const user = await User.findById(userID).populate({
            path: 'tasks',
            options: { sort: { createdAt: -1 } },
            match: { completed: true }
        })

        const completedTasks = user.tasks
        res.status(200).json({ message: "these are all important tasks", completedTasks })
    } catch (error) {
        console.error('Error fetching important tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const getIncompTasks = async(req, res) => {
    try {
        const userID = req.user.id;

        const user = await User.findById(userID).populate({
            path: "tasks",
            match: { completed: false },
            options: { sort: { createdAt: -1 } }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const incompTasks = user.tasks;

        return res.status(200).json({ message: "These are incomplete tasks", incompTasks });
    } catch (error) {
        console.error('Error fetching incomplete tasks:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};