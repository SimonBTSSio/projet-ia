import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    const [commentList, setCommentList] = useState(comments);

    useEffect(() => {
        setCommentList(comments);
    }, [comments]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://195.35.29.110:3000/api/comments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setCommentList(commentList.filter(comment => comment.id !== id));
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="comment-list">
            <h2>Liste des commentaires</h2>
            {commentList.length ? (
                commentList.map((comment, index) => (
                    <CommentItem
                        key={comment.id} // Utiliser une clé unique pour chaque commentaire
                        comment={comment.comment}
                        rating={comment.rating}
                        author={comment.author}
                        handleDelete={() => handleDelete(comment.id)}
                    />
                ))
            ) : (
                <p>Aucun commentaire disponible</p>
            )}
        </div>
    );
};

export default CommentList;
