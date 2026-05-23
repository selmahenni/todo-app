'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getTaskById, updateTask } from '../../../lib/api';

export default function EditTaskPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id;

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Charger la tâche au montage
  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      const data = await getTaskById(taskId);
      setTitle(data.title);
      setCompleted(data.completed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === '') return;

    try {
      setSaving(true);
      await updateTask(taskId, { title, completed });
      router.push(`/tasks/${taskId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card bg-base-100 p-10 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold mb-2">Erreur</h2>
          <p className="opacity-60 mb-6">{error}</p>
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
        <Link href={`/tasks/${taskId}`} className="btn btn-ghost mb-6 gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour au détail
        </Link>

        {/* Formulaire d'édition */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-2">Modifier la tâche</h1>
            <p className="opacity-60 mb-6">Tâche #{taskId}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Champ titre */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Titre de la tâche</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full text-lg"
                  placeholder="Que veux-tu accomplir ?"
                  required
                />
              </div>

              {/* Statut */}
              <div>
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text font-medium">
                    Marquer comme accomplie
                  </span>
                </label>
              </div>

              {/* Boutons */}
              <div className="card-actions justify-end gap-2 pt-4">
                <Link href={`/tasks/${taskId}`} className="btn btn-ghost">
                  Annuler
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving || title.trim() === ''}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Enregistrement...
                    </>
                  ) : (
                    'Enregistrer les modifications'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}