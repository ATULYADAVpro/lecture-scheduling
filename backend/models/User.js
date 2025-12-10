import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "instructor"], default: "instructor" }
});

export default model("User", userSchema);
