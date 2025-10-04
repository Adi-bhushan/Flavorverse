import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../../hooks/useGetUserID';
import { useCookies } from 'react-cookie';
import apiClient from '../../api/axiosConfig';

export const Profile = () => {
    const [createdRecipes, setCreatedRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();
    const [cookies] = useCookies(["access_token"]);

    useEffect(() => {
        const fetchCreatedRecipes = async () => {
            try {
                const response = await apiClient.get(`/recipes/createdRecipes/${userID}`);
                setCreatedRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        
        const fetchSavedRecipes = async () => {
            try {
                const response = await apiClient.get(`/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };

        if (userID) {
            fetchCreatedRecipes();
            fetchSavedRecipes();
        }
    }, [userID]);

    const deleteRecipe = async (recipeID) => {
        if (window.confirm("Are you sure you want to delete this recipe?")) {
            try {
                await apiClient.delete(`/recipes/${recipeID}`, {
                    headers: { authorization: cookies.access_token },
                });
                setCreatedRecipes(createdRecipes.filter((recipe) => recipe._id !== recipeID));
                alert("Recipe deleted successfully!");
            } catch (err) {
                console.error(err);
                alert("Failed to delete recipe.");
            }
        }
    };

    return (
        <div className="profile-page">
            <h1>Your Profile</h1>
            <div className="profile-section">
                <h2>Recipes You've Created</h2>
                {createdRecipes.length === 0 ? <p>You haven't created any recipes yet.</p> : (
                    <ul className="recipe-list">
                        {createdRecipes.map((recipe) => (
                             <li key={recipe._id} className="recipe-card-small">
                                 <div className="card-header">
                                     <h3>{recipe.title}</h3>
                                     <button className="delete-button" onClick={() => deleteRecipe(recipe._id)}>
                                         Delete
                                     </button>
                                 </div>
                                 <img src={recipe.imageUrl} alt={recipe.title} />
                             </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="profile-section">
                <h2>Your Saved Recipes</h2>
                {savedRecipes.length === 0 ? <p>You have no saved recipes.</p> : (
                     <ul className="recipe-list">
                        {savedRecipes.map((recipe) => (
                             <li key={recipe._id} className="recipe-card-small">
                                <h3>{recipe.title}</h3>
                                <img src={recipe.imageUrl} alt={recipe.title} />
                             </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};