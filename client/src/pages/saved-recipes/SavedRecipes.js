import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import apiClient from '../../api/axiosConfig';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await apiClient.get(`/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        if(userID) {
            fetchSavedRecipes();
        }
    }, [userID]);

    return (
        <div className="container">
            <h1>Saved Recipes</h1>
            {savedRecipes.length === 0 ? <p>You have no saved recipes.</p> : (
                <ul className="recipe-list">
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id} className="recipe-card">
                            <div>
                                <h2>{recipe.title}</h2>
                            </div>
                            <p><strong>Description:</strong> {recipe.description}</p>
                            <img src={recipe.imageUrl} alt={recipe.title} />
                            <div className="instructions">
                                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};