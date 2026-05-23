'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTaskById, updateTask, deleteTask } from '../../lib/api';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger la tâche au montage de la page
  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(taskId);
      setTask(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    const updated = await updateTask(task.id, { completed: !task.completed });
    setTask(updated);
  };

  const handleDelete = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      await deleteTask(task.id);
      router.push('/');
    }
  };

  // États de chargement et d'erreur
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 p-10 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Tâche introuvable</h2>
          <p className="opacity-60 mb-6">Cette tâche n&apos;existe pas ou a été supprimée.</p>
          <Link href="/" className="btn btn-primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-2xl mx-auto px-4">

        {/* Bouton retour */}
        <Link href="/" className="btn btn-ghost mb-6 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la liste
        </Link>

        {/* Carte principale */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            {/* Badge statut */}
            <div className="flex items-center gap-2 mb-2">
              {task.completed ? (
                <div className="badge badge-success gap-1">✓ Accomplie</div>
              ) : (
                <div className="badge badge-warning gap-1">⏳ En cours</div>
              )}
              <div className="badge badge-ghost">ID #{task.id}</div>
            </div>

            {/* Titre */}
            <h1 className={`text-4xl font-bold mb-4 ${task.completed ? 'line-through opacity-50' : ''}`}>
              {task.title}
            </h1>

            {/* Métadonnées */}
            <div className="divider"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="opacity-50 mb-1">Date de création</p>
                <p className="font-medium">
                  {new Date(task.created_at).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="opacity-50 mb-1">Statut</p>
                <p className="font-medium">
                  {task.completed ? 'Terminée' : 'À faire'}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Actions */}
            <div className="card-actions justify-end gap-2 flex-wrap">
              <button
                onClick={handleToggle}
                className={`btn ${task.completed ? 'btn-warning' : 'btn-success'}`}
              >
                {task.completed ? 'Marquer comme à faire' : 'Marquer comme accomplie'}
              </button>
              <Link href={`/tasks/${task.id}/edit`} className="btn btn-primary">
                Modifier
              </Link>
              <button onClick={handleDelete} className="btn btn-error">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}