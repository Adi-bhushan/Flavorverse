import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import { userRouter } from './routes/users.js';
import { recipesRouter } from './routes/recipes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // To parse JSON from request bodies
app.use(cors()); // To allow requests from our frontend

// Mount routers
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}!`));