import React from 'react';
import { Link,  useNavigate } from 'react-router-dom'; // Import Link if using React Router for navigation
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import axios from 'axios'
import {authAction} from "../AuthStore/Auth"
import { useDispatch } from 'react-redux';
function Login() {
const dispatch = useDispatch()
const history = useNavigate()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
const userInfo = {
email:data.email,
password:data.password
}

await axios.post('http://localhost:4001/user/login', userInfo)
.then((res)=>{
console.log(res.data)
if(res.data){
toast.success('Loggedin Successfully!');

localStorage.setItem('id',res.data.user.id)
localStorage.setItem('token',res.data.token)
dispatch(authAction.login())
history('/')
}
}).catch((err)=>{
if(err.response){
console.log(err)
toast.error("Error: "+err.response.data.message)
}
})
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 p-2 rounded w-full"
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
            className="border border-gray-300 p-2 rounded w-full"
            {...register("password", { required: true })}

            
          />
                    {errors.password && <span className='text-sm  text-red-950'>This field is required</span>}

          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-100">Don't have an account?</p>
          <Link
            to="/signup" // Adjust the path according to your route setup
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </div>
        <button>Continue with Google</button>
      </div>
    </div>
  );
}

export default Login;
