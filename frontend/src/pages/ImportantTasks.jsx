import React, { useState, useEffect } from "react";
import Cards from "../components/home/Cards";
import { fetchImportantTasks } from '../api/Api.jsx';
import { handleCompUpdate, handleImpUpdate, handleTaskAdded, handleDelete } from '../Task Handler/TaskHandler.jsx';

export default function ImportantTasks() {
  const [tasks, setTasks] = useState([]);
  const [updatedData, setUpdatedData] = useState({ id: "", title: "", desc: "" });

  useEffect(() => {
    const fetchImportant = async () => {
      await handleTaskAdded(setTasks, fetchImportantTasks);
    };
    fetchImportant();
  }, []);

  const handleImpUpdateWrapper = async (item) => {
    try {
      // Toggle importance status
      await handleImpUpdate(item, setTasks);
      // Refetch important tasks to update the list
      const updatedTasks = await fetchImportantTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task importance:", error);
    }
  };

  const handleCompUpdateWrapper = async (item) => {
    try {
      // Update task completion status
      await handleCompUpdate(item, setTasks);
      // Refetch important tasks to reflect changes
      const updatedTasks = await fetchImportantTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  const handleDeleteWrapper = async (item) => {
    try {
      // Delete task
      await handleDelete(item, setTasks);
      // Refetch important tasks to ensure the list is updated
      const updatedTasks = await fetchImportantTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <Cards
        data={tasks}
        handleCompUpdate={handleCompUpdateWrapper}
        handleImpUpdate={handleImpUpdateWrapper}
        deleteTask={handleDeleteWrapper}
        handleTaskAdded={() => handleTaskAdded(setTasks, fetchImportantTasks)}
        setUpdatedData={setUpdatedData}
        updatedData={updatedData}
        showAddTask={false}
      />
    </div>
  );
}
