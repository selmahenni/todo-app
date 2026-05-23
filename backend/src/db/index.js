const { Pool } = require('pg');
require('dotenv').config();

// Création du "pool" de connexions à PostgreSQL
// Un pool, c'est comme une équipe de serveurs prêts à parler à la DB
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// On exporte le pool pour pouvoir l'utiliser dans les controllers
module.exports = pool;