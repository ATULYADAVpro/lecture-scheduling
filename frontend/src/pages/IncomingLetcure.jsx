import React, { useEffect, useState } from 'react'
import { api, useAppContext } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export default function IncomingLetcure() {

    const [lecture, setLecture] = useState(null);
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);

    const { user } = useAppContext();

    async function getLectureData() {
        try {
            const { data } = await api.get(`/lecture/${user._id}`);

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            setLecture(data.lecture);

        } catch (error) {
           toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getLectureData();
    }, []);

    function filterData(list) {
        if (!list) return;

        const today = new Date();

        const upcomingLectures = list.filter(item =>
            new Date(item.date) > today
        );

        const pastLectures = list.filter(item =>
            new Date(item.date) < today
        );

        setUpcoming(upcomingLectures);
        setPast(pastLectures);
    }

    useEffect(() => {
        filterData(lecture);
    }, [lecture]);



    return (
        <div className='border border-gray-300 h-full p-2'>


            <div className="my-5">
                <h1 className=''>Coming lecture</h1>
                <table className="w-full table-auto border-collapse border">
                    <thead>
                        <tr className='p-2 m-2'>
                            <th className="text-start">Courses</th>
                            <th className="text-start">Batches | Lectures</th>
                            <th className="text-start">Date</th>
                            <th className="text-start">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {upcoming.map((item, i) => (
                            <tr key={i}>
                                <td>{item.course.course_name}</td>
                                <td>{item.topic}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>
                                    <button className='bg-green-300 p-1 rounded'>Upcoming</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            <div className="my-5">
                <h1 className=''>Past lecture</h1>
                <table className="w-full table-auto border-collapse border">
                    <thead>
                        <tr className='p-2 m-2'>
                            <th className="text-start">Courses</th>
                            <th className="text-start">Batches | Lectures</th>
                            <th className="text-start">Date</th>
                            <th className="text-start">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {past.map((item, i) => (
                            <tr key={i}>
                                <td>{item.course.course_name}</td>
                                <td>{item.topic}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>
                                    <button className='bg-gray-300 p-1 rounded'>Completed</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    )
}
