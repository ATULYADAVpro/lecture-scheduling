import Lecture from "../models/Lecture.js";

const lectureController = {
    async addLecture(req, res) {
        try {
            const { instructor, course, topic, date } = req.body;
            if (!instructor || !course || !topic || !date) {
                return res.status(400).json({ message: "All field are required." })
            }

            const checkClash = await Lecture.findOne({ instructor, date });
            if (checkClash) {
                return res.status(200).json({ message: "This user already have lecture", success: false })
            }

            const newLecture = new Lecture({
                instructor, course, topic, date
            })

            await newLecture.save()

            res.status(200).json({ message: "Lecture created success", success: true })

        } catch (error) {

        }
    },

    async getLecture(req, res) {
        try {
            const lecture = await Lecture.find({}).populate('course instructor')
            console.log(lecture)

            res.json({ message: "Lecture fecth success", success: true, lecture })

        } catch (error) {
            console.log(error.message)
        }
    },

    async getLecturesByid(req, res) {
        try {
            const { id } = req.params;

            const lectures = await Lecture.find({ instructor: id });
            if (lectures.length === 0) {
                return res.status(404).json({
                    message: "No lecture found for this instructor",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Data fetched successfully",
                success: true,
                lecture: lectures
            });

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: "Server Error",
                success: false
            });
        }
    }

}

export default lectureController;