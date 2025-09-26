import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

function SafeApp() {
  try {
    return <App />
  } catch (err) {
    return (
      <div style={{ padding: '1rem', fontFamily: 'sans-serif', color: 'red' }}>
        <h2>⚠️ Terjadi error saat render</h2>
        <pre>{String(err)}</pre>
      </div>
    )
  }
}

// Tambah global error handler
window.onerror = (msg, url, line, col, error) => {
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `
      <div style="padding:1rem;font-family:sans-serif;color:red">
        <h2>⚠️ JavaScript Error</h2>
        <p>${msg}</p>
        <pre>${error || ''}</pre>
      </div>
    `
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<SafeApp />)
