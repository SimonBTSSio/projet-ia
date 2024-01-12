const TodoList = require('../models/todoList.model');

async function createTodoList(req, res) {
  try {
    const { title, userId } = req.body;
    const newTodoList = await TodoList.create({ title, userId });
    res.status(201).json(newTodoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllTodoLists(req, res) {
  try {
    const todoLists = await TodoList.findAll();
    res.status(200).json(todoLists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTodoListById(req, res) {
  try {
    const { id } = req.params;
    const todoList = await TodoList.findByPk(id);
    if (!todoList) {
      return res.status(404).json({ error: 'Liste non trouvée' });
    }
    res.status(200).json(todoList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTodoList(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const todoList = await TodoList.findByPk(id);
    if (!todoList) {
      return res.status(404).json({ error: 'Liste non trouvée' });
    }

    await todoList.update({ title });
    res.status(200).json({ message: 'Liste mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTodoList(req, res) {
  try {
    const { id } = req.params;
    const todoList = await TodoList.findByPk(id);
    if (!todoList) {
      return res.status(404).json({ error: 'Liste non trouvée' });
    }
    await todoList.destroy();
    res.status(200).json({ message: 'Liste supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTodoListsByUser(req, res) {
  try {
    const { userId } = req.params;
    const todoLists = await TodoList.findAll({
      where: { userId: userId }
    });

    res.status(200).json(todoLists);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

module.exports = {
  createTodoList,
  getAllTodoLists,
  getTodoListById,
  updateTodoList,
  deleteTodoList,
  getTodoListsByUser,
};