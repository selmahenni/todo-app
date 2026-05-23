'use client';

import Link from 'next/link';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="group card bg-base-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-base-300">
      <div className="card-body p-4">
        <div className="flex items-center gap-4">

          {/* Checkbox */}
          <label className="cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-lg"
              checked={task.completed}
              onChange={() => onToggle(task.id, !task.completed)}
            />
          </label>

          {/* Titre + date (CLIQUABLE - mène vers la page détail) */}
          <Link href={`/tasks/${task.id}`} className="flex-1 min-w-0 hover:opacity-80 transition-opacity">
            <p className={`text-base font-medium transition-all ${task.completed ? 'line-through opacity-40' : ''}`}>
              {task.title}
            </p>
            <p className="text-xs opacity-50 mt-1">
              {new Date(task.created_at).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </Link>

          {/* Badge */}
          {task.completed && (
            <div className="badge badge-success badge-sm gap-1">
              ✓ Fait
            </div>
          )}

          {/* Bouton Modifier (visible au hover) */}
          <Link
            href={`/tasks/${task.id}/edit`}
            className="btn btn-ghost btn-sm btn-circle text-primary opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Modifier"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>

          {/* Bouton Supprimer */}
          <button
            onClick={() => onDelete(task.id)}
            className="btn btn-ghost btn-sm btn-circle text-error opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Supprimer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}