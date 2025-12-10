import { Schema, model } from 'mongoose'

const lectureSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  topic: { type: String }
}, { timestamps: true });


export default model("Lecture", lectureSchema);
