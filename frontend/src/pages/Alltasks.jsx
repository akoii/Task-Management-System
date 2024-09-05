import React, { useState, useEffect } from "react";
import Cards from "../components/home/Cards";
import { MdAddCircleOutline } from "react-icons/md";
import Inputdata from "../components/home/Inputdata";
import { fetchTasks } from '../api/Api.jsx';
import { handleCompUpdate, handleImpUpdate, handleTaskAdded, handleDelete } from '../Task Handler/TaskHandler.jsx'; // Adjust the path as needed

export default function AllTasks() {
  const [updatedData, setUpdatedData] = useState({ id: "", title: "", desc: "" });
  const [inputData, setInputData] = useState("hidden");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      await handleTaskAdded(setTasks, fetchTasks);
    };
    fetchAllTasks();
  }, []);

  return (
    <>
      <div className="mr-4 flex justify-end">
        <button onClick={() => setInputData("fixed")}>
          <MdAddCircleOutline className="text-4xl text-gray-500 hover:text-gray-600" />
        </button>
      </div>
      <div>
        <Cards
          home={true}
          data={tasks}
          handleCompUpdate={(item) => handleCompUpdate(item, setTasks)}
          handleImpUpdate={(item) => handleImpUpdate(item, setTasks)}
          deleteTask={(item) => handleDelete(item, setTasks)}
          handleTaskAdded={() => handleTaskAdded(setTasks, fetchTasks)}
          setUpdatedData={setUpdatedData}
          updatedData={updatedData}
          showAddTask={true}
        />
      </div>
      <Inputdata 
        inputDiv={inputData} 
        setInputDiv={setInputData} 
        onTaskAdded={() => handleTaskAdded(setTasks, fetchTasks)} 
        taskData={updatedData} // Pass task data to Inputdata for editing
      />
    </>
  );
}
