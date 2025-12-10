import React, { use, useEffect, useState } from 'react'
import Card from '../components/card/Card'
import { api } from '../contexts/AppContext'
import toast from 'react-hot-toast'

export default function Home() {
    const [course, setCourse] = useState(null)

    async function courseData() {
        try {
            const { data } = await api.get('/course/get')
            if (!data.success) {
                toast.error(data.message)
            }

            toast.success(data.message)
            setCourse(data.course)
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        courseData()
    }, [])

    console.log(course)

    return (
        <div className="m-2 p-2 grid grid-cols-4 gap-2">
            {
                course && course.map((item, i) => (
                    <Card key={i} course_name={item.course_name} description={item.description} image_url={item.image_url} />
                ))
            }
        </div>
    )
}
