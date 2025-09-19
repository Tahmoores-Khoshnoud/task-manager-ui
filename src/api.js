// UI will call Vite dev server at /tasks and it proxies to the API
const API_BASE = '/tasks';

export async function getTasks() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to load tasks');
  return res.json();
}

export async function addTask(title) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to add task');
  }
  return res.json();
}
