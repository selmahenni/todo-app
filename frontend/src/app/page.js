'use client';

import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './lib/api';
import TaskItem from './components/TaskItem';
import AddTaskForm from './components/AddTaskForm';
import ThemeSwitcher from './components/ThemeSwitcher';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    const newTask = await createTask(title);
    setTasks([newTask, ...tasks]);
  };

  const handleToggle = async (id, completed) => {
    const updated = await updateTask(id, { completed });
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Calculs pour les stats
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-base-200">
      
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-20 px-4">
        <div className="flex-1">
          <span className="text-xl font-bold">
            ✨ TaskFlow
          </span>
        </div>
        <div className="flex-none">
          <ThemeSwitcher />
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        
        {/* Header avec titre + stats */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mes tâches
          </h1>
          <p className="text-base-content/60">
            {totalCount === 0
              ? "Commence par ajouter ta première tâche 👇"
              : `${completedCount} / ${totalCount} accomplies`}
          </p>

          {/* Barre de progression */}
          {totalCount > 0 && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex justify-between text-xs mb-2 opacity-60">
                <span>Progression</span>
                <span className="font-bold">{progressPercent}%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={progressPercent}
                max="100"
              ></progress>
            </div>
          )}
        </div>

        {/* Formulaire */}
        <AddTaskForm onAdd={handleAdd} />

        {/* Liste des tâches */}
        {loading ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="card bg-base-100 p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg opacity-60">
              Aucune tâche pour l'instant
            </p>
            <p className="text-sm opacity-40 mt-2">
              Ta liste est aussi vide qu'un lundi matin
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}