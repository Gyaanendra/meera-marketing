export default function NotFound() {
  return (
    <html lang="en">
      <body style={{
        background: '#0a0a0f',
        color: '#e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: '4rem', fontWeight: '700', marginBottom: '1rem' }}>404</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '400px' }}>
            The page you're looking for doesn't exist.
          </p>
          <a href="/" style={{
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white',
            padding: '0.875rem 2rem',
            borderRadius: '100px',
            fontSize: '0.95rem',
            fontWeight: '600',
            textDecoration: 'none',
          }}>
            Go Home
          </a>
        </div>
      </body>
    </html>
  )
}