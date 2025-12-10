import { createContext, useContext, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";

export const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})


// creating context 
export const AppContext = createContext();

// const [instructs, setInstructs] = useState(null)

export const addUser = async (formData) => {
    try {
        const { data } = await api.post('/user/add', formData);

        console.log(data);

        if (!data.success) {
            toast.error(data.message);
            return;
        }

        toast.success(data.message);
    } catch (error) {
        console.log(error);

        // Axios backend error message hota hai error.response.data.message me
        const message = error?.response?.data?.message || "Something went wrong";

        toast.error(message);
    }
}



// return appContextPRovider
export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        role: '',
        _id: ""
    });

    


    const [instruct, setInstructs] = useState(null)
    const [course, setCourse] = useState(null)


    const getAllUser = async () => {
        const { data } = await api.get('/user/get')
        if (!data.success) {
            toast.error(data.message)
        }

        toast.success(data.success)
        setInstructs(data.user)
    }


    const getCourse = async () => {
        const { data } = await api.get('/course/get')
        if (!data.success) {
            toast.error(data.message)
        }

        toast.success(data.success)
        setCourse(data.course)
    }

    const value = {
        user, setUser, addUser, instruct, getAllUser, getCourse, course
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

// creating custom hook
export const useAppContext = () => {
    return useContext(AppContext)
}
