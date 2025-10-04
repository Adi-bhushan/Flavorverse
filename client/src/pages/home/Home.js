import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import apiClient from '../../api/axiosConfig';

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await apiClient.get("/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedRecipes = async () => {
            if (userID) {
                try {
                    const response = await apiClient.get(`/recipes/savedRecipes/ids/${userID}`);
                    setSavedRecipes(response.data.savedRecipes);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchRecipes();
        fetchSavedRecipes();
    }, [userID]);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await apiClient.put("/recipes", {
                recipeID,
                userID,
            }, { headers: { authorization: cookies.access_token }});
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    };
    
    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className="container">
            <h1>Recipes</h1>
            <ul className="recipe-list">
                {recipes.map((recipe) => (
                    <li key={recipe._id} className="recipe-card">
                        <div>
                            <h2>{recipe.title}</h2>
                            <button 
                                className="save-button"
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={!cookies.access_token || isRecipeSaved(recipe._id)}
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
                        </div>
                        <p><strong>Description:</strong> {recipe.description}</p>
                        <img src={recipe.imageUrl} alt={recipe.title} />
                        <div className="instructions">
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                        </div>
                        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};