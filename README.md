# TaskFlow

Application web de gestion de tâches développée selon une architecture full-stack avec séparation stricte front/back.

## Architecture

L'application suit une architecture trois tiers classique :

- Une interface utilisateur (frontend) qui consomme une API REST
- Une API REST (backend) qui expose les opérations CRUD sur les tâches
- Une base de données relationnelle qui assure la persistance

```
Client (Next.js, port 3000)
    │
    │  HTTP / JSON
    ▼
API REST (Express, port 3001)
    │
    │  SQL
    ▼
PostgreSQL (port 5432)
```

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS, DaisyUI |
| Backend | Node.js, Express 4, pg (driver PostgreSQL) |
| Base de données | PostgreSQL 15 |
| Outils | Postman (tests d'API), Git, npm |

## Structure du projet

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── routes/             Définition des endpoints REST
│   │   │   └── tasksRoutes.js
│   │   ├── controllers/        Logique métier et requêtes SQL
│   │   │   └── tasksController.js
│   │   └── db/                 Pool de connexions PostgreSQL
│   │       └── index.js
│   ├── server.js               Point d'entrée du serveur Express
│   ├── .env                    Variables d'environnement (non versionné)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/     Composants React réutilisables
│   │       │   ├── TaskItem.js
│   │       │   ├── AddTaskForm.js
│   │       │   └── ThemeSwitcher.js
│   │       ├── lib/            Couche d'accès à l'API
│   │       │   └── api.js
│   │       ├── layout.js       Layout racine
│   │       ├── page.js         Page principale
│   │       └── globals.css     Styles globaux et configuration DaisyUI
│   └── package.json
│
├── .gitignore
└── README.md
```

## Prérequis

- Node.js version 20 ou supérieure
- PostgreSQL version 15 ou supérieure
- npm

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/todo-app.git
cd todo-app
```

### 2. Configurer la base de données

Se connecter à PostgreSQL et exécuter :

```sql
CREATE DATABASE todo_db;
\c todo_db

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configurer le backend

```bash
cd backend
npm install
```

Créer un fichier `.env` à la racine du dossier `backend/` en se basant sur `.env.example` :

```env
PORT=3001
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db
```

Démarrer le serveur en mode développement :

```bash
npm run dev
```

Le backend est accessible sur `http://localhost:3001`.

### 4. Configurer le frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Le frontend est accessible sur `http://localhost:3000`.

## API REST

L'API expose quatre endpoints suivant les conventions REST :

| Méthode | Endpoint     | Description                      | Corps de la requête          |
|---------|--------------|----------------------------------|------------------------------|
| GET     | `/tasks`     | Récupère toutes les tâches       | -                            |
| POST    | `/tasks`     | Crée une nouvelle tâche          | `{ "title": "string" }`      |
| PUT     | `/tasks/:id` | Met à jour une tâche existante   | `{ "completed": boolean }`   |
| DELETE  | `/tasks/:id` | Supprime une tâche               | -                            |

### Exemple de réponse

```json
{
  "id": 1,
  "title": "Préparer la présentation",
  "completed": false,
  "created_at": "2026-05-23T10:30:00.000Z"
}
```

### Codes de retour

| Code | Signification                          |
|------|----------------------------------------|
| 200  | Requête traitée avec succès            |
| 201  | Ressource créée                        |
| 404  | Ressource non trouvée                  |
| 500  | Erreur interne du serveur              |

## Fonctionnalités

- Création, lecture, modification et suppression de tâches (CRUD complet)
- Marquage des tâches comme accomplies via une case à cocher
- Affichage de la progression globale en pourcentage
- Sélecteur de thème dynamique proposant plus de trente apparences (DaisyUI)
- Persistance du thème sélectionné dans le `localStorage` du navigateur
- Interface responsive adaptée aux écrans mobiles et de bureau

## Choix techniques

### Séparation front/back

Les deux applications sont totalement indépendantes et communiquent uniquement via HTTP. Cette séparation permet de faire évoluer chaque couche indépendamment et facilite un éventuel remplacement du client (par exemple par une application mobile).

### Requêtes SQL paramétrées

Toutes les requêtes SQL utilisent le système de paramètres de la bibliothèque `pg` (`$1`, `$2`, etc.) afin de prévenir les injections SQL.

### Pool de connexions

Le module `pg.Pool` est utilisé plutôt que des connexions individuelles afin d'optimiser les performances et la gestion des ressources.

### Variables d'environnement

Les informations sensibles (identifiants de la base de données) sont externalisées dans un fichier `.env` non versionné. Un fichier `.env.example` documente les variables nécessaires.

### Architecture par responsabilités

Le backend respecte une séparation claire entre routes (acheminement des requêtes) et controllers (logique métier et accès aux données), facilitant la maintenance et les tests.

## Améliorations envisagées

- Édition du titre d'une tâche existante
- Filtres (toutes les tâches, en cours, accomplies)
- Authentification des utilisateurs
- Tests unitaires et d'intégration
- Déploiement (Vercel pour le frontend, Render ou Railway pour le backend)
- Validation des entrées avec une bibliothèque dédiée (Zod, Joi)

## Auteur

Projet réalisé dans le cadre d'un stage de découverte du développement web full-stack.