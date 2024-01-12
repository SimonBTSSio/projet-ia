const TodoItem = require('../models/todoItem.model');

// Créer un nouvel élément Todo
async function createTodoItem(req, res) {
  try {
    const { name, isCompleted, todoListId } = req.body;
    const newTodoItem = await TodoItem.create({ name, isCompleted, todoListId });
    res.status(201).json(newTodoItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer tous les éléments Todo
async function getAllTodoItems(req, res) {
  try {
    const todoItems = await TodoItem.findAll();
    res.status(200).json(todoItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Récupérer un élément Todo par ID
async function getTodoItemById(req, res) {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findByPk(id);
    if (!todoItem) {
      return res.status(404).json({ error: 'Élément Todo non trouvé' });
    }
    res.status(200).json(todoItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Mettre à jour un élément Todo
async function updateTodoItem(req, res) {
  try {
    const { id } = req.params;
    const { name, isCompleted } = req.body;

    const todoItem = await TodoItem.findByPk(id);
    if (!todoItem) {
      return res.status(404).json({ error: 'Élément Todo non trouvé' });
    }

    await todoItem.update({ name, isCompleted });
    res.status(200).json({ message: 'Élément Todo mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Supprimer un élément Todo
async function deleteTodoItem(req, res) {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findByPk(id);
    if (!todoItem) {
      return res.status(404).json({ error: 'Élément Todo non trouvé' });
    }
    await todoItem.destroy();
    res.status(200).json({ message: 'Élément Todo supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTodoItemsByListId(req, res) {
  try {
    const { todoListId } = req.params;
    const todoItems = await TodoItem.findAll({
      where: { todoListId }
    });

    res.status(200).json(todoItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTodoItem,
  getAllTodoItems,
  getTodoItemById,
  updateTodoItem,
  deleteTodoItem,
  getTodoItemsByListId
};
