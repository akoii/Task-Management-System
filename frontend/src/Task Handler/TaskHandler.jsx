import { updateTaskCompletion, updateTaskImportance, deleteTask } from '../api/Api.jsx';
import { toast } from 'react-hot-toast';

// Handle completion update
export const handleCompUpdate = async (item, setTasks) => {
  try {
    await updateTaskCompletion(item._id);
    setTasks(prevTasks =>
      prevTasks.map(t =>
        t._id === item._id ? { ...t, completed: !t.completed } : t
      )
    );
  } catch (error) {
    console.error("Error updating task completion:", error);
  }
};

// Handle importance update
export const handleImpUpdate = async (item, setTasks) => {
    try {
      await updateTaskImportance(item._id);
      setTasks(prevTasks =>
        prevTasks.map(t =>
          t._id === item._id ? { ...t, important: !t.important } : t
        )
      );
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };
// Handle task addition or update
export const handleTaskAdded = async (setTasks, fetchTasksFunction) => {
  try {
    const tasksData = await fetchTasksFunction();
    setTasks(tasksData);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

// Handle task deletion
export const handleDelete = async (item, setTasks) => {
  try {
    await deleteTask(item._id);
    setTasks(prevTasks =>
      prevTasks.filter(t => t._id !== item._id)
    );
    toast.success("Task deleted successfully");
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task: please try again");
  }
};
