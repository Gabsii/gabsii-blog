'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error details for debugging
    console.error('[Error Boundary] Caught error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      name: error.name,
      cause: error.cause,
    })
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-muted mb-4">
          An error occurred while loading this page.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 rounded text-left text-sm overflow-auto">
            <p className="font-mono text-red-600 dark:text-red-400">
              {error.message}
            </p>
            {error.digest && (
              <p className="font-mono text-red-500 dark:text-red-500 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}
        {error.digest && process.env.NODE_ENV === 'production' && (
          <p className="text-sm text-muted mb-4">
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-primary text-secondary rounded hover:opacity-80 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
