'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-lg mx-auto">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="section-heading text-center">Something Went Wrong</h1>
        <p className="body-text mt-3">
          We're sorry, but something went wrong. Please try again or contact support if the issue persists.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/support" className="btn-secondary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}