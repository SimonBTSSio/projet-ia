const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require("./recipe.model");
const User = require("./user.model");

const RecipeUser = sequelize.define('RecipeUser', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recette_id: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
}, {
    tableName: 'RecipeUser',
});

RecipeUser.belongsTo(Recipe, {
    foreignKey: 'recette_id',
});

RecipeUser.belongsTo(User, {
    foreignKey: 'author',
});

module.exports = RecipeUser;