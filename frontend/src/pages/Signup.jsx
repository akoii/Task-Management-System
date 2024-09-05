import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import axios from 'axios'
import toast from "react-hot-toast";
import {  useSelector } from "react-redux";
function Signup() {
  const isLoggedIn = useSelector((state)=>{state.auth.isLoggedIn})
  const history = useNavigate()

  if(isLoggedIn===true){
    history('/')
  }
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm()
  
    const onSubmit = async (data) => {
      const userInfo = {
        username: data.username,
        email: data.email,
        password: data.password
      };
    
      try {
        // Perform the POST request to the signup endpoint
        const response = await axios.post("http://localhost:4001/user/signup", userInfo);
    
        // Check if the response data exists and is as expected
        if (response.data && response.data.message) {
          toast.success(response.data.message || "Signup successful!");
        }
      } catch (error) {
        // Log the full error for debugging
        console.error("Signup error:", error);
    
        // Display a user-friendly error message
        toast.error(`Error: ${error.response?.data?.message || "An error occurred"}`);
      }
    };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="border border-gray-300 p-2 rounded  w-full"
            {...register("username", { required: true })}
            />
            <br />
            {errors.username && <span className='text-sm  text-red-950'>This field is required</span>}
      
          </div>
          <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded  w-full"
            {...register("email", { required: true })}
            />
            <br />
            {errors.email && <span className='text-sm  text-red-950'>This field is required</span>}
          
          </div>
          <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-gray-300 p-2 rounded  w-full"
            {...register("password", { required: true })}
            />
            <br />
            {errors.password && <span className='text-sm  text-red-950'>This field is required</span>}
          
          </div>
            <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-100">Already have an account?</p>
          <Link
            to="/login" // Adjust the path according to your route setup
            className="text-blue-500 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
