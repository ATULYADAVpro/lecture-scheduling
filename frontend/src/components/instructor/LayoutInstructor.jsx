import React from 'react'
import Sidebar from './sidebar'
import { Outlet } from 'react-router'

export default function LayoutInstructor() {
    return (
        <div className='flex bg-gray-100'>
            <Sidebar />
            <div className="bg-white w-full m-2 p-2 ">
          
                <Outlet />
            </div>
        </div>
    )
}
