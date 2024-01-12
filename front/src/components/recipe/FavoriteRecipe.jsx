import React from 'react';

const FavoriteRecipe = ({ handleLike, isLiked }) => {
    return (
        <div>
            <h2>Favorite Recipe</h2>
            <p>Some content about the favorite recipe...</p>

            <button className={isLiked ? 'liked' : ''} onClick={handleLike}>
                ❤
            </button>
        </div>
    );
};

export default FavoriteRecipe;