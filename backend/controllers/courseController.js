import Course from "../models/Course.js";

const courseController = {

    async addCourse(req, res) {
        try {
            const { level, description, image_url, course_name } = req.body;
            if (!level || !description || !image_url || !course_name) {
                return res.status(400).json({ message: "All field required", success: false })
            }

            const course = new Course({
                level,
                description,
                image_url,
                course_name
            })

            await course.save();

            res.status(200).json({ message: "Course add success", success: true, course })

        } catch (error) {
            console.log(error.message)
        }
    },
    async getCourse(req, res) {
        try {
            const course = await Course.find({})
            if (!course) {
                return res.status(200).json({ message: "course are not availabe" })
            }

            res.status(200).json({ message: "Course fetch", success: true, course })

        } catch (error) {

        }
    }

}

export default courseController;