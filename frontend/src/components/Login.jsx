import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { api, useAppContext } from '../contexts/AppContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useAppContext();

    async function login(e) {
        e.preventDefault();

        try {
            const { data } = await api.post('/user/login', { email, password });

            if (!data.success) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);
            setUser(data.user);

            if (data.user.role === "admin") {
                navigate('/admin');
            } else if (data.user.role === "instructor") {
                navigate('/instruct');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <div className="flex items-center justify-center border h-screen">
            <form 
                onSubmit={login}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white"
            >
                <p className="text-2xl font-medium m-auto">
                    <span className="text-indigo-500">User</span> login
                </p>

                <div className="w-full ">
                    <p>Email</p>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} 
                        placeholder="type here" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" 
                        type="email" 
                        required 
                    />
                </div>

                <div className="w-full ">
                    <p>Password</p>
                    <input 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        placeholder="type here" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" 
                        type="password" 
                        required 
                    />
                </div>

                <button 
                    type="submit"
                    className="bg-gray-500 hover:bg-gray-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
