import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SimilarRecipes from '../components/SimilarRecipes';
import AccompanimentSuggester from '../components/AccompanimentSuggester';
import '../style.css';
import RecipeEvaluation from "../components/comment/RecipeEvaluation.jsx";
import CommentList from "../components/comment/CommentList.jsx";
import TabMenu from "../components/recipe/TabMenu.jsx";
import FavoriteRecipe from "../components/recipe/FavoriteRecipe.jsx";
import Navbar from "../home/Navbar.jsx";

export default function Recipe() {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(false);
    const [recipeId, setRecipeId] = useState();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
    const query = new URLSearchParams(location.search);
    const titre = query.get('titre');
    const difficulte = query.get('difficulte');
    const temps = query.get('temps');

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://195.35.29.110:3000/get-recipe?titre=${titre}&difficulte=${difficulte}&temps=${temps}`);
        const data = await response.json();
        const recipeData = JSON.parse(data[0].message.content);
        setRecipeDetails(recipeData);
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error);
      }
    };
    fetchRecipe();
  }, [location]);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: recipeDetails.titre,
          difficulty: recipeDetails.difficulte,
          duration: recipeDetails.temps,
          ingredients: recipeDetails.ingredients,
          instructions: recipeDetails.etapes,
        }),
      });

      const responseData = await response.json();

      const likeResponse = await fetch('http://localhost:3001/api/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              recette_id: responseData.recipe.id,
              author: userId
            }
        )
      });
      setRecipeId(responseData.recipe.id)
      setIsLiked(true)
      console.log('je like', likeResponse);

    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  console.log('isLiked', isLiked)

  const handleUnlike = async (e) => {
    e.preventDefault();
    try {
      console.log('je unlike', recipeId, userId);

      // Vérifiez que recipeId est défini
      if (typeof recipeId === 'undefined') {
        console.error('recipeId est undefined. Veuillez vous assurer qu\'il est correctement défini.');
        return;
      }

      const response = await fetch(`http://localhost:3001/api/users/unlike/${recipeId}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsLiked(false);
        console.log('Unlike réussi.');
      } else {
        console.error('Erreur lors du "unlike".');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  useEffect(() => {
    const fetchLike = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/like/${recipeId}/${userId}`);
        const data = await response.json();

        if (data.likedRecipe) {
          console.log('elle est liké', data.likedRecipe);

          setIsLiked(true)
        } else {
          console.log('elle est pas liké');
          setIsLiked(false)
        }
      }
      catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error);
      }
    }
    fetchLike();

  }, [recipeId, userId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/recipes/name/${encodeURIComponent(recipeDetails.titre)}`);
        const data = await response.json();
        if (data.recipe.id) {
          setRecipeId(data.recipe.id);
          const commentResponse = await fetch(`http://localhost:3001/api/comments/${data.recipe.id}`);
            const commentData = await commentResponse.json();

            setComments(commentData.comments)
        } else {
          console.log("pas de commentaires");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la recette:", error);
      }
    }
    fetchComments();

  }, [recipeDetails]);

  const tabsData = [
    { label: 'Recettes similaires', content: <SimilarRecipes recipeTitle={recipeDetails?.titre} /> },
    { label: 'Commentaires', content:<CommentList comments={comments}/>
    }
  ];

  return (
    <div className="recipe-details">
      <Navbar/>
      {recipeDetails ? (
          <div>
            <h2>{recipeDetails.titre}</h2>
            <p>Difficulté : {recipeDetails.difficulte}</p>
            <p>Temps : {recipeDetails.temps}</p>
            <p>Ingrédients : {recipeDetails.ingredients}</p>
            <p>Étapes : {recipeDetails.etapes}</p>
            <div>
              <RecipeEvaluation recette={recipeDetails}>Evaluer cette recette</RecipeEvaluation>
              <FavoriteRecipe handleLike={isLiked ? handleUnlike : handleLike} isLiked={isLiked}/>
            </div>
          </div>
        ) : (
          <p>Chargement de la recette...</p>
        )}
        {recipeDetails && <TabMenu tabsData={tabsData} />}
        {recipeDetails && <AccompanimentSuggester recipeTitle={recipeDetails.titre} />}
    </div>
  );
}