import React from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

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
