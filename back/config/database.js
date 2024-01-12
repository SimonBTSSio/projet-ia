const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

try {
  sequelize.authenticate();
  console.log('Connexion à la base de données établie avec succès.');
} catch (error) {
  console.error('Erreur de connexion à la base de données:', error);
}

module.exports = sequelize;