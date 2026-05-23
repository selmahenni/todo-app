'use client';

import { useEffect, useState } from 'react';

const THEMES = [
  { name: 'light', emoji: '☀️' },
  { name: 'dark', emoji: '🌙' },
  { name: 'cupcake', emoji: '🧁' },
  { name: 'synthwave', emoji: '🌆' },
  { name: 'dracula', emoji: '🧛' },
  { name: 'retro', emoji: '📺' },
  { name: 'cyberpunk', emoji: '🤖' },
  { name: 'valentine', emoji: '💝' },
  { name: 'aqua', emoji: '🌊' },
  { name: 'forest', emoji: '🌲' },
  { name: 'luxury', emoji: '💎' },
  { name: 'business', emoji: '💼' },
  { name: 'coffee', emoji: '☕' },
  { name: 'night', emoji: '🌌' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  // Au chargement, on récupère le thème sauvegardé
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
        <span className="text-2xl">
          {THEMES.find((t) => t.name === theme)?.emoji}
        </span>
        <span className="hidden sm:inline capitalize">{theme}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box shadow-2xl z-10 mt-2 w-52 p-2 max-h-96 overflow-y-auto"
      >
        {THEMES.map((t) => (
          <li key={t.name}>
            <button
              onClick={() => changeTheme(t.name)}
              className={`flex justify-between ${
                theme === t.name ? 'active' : ''
              }`}
            >
              <span className="capitalize">{t.name}</span>
              <span className="text-xl">{t.emoji}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}