import React from 'react'
import { useState } from 'react'
import { useAppContext } from '../contexts/AppContext';

export default function AddInstructor() {
    const [formData, setFormdata] = useState({
        email: "",
        password: ""
    })

    const { addUser } = useAppContext()

    function handleChange(e) {
        const { name, value } = e.target;

        setFormdata(prev => ({
            ...prev,
            [name]: value
        }));
    }


    // Submit Form
    function handleSubmit(e) {
        e.preventDefault();
        console.log("FINAL DATA:", formData);
        addUser(formData)

    }

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-100 border p-2 border-gray-400">

                    <div className="my-3">
                        <input onChange={handleChange} type="text" name="email" id="email" placeholder='Enter instructor email' className='border p-2 w-full' />
                    </div>

                    <div className="my-3">
                        <input onChange={handleChange} type="text" name="password" id="password" placeholder='password' className='border p-2 w-full' />
                    </div>

                    <button className='bg-gray-400 hover:bg-gray-600 hover:text-white cursor-pointer rounded my-5 p-2'>Submit</button>
                </div>


            </form>
        </div>
    )
}
