'use client'

import { useEffect } from 'react'

interface CardsErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function CardsError({ error, reset }: CardsErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Cards error:', error)
  }, [error])

  return (
    <div className="py-8 text-center">
      <h2 className="text-lg font-semibold text-gray-900">Something went wrong!</h2>
      <p className="mt-2 text-red-500">Error loading cards: {error.message}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  )
}
