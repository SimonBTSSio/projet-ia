const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TodoItem = sequelize.define('TodoItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  todoListId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'TodoList',
      key: 'id',
    },
  },
}, {
  tableName: 'TodoItem',
});

module.exports = TodoItem;
