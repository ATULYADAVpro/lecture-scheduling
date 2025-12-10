import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { api } from '../contexts/AppContext';

export default function Course() {
  const [formData, setFormData] = useState({
    course_name: "",
    image_url: "",
    description: "",
    level: ""
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

    console.log(formData)
    const { course_name, image_url, description, level } = formData;

    if (!course_name || !image_url || !description || !level) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data } = await api.post('/course/add', formData);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="py-1 flex flex-col justify-between bg-white h-fit">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="course_name">Course Name *</label>
          <input 
            onChange={handleChange}
            id="course_name"
            name="course_name"
            type="text"
            placeholder="e.g., Introduction to Web Development"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="image_url">Image URL *</label>
          <input 
            onChange={handleChange}
            id="image_url"
            name="image_url"
            type="text"
            placeholder="e.g., https://example.com/image.png"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="description">Description</label>
          <textarea 
            onChange={handleChange}
            id="description"
            name="description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="level">Level</label>
          <select 
            onChange={handleChange}
            id="level"
            name="level"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Level</option>
            <option value="beginner">beginner</option>
            <option value="intermediate">intermediate</option>
            <option value="advanced">advanced</option>
          </select>
        </div>

        <button className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded">
          ADD
        </button>
      </form>
    </div>
  );
}
