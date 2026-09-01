import bcrypt from "bcrypt";
import User from "../models/User.model.js";

export const register=async(req, res)=>{
    const { name, email, password } = req.body;

    try{
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required!"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address!"
            });
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and should contain both letters and numbers!"
            });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully.",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }

    catch(error){
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create account!"
        });
    }
}