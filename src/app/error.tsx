'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
          <h1 style={{ fontSize: '3rem', fontWeight: '700', marginBottom: '1rem' }}>Something went wrong!</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '400px' }}>
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              border: 'none',
              padding: '0.875rem 2rem',
              borderRadius: '100px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}