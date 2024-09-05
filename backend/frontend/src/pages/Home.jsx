import React from 'react'
import Sidebar from '../components/home/Sidebar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
<div className='flex h-[98vh] gap-2'>
    <div className=' w-1/6 border border-gray-700 rounded-xl p-4 flex flex-col justify-between overflow-auto'>
    <Sidebar/>
    </div>
    <div className=' w-5/6 border border-gray-700 rounded-xl p-4 overflow-auto'>
    <Outlet />
    </div>
</div>
)
}

export default Home