import React, { useEffect, useState } from 'react'
import { api, useAppContext } from '../../contexts/AppContext'
import toast from 'react-hot-toast';

export default function AddLecture() {
    const { instruct, getAllUser, course, getCourse } = useAppContext();

    const [formData, setFormData] = useState({
        instructor: "",
        course: "",
        topic: "",
        date: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { instructor, course, topic, date } = formData;

        if (!instructor || !course || !topic || !date) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const { data } = await api.post('/lecture/add', formData);

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getAllUser();
        getCourse();
    }, []);

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-100 border p-2 border-gray-400">

                    {/* Instructor */}
                    <select onChange={handleChange} name="instructor" defaultValue="" className='border rounded p-2'>
                        <option value="" disabled>Select instructor</option>
                        {instruct && instruct.map((item, i) => (
                            <option key={i} value={item._id}>{item.email}</option>
                        ))}
                    </select>

                    {/* Course */}
                    <div className="my-3">
                        <select onChange={handleChange} name="course" defaultValue="" className='border rounded p-2 w-full'>
                            <option value="" disabled>Select course</option>
                            {course && course.map((item, i) => (
                                <option key={i} value={item._id}>{item.course_name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Topic */}
                    <div className="my-3">
                        <input 
                            onChange={handleChange}
                            type="text"
                            name="topic"
                            placeholder='Title for lecture'
                            className='border p-2 w-full'
                        />
                    </div>

                    {/* Date */}
                    <div className="">
                        <input 
                            onChange={handleChange}
                            type="date"
                            name="date"
                            className='border p-2 w-full'
                        />
                    </div>

                    <button className='bg-gray-400 hover:bg-gray-600 hover:text-white cursor-pointer rounded my-5 p-2'>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
