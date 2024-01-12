import Navbar from "../home/Navbar.jsx";
import {useEffect, useState} from "react";

const MyRecipes = () => {

    const userId = localStorage.getItem('userId');
    const [idRecipes, setIdRecipes] = useState([]);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchLikedRecipes = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/like/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const responseData = await response.json();
                setIdRecipes(responseData.likedRecipes.map((recipe) => recipe.recette_id));
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchLikedRecipes();
    }, [userId]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/recipes`);
                const data = await response.json();

                const recipesData = data.recipes.filter((recipe) => idRecipes.includes(recipe.id));
                setRecipes(recipesData);
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
        fetchRecipes();
    }, [idRecipes]);

    return (
        <div>
            <Navbar/>
            <div className="recipe-container">
                {recipes.map((recipe, index) => {
                    const recipeUrl = `/recipe?titre=${encodeURIComponent(recipe.name)}&difficulte=${encodeURIComponent(recipe.difficulty)}&temps=${encodeURIComponent(recipe.duration)}`;
                    return (
                        <a href={recipeUrl} className="recipe-box" key={index}>
                            <h3>{recipe.name}</h3>
                            <p>Difficulté : {recipe.difficulty}</p>
                            <p>Temps : {recipe.duration}</p>
                        </a>
                    );
                })}
            </div>
        </div>
    )
}

export default MyRecipes;