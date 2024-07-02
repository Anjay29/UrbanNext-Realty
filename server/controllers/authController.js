import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwttoken from "jsonwebtoken"

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


const signIn = async (req,res,next) =>{
    try {
        const {username,email,password} = req.body;

        if(!(username || email) || !password){
            return res.status(400).json({"message":"Please enter all details"})
        }

        const existsUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (!existsUser) {
            return res.status(409).json({ "message": "User not found" });
        }

        const verified = bcrypt.compareSync(password, existsUser.password);

        if(!verified){
            return res.status(404).json({"message" : "Wrong credentials"})
        }

        const token = jwttoken.sign({
            id: existsUser._id
        }, process.env.SECRET_KEY)
        
        // console.log("Allright");
        // console.log(token);
        
        const options = {
            httpOnly: true,
            secure: true
        }

        const {password: pass, ...loggedIn} = existsUser._doc
        // const loggedIn = await User.findById(existsUser._id).select("-password");

        return res.status(200).cookie("access_token", token, options).json(loggedIn)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal server error!" });
    }
}

export {auth, signIn};
