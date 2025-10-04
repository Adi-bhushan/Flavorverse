// server/routes/users.js

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/Users.js';

const router = express.Router();

// Register
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
        // This will print the detailed database error to your Render logs
        console.error("REGISTRATION ERROR:", err); 
        res.status(500).json({ message: "An error occurred during registration." });
    }
});

// Login
router.post("/login", async (req, res) => {
    // ... (Login route remains the same)
});

export { router as userRouter };