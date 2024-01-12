import React from 'react';

const FavoriteRecipe = ({ handleLike, isLiked }) => {
    return (
        <div>
            <button className={isLiked ? 'liked' : ''} onClick={handleLike}>
                ❤
            </button>
        </div>
    );
};

export default FavoriteRecipe;