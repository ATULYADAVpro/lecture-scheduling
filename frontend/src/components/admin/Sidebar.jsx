import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { House, Wallpaper, FileVideoCamera, Video, LogOut } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { useAppContext } from '../../contexts/AppContext'

export default function Sidebar() {
  const { user, setUser } = useAppContext()
  const navigate = useNavigate()

  function Logout() {
    setUser(null)
    navigate('/')

  }

  return (
    <div className="bg-white shadow-xl w-70 h-screen">
      <div className="w-full mt-5 flex flex-col items-center justify-center">
        <img className="w-20" src={assets.profile} alt="Profile" />
        <h3>User Name</h3>
      </div>

      <hr className="m-2 text-gray-300" />
      <ul className="m-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `p-2 my-2 flex rounded hover:bg-gray-600 hover:text-white ${isActive ? 'bg-gray-600 text-white' : ''
            }`
          }
        >
          <House className="px-0.5 mx-1" /> Home
        </NavLink>

        <NavLink
          to="/course"
          className={({ isActive }) =>
            `p-2 my-2 flex rounded hover:bg-gray-600 hover:text-white ${isActive ? 'bg-gray-600 text-white' : ''
            }`
          }
        >
          <Wallpaper className="px-0.5 mx-1" /> Course
        </NavLink>

        <NavLink
          to="/lecture"
          className={({ isActive }) =>
            `p-2 my-2 flex rounded hover:bg-gray-600 hover:text-white ${isActive ? 'bg-gray-600 text-white' : ''
            }`
          }
        >
          <FileVideoCamera className="px-0.5 mx-1" /> Lecture
        </NavLink>

        <NavLink
          to="/instructor"
          className={({ isActive }) =>
            `p-2 my-2 flex rounded hover:bg-gray-600 hover:text-white ${isActive ? 'bg-gray-600 text-white' : ''
            }`
          }
        >
          <Video className="px-0.5 mx-1" /> Instructors
        </NavLink>
      </ul>

      <hr className="mt-10 text-gray-300" />

      {/* Logout */}
      <ul className="mt-12 m-2">
        <li onClick={Logout} className="p-2 my-2 flex cursor-pointer hover:bg-gray-600 hover:text-white rounded">
          <LogOut  className="px-0.5 mx-1" /> Logout
        </li>
      </ul>
    </div>
  )
}