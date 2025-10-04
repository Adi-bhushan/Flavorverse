import React, { useState } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import apiClient from '../../api/axiosConfig';

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [cookies] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        title: "",
        description: "",
        ingredients: [""],
        instructions: "",
        imageUrl: "",
        userOwner: userID,
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    };
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await apiClient.post("/recipes", recipe, {
                headers: { authorization: cookies.access_token },
            });
            alert("Recipe Created!");
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" onChange={handleChange} />

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" onChange={handleChange}></textarea>

                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input
                        key={idx}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(event) => handleIngredientChange(event, idx)}
                    />
                ))}
                <button type="button" onClick={addIngredient}>Add Ingredient</button>

                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />

                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};