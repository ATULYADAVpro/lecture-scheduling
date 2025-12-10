import { Schema, model } from 'mongoose'


const courseSchema = new Schema({
    course_name: { type: String, required: true, },
    image_url: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" }
});

export default model("Course", courseSchema);