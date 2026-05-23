const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tasksRoutes = require('./src/routes/tasksRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares (les "filtres" qui s'appliquent à toutes les requêtes)
app.use(cors());           // Autorise le front à appeler le back
app.use(express.json());   // Permet de lire les JSON envoyés par le front

// Routes
app.use('/tasks', tasksRoutes);

// Route de test (pour vérifier que le serveur tourne)
app.get('/', (req, res) => {
  res.json({ message: 'API To-Do en marche ! 🚀' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});