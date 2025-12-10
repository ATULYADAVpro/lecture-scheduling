import React from 'react'
import Sidebar from './sidebar.jsx'
import { Outlet } from 'react-router'

export default function Layout() {
    return (
        <div className='flex bg-gray-100'>
            <Sidebar />
            <div className="bg-white w-full m-2 ">
          
                <Outlet />
            </div>
        </div>
    )
}
