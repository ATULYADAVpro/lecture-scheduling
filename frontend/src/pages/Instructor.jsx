import { useEffect, useState } from 'react'
import AddInstructor from '../components/AddInstructor'
import { api, useAppContext } from '../contexts/AppContext'
import toast from 'react-hot-toast'

export default function Instructor() {
  const [addActive, setAddActive] = useState(false)
  const { getAllUser, instruct } = useAppContext()

  
  useEffect(() => {
    getAllUser()
  }, [])
  
  console.log(instruct)
  return (
    <div className="m-5">
      <div className="my-10">
        <button
          onClick={() => setAddActive(prev => !prev)}
          className="rounded bg-gray-400 px-2 py-1 hover:bg-gray-600 hover:text-white cursor-pointer"
        >
          {addActive ? "Back to list" : "Add lecture"}
        </button>
      </div>

      {!addActive && (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-start">Email</th>
              <th className="text-start">Role</th>
            </tr>
          </thead>
          <tbody>
            {instruct && instruct.map((item, i) => (
              <tr key={i}>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}

          </tbody>
        </table>
      )}

      {
        addActive && (
          <AddInstructor />
        )
      }
    </div>
  )
}