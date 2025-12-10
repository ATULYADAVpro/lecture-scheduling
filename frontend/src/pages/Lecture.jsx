import React, { useEffect, useState } from 'react'
import AddLecture from '../components/batchs/AddLecture'
import toast from 'react-hot-toast'
import { data } from 'react-router'
import { api } from '../contexts/AppContext'

export default function Lecture() {
  const [addActive, setAddActive] = useState(false)
  const [lecture, setLecture] = useState(null)

  async function getLectureData() {
    try {
      const { data } = await api.get('/lecture/get')
      if (!data.success) {
        toast.error(data.message);
      }

      toast.success(data.message)
      setLecture(data.lecture)

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

  }

  useEffect(() => {
    getLectureData()
  }, [])

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
              <th className="text-start">Courses</th>
              <th className="text-start">Batches | Lecture</th>
              <th className="text-start">Date</th>
              <th className="text-start">Instructors</th>
            </tr>
          </thead>
          <tbody>
            {lecture && lecture.map((item, i) => (
              <tr key={i}>
                <td>{item.course.course_name}</td>
                <td>{item.topic}</td>
                <td>{item.date}</td>
                <td>{item.instructor.email}</td>
              </tr>
            ))

            }
          </tbody>
        </table>
      )}

      {addActive && <AddLecture />}
    </div>
  )
}