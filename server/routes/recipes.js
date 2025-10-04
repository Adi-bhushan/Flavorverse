import express from 'express';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all recipes
router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.status(201).json(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Save a recipe to a user's favorites
router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get IDs of saved recipes for a user
router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get full saved recipe objects for a user
router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get recipes created by a specific user
router.get("/createdRecipes/:userID", async (req, res) => {
    try {
        const recipes = await RecipeModel.find({ userOwner: req.params.userID });
        res.json(recipes);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a recipe
router.delete("/:recipeID", verifyToken, async (req, res) => {
    try {
        const result = await RecipeModel.findByIdAndDelete(req.params.recipeID);
        
        if (!result) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export { router as recipesRouter };