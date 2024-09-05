import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { saveTask } from "../../api/Api.jsx"; // Adjust the path as needed

function Inputdata({ inputDiv, setInputDiv, onTaskAdded, taskData }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [taskId, setTaskId] = useState("");

  useEffect(() => {
    if (taskData && taskData.id) {
      setTitle(taskData.title);
      setDesc(taskData.desc);
      setTaskId(taskData.id);
    } else {
      setTitle("");
      setDesc("");
      setTaskId("");
    }
  }, [taskData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskId) {
        await saveTask({ title, desc }, taskId);
        toast.success("Task updated successfully");
      } else {
        await saveTask({ title, desc });
        toast.success("Task added successfully");
      }
      setInputDiv("hidden");
      onTaskAdded(); // Refresh the task list
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task. Please try again.");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center ${inputDiv}`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-md shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-2xl mb-4 text-gray-300">
          {taskId ? "Update Task" : "Add New Task"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 mb-1">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-700 text-gray-300"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {taskId ? "Update Task" : "Add Task"}
        </button>
        <button
          type="button"
          onClick={() => setInputDiv("hidden")}
          className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default Inputdata;
