const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TodoList = sequelize.define('TodoList', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
}, {
  tableName: 'TodoList',
});

TodoList.associate = function(models) {
    TodoList.hasMany(models.TodoItem, {
      foreignKey: 'todoListId',
      as: 'todoItems',
    });
  };

module.exports = TodoList;
