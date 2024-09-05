import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { BsBookmarkHeart } from "react-icons/bs";
import { LuClipboardX, LuClipboardCheck } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../AuthStore/Auth";
import axios from "axios";
import toast from "react-hot-toast";
function Sidebar() {
  const dispatch = useDispatch()
  const history= useNavigate()
  const data = [
    {
      title: "All Tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Tasks",
      icon: <BsBookmarkHeart />,
      link: "/importanttasks",
    },
    {
      title: "Completed Tasks",
      icon: <LuClipboardCheck />,
      link: "/completedtasks",
    },
    {
      title: "Incomplete Tasks",
      icon: <LuClipboardX />,
      link: "/incompletedtasks",
    },
  ];

  const logout = ()=>{
    dispatch(authAction.logout())
    localStorage.removeItem("id")
    localStorage.removeItem("token")
    toast.success("Logged out successfully")
      history('/login')


  }
  const [Data, setData] = useState({}); // Initialize as an empty object

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          authorization: `Bearer ${token}`,
        };

        const response = await axios.get('http://localhost:4001/task/getalltasks', { headers });
        
        // Assuming response.data has { username, email, tasks }
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetch();
  }, []);
  return (
    <>
      <div>
        {Data&&(
        <div className="text-center">
          <h2 className="text-xl text-gray-500">{Data.username}</h2>
          <h3 className="text-gray-500 my-1">{Data.email}</h3>
          <hr />
        </div>
        )}
        <div>
          {data.map((item, i) => (
            <NavLink
              to={item.link}
              key={i}
              className={({ isActive }) =>
                `flex items-center gap-2 my-2 cursor-pointer p-2 duration-200 ${
                  isActive
                    ? "bg-gray-400 text-gray-700 rounded-md"
                    : "text-gray-400 hover:text-gray-500 hover:scale-110"
                }`
              }
            >
              <span> {item.icon}</span> {item.title}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <button className="bg-red-600 w-full p-2 rounded hover:bg-red-800 duration-300"
        onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default Sidebar;
