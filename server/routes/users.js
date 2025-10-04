import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/Users.js';

const router = express.Router();

// Register (no changes here, but included for completeness)
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists!" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("REGISTRATION ERROR:", err); 
        res.status(500).json({ message: "An error occurred during registration." });
    }
});

// Login (with detailed logging)
router.post("/login", async (req, res) => {
    try {
        console.log("--- LOGIN ATTEMPT START ---");
        const { username, password } = req.body;

        console.log("1. Searching for user in database...");
        const user = await UserModel.findOne({ username });
        console.log("2. Database search complete.");

        if (!user) {
            console.log("-> User not found.");
            return res.status(400).json({ message: "Invalid username or password" });
        }
        console.log("3. User found. Comparing passwords...");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("4. Password comparison complete.");

        if (!isPasswordValid) {
            console.log("-> Password invalid.");
            return res.status(400).json({ message: "Invalid username or password" });
        }
        console.log("5. Password is valid. Creating JWT...");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("6. JWT created. Sending response.");

        res.json({ token, userID: user._id });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ message: "An error occurred during login." });
    }
});

export { router as userRouter };