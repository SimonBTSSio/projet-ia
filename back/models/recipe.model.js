const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Recipe = sequelize.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    difficulty: {
        type: DataTypes.STRING,
    },
    duration: {
        type: DataTypes.STRING,
    },
    ingredients: {
        type: DataTypes.STRING(1000),
    },
    instructions: {
        type: DataTypes.STRING(1000),
    }
}, {
    tableName: 'Recipe',
});


module.exports = Recipe;