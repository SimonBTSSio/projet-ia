import { useState } from 'react';

const RecipeEvaluation = ({recette = null, children}) => {
    const [showForm, setShowForm] = useState(false);
    const [comment, setComment] = useState();
    const [rating, setRating] = useState();
    const [success, setSuccess] = useState('');
    const [error, setError] = useState();
    const userId = localStorage.getItem('userId');

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: recette.titre,
                    difficulty: recette.difficulte,
                    duration: recette.temps,
                    ingredients: recette.ingredients,
                    instructions: recette.etapes,
                }),
            });

            const responseData = await response.json();

            const responseComment = await fetch('http://localhost:3001/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: comment,
                    rating: rating,
                    recette_id: responseData.recipe.id,
                    author: userId
                }),
            });

            const commentData = await responseComment.json();

            if (!response.ok || !responseComment.ok) {
                const errorData = await response.json();
                setSuccess(errorData.error);
                throw new Error(errorData.error);
            }

            setShowForm(false);
            setSuccess(commentData.message);

        } catch (error) {
            setError('Erreur lors de l\'ajout du commentaire: ')
            console.error('Error:', error.message);
        }
    }

    return (
        <div>
            {
                success ? <p className="success">{success}</p> : null
            }
            {
                error ? <p className="error">{error}</p> : null
            }
            <button onClick={handleButtonClick}>{children}</button>
            {showForm && (
                <div className="popup">
                    <form onSubmit={handleSubmit} className="comment-form">
                        <label htmlFor="comment">Commentaire :</label>
                        <textarea
                            id="comment"
                            name="comment"
                            required
                            onChange={event => setComment(event.target.value)}
                        ></textarea>

                        <label htmlFor="rating">Note sur 5 :</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            min="1"
                            max="5"
                            required
                            onChange={event => setRating(event.target.value)}
                        />

                        <div className="form-buttons">
                            <button type="submit" className="submit-btn">Soumettre</button>
                            <button type="button" onClick={handleCloseForm} className="cancel-btn">Annuler</button>
                        </div>
                    </form>

                </div>
            )}
        </div>
    );
};

export default RecipeEvaluation;
