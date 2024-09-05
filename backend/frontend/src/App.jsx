import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Alltasks from './pages/Alltasks';
import ImportantTasks from './pages/ImportantTasks';
import InCompletedTasks from './pages/IncompletedTasks';
import CompletedTasks from './pages/CompletedTasks'
import Signup from './pages/Signup';
import Login from './pages/Login';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { authAction } from './AuthStore/Auth';

function App() {

  const history = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state)=>{state.auth.isLoggedIn})
  const navigate = useNavigate()
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
dispatch(authAction.login())
history('/')
    }else if(!isLoggedIn){
      navigate('/signup') }      

  },[])
  
  return (
    <div className="bg-gray-900 h-screen p-1 text-white">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="importanttasks" element={<ImportantTasks />} />
          <Route path="completedtasks" element={<CompletedTasks />} />
          <Route path="incompletedtasks" element={<InCompletedTasks />} />
        </Route>

        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>

      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
