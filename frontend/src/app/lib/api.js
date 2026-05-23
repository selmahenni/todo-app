// L'URL de notre backend Express
const API_URL = 'http://localhost:3001/tasks';

// 1. READ - Récupérer toutes les tâches
export async function getTasks() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erreur lors de la récupération');
  return res.json();
}

// 2. CREATE - Créer une tâche
export async function createTask(title) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) throw new Error('Erreur lors de la création');
  return res.json();
}

// 3. UPDATE - Modifier une tâche
export async function updateTask(id, updates) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Erreur lors de la modification');
  return res.json();
}

// 4. DELETE - Supprimer une tâche
export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erreur lors de la suppression');
  return res.json();
}