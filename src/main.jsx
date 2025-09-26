import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

function Root() {
  try {
    return <App />
  } catch (err) {
    return (
      <div style={{ padding: '1rem', fontFamily: 'sans-serif', color: 'red' }}>
        <h2>⚠️ Error saat render</h2>
        <pre>{String(err)}</pre>
      </div>
    )
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
