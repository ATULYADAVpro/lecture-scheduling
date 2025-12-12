import { Route, Routes } from "react-router";
import Login from "./components/Login";
import Home from "./pages/Home";
import Course from "./pages/Course";
import Lecture from "./pages/Lecture";
import Instructor from "./pages/Instructor";
import PrivateRoute from "./components/private/PrivateRoutes";
import Unauth from "./pages/Unauth";
import Layout from "./components/admin/Layout";
import LayoutInstructor from "./components/instructor/LayoutInstructor";
import IncomingLetcure from "./pages/IncomingLetcure";
import { Toaster } from 'react-hot-toast'


export default function App() {
  return (

    <>
      <Toaster />
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/unauthorized" element={<Unauth />} />

        <Route path='/admin' element={<PrivateRoute allowedRoles={'admin'}> <Layout /> </PrivateRoute>}>
          <Route index element={<Home />} />
          <Route path="course" element={<Course />} />
          <Route path="lecture" element={<Lecture />} />
          <Route path="instructor" element={<Instructor />} />
        </Route>

        <Route path='/instruct' element={<PrivateRoute allowedRoles={'instructor'}> <LayoutInstructor /> </PrivateRoute>}>
          <Route index element={<IncomingLetcure />} />
        </Route>

      </Routes>
    </>
  )
}