import React, { useState } from "react";
import { SlHeart } from "react-icons/sl";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import Inputdata from "./Inputdata";
import toast from "react-hot-toast";

function Cards({
  data,
  handleCompUpdate,
  handleImpUpdate,
  deleteTask,
  handleTaskAdded,
  setUpdatedData,
  updatedData,
  showAddTask 
}) {
  const [inputDiv, setInputDiv] = useState("hidden");

  const handleCompleteStatus = async (item) => {
    try {
      await handleCompUpdate(item);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleImportantStatus = async (item) => {
    try {
      await handleImpUpdate(item);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
    }
  };

  const handleDelete = async (item) => {
    try {
      await deleteTask(item);
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleUpdateTask = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id, title, desc });
  };

  const handleAddTask = () => {
    setUpdatedData({ id: "", title: "", desc: "" });
    setInputDiv("fixed");
  };

  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        {data && data.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 p-4 rounded-md flex flex-col justify-between hover:scale-105 transition-all duration-300"
            style={{ maxWidth: "300px" }}
          >
            <div className="flex flex-col flex-grow">
              <h3 className="text-xl font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap">
                {item.title}
              </h3>
              <hr className="my-2 border-gray-600" />
              <p
                className="text-gray-400 my-2 overflow-hidden overflow-ellipsis"
                style={{ maxHeight: "6rem", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}
              >
                {item.desc}
              </p>
            </div>
            <div className="mt-4 w-full flex gap-2 items-center">
              <button
                className={`${
                  item.completed === false
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-green-700 hover:bg-green-600 text-white"
                } py-1 px-1 rounded-md w-3/6`}
                onClick={() => handleCompleteStatus(item)}
              >
                {item.completed === false ? "Incomplete" : "Completed"}
              </button>

              <div className="w-3/6 flex justify-around text-xl">
                <button
                  onClick={() => handleImportantStatus(item)}
                  className={`${
                    item.important
                      ? "text-red-500 hover:text-red-800"
                      : "hover:text-gray-400"
                  }`}
                >
                  <SlHeart />
                </button>
                <button
                  className="hover:text-gray-400"
                  onClick={() => handleUpdateTask(item._id, item.title, item.desc)}
                >
                  <FaRegEdit />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="hover:text-gray-400"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          </div>
        ))}

        {showAddTask && (
          <div>
            <div className="border- bg-gray-800 p-4 rounded-md w-full h-full flex flex-col justify-center items-center">
              <button
                className="text-gray-500 text-5xl hover:text-gray-600"
                onClick={handleAddTask}
              >
                <MdAddCircleOutline />
              </button>
              <h2 className="text-gray-400 mt-4 text-lg">Add New Task</h2>
            </div>
          </div>
        )}
      </div>

      <Inputdata
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        onTaskAdded={handleTaskAdded}
        taskData={updatedData}
      />
    </>
  );
}

export default Cards;
