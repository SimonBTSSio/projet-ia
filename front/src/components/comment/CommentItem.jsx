import React from 'react';

const CommentItem = ({ comment, rating, author, handleDelete, handleUpdate }) => {

    const userId = localStorage.getItem('userId');

    return (
        <div className="comment-item">
            <p><strong>Rating:</strong> {rating}</p>
            <p><strong>Commentaire:</strong> {comment}</p>
            {
                author == userId ?
                    <div>
                        <button onClick={handleDelete}>Supprimer</button>
                    </div>
                    : <p>hahaha</p>
            }
        </div>
    );
};

export default CommentItem;
