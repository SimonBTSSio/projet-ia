const Comment = require('../models/comment.model');

const createComment = async (req, res) => {
  try {
    const { comment, rating, recette_id, author } = req.body;

    // Vérifier si un commentaire existe déjà pour cette recette et cet auteur
    let existingComment = await Comment.findOne({
      where: {
        recette_id: recette_id,
        author: author,
      },
    });

    if (existingComment) {
      // Si un commentaire existe déjà, mettez à jour le commentaire existant
      existingComment.comment = comment;
      existingComment.rating = rating;

      await existingComment.save();

      res.status(200).json({ message: 'Commentaire mis à jour avec succès.', comment: existingComment });
    } else {
      // S'il n'y a pas de commentaire existant, créez un nouveau commentaire
      const newComment = await Comment.create({ comment, rating, recette_id, author });
      res.status(201).json({ message: 'Commentaire créé avec succès.', comment: newComment });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getRecipeComments = async (req, res) => {
  try {
    const { recette_id } = req.params;

    const recipeComments = await Comment.findAll({ where: { recette_id } });

    if (!recipeComments) {
      return res.status(404).json({ message: 'Aucun commentaire trouvé pour cette recette.' });
    }

    res.status(200).json({ comments: recipeComments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserComments = async (req, res) => {
  try {
    const { author } = req.params;

    const userComments = await Comment.findAll({ where: { author } });

    if (!userComments) {
      return res.status(404).json({ message: 'Aucun commentaire trouvé pour cet utilisateur.' });
    }

    res.status(200).json({ comments: userComments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé.' });
    }

    await comment.destroy();

    res.status(204).json({ message: 'Commentaire supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createComment,
  getRecipeComments,
  getUserComments,
  deleteComment,
};