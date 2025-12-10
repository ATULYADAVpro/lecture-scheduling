import User from "../models/User.js";

const userController = {
    async addUser(req, res) {
        const { email, password, role } = req.body;
        try {
            const userExist = await User.findOne({ email })
            if (userExist) {
                return res.status(400).json({ message: "Already exist", success: false })
            }

            const user = new User({
                email,
                password,
                role
            })

            await user.save()

            res.status(201).json({ message: "user add success", success: true, user })

        } catch (error) {
            console.log(error.message)
        }
    },

    async getAllInstructor(req, res) {
        try {
            const user = await User.find({})
            if (!user) {
                return res.status(404).json({ message: "User not found", success: false })
            }

            res.status(200).json({ message: "All user fatch", success: true, user })
        } catch (error) {

        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "All fields are required.",
                    success: false
                });
            }
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({
                    message: "User not found.",
                    success: false
                });
            }

            if (password !== user.password) {
                return res.status(401).json({
                    message: "Incorrect email or password.",
                    success: false
                });
            }
            return res.status(200).json({
                message: "Login successful.",
                success: true,
                user
            });

        } catch (error) {
            console.log(error.message);
            return res.status(500).json({
                message: "Server error",
                success: false
            });
        }
    }

}

export default userController