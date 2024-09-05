import React, { useState, useEffect } from "react";
import Cards from "../components/home/Cards.jsx";
import { fetchInCompletedTasks } from '../api/Api.jsx';
import { handleCompUpdate, handleImpUpdate, handleTaskAdded, handleDelete } from '../Task Handler/TaskHandler.jsx';

export default function IncompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [updatedData, setUpdatedData] = useState({ id: "", title: "", desc: "" });

  useEffect(() => {
    const fetchInCompleted = async () => {
      await handleTaskAdded(setTasks, fetchInCompletedTasks);
    };
    fetchInCompleted();
  }, []);

  const handleImpUpdateWrapper = async (item) => {
    try {
      // Toggle importance status
      await handleImpUpdate(item, setTasks);
      // Refetch important tasks to update the list
      const updatedTasks = await fetchInCompletedTasks();
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
      const updatedTasks = await fetchInCompletedTasks();
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
      const updatedTasks = await fetchInCompletedTasks();
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
        handleTaskAdded={() => handleTaskAdded(setTasks, fetchInCompletedTasks)}
        setUpdatedData={setUpdatedData}
        updatedData={updatedData}
        showAddTask={false}
      />
    </div>
  );
}
