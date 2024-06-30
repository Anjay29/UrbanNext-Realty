import User from "../models/usermodel.js";
import bcrypt from "bcrypt";

const auth = async (req, res) => {
    try {
        const { username, name, password, email } = req.body;

        if (!name || !password || !email || !username) {
            return res.status(400).json({ "message": "All parameters are required" });
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existedUser) {
            return res.status(409).json({ "message": "Email/Username already exists." });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await User.create({
            username,
            name,
            password: hashedPassword,
            email
        });

        return res.status(201).json({ "message": "Registered successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error" });
    }
};

export default auth;
