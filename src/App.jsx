import { useEffect, useState } from 'react'
import { getTasks, addTask } from './api'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await getTasks()
        setTasks(data)
      } catch (e) {
        setError(e.message || 'Error loading tasks')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const t = await addTask(title.trim())
      setTasks(prev => [...prev, t])
      setTitle('')
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'system-ui, Arial' }}>
      <h1>Task Manager</h1>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 8 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title..."
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '10px 16px', fontSize: 16 }}>
          Add
        </button>
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>{error}</p>
      ) : (
        <ul style={{ marginTop: 20, paddingLeft: 20 }}>
          {tasks.map(t => (
            <li key={t.id}>
              {t.completed ? '✅' : '⬜️'} {t.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
