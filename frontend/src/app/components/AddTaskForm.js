'use client';

import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div
        className={`join w-full shadow-lg rounded-2xl overflow-hidden transition-all ${
          focused ? 'ring-2 ring-primary ring-offset-2 ring-offset-base-200' : ''
        }`}
      >
        <input
          type="text"
          placeholder="Que veux-tu accomplir aujourd'hui ?"
          className="input input-lg join-item flex-1 border-0 focus:outline-none bg-base-100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg join-item px-8"
          disabled={title.trim() === ''}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter
        </button>
      </div>
    </form>
  );
}