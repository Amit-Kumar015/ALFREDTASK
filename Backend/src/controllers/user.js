import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        // const newUser = new User({ username, email, password: hashedPassword });
        // await newUser.save();
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        // Generate JWT Token
        const token = jwt.sign(
            { userId: newUser._id.toString() },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        return res
            .status(201)
            .json({ message: "Signup successful", token });
    } catch (error) {
        console.error("Signup failed")
        return res
            .status(500)
            .json({ error: "Signup failed" })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ error: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(401)
                .json({ error: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        return res
            .status(200)
            .json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login failed")
        return res
            .status(500)
            .json({ error: "Login failed" })
    }
};

export { signup, login }
