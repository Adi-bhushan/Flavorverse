import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);