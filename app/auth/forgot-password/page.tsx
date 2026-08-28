'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Something went wrong.'
        )
      }

      setMessage(data.message)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] px-5 pt-24 pb-16 sm:px-8 sm:pt-28 md:px-12">
      <div className="mx-auto flex w-full max-w-md items-center justify-center">

        <div className="w-full rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm sm:p-8">

          <h1 className="section-heading text-center">
            Forgot Password
          </h1>

          <p className="body-text-sm mt-2 text-center text-[#6B6B6B]">
            Enter your email and we'll send you a
            secure reset link.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="meta-text mb-1.5 block">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[#E8DFD3] bg-[#F7F2EB] px-4 py-3 transition focus:border-[#E85D2C] focus:outline-none"
                placeholder="you@email.com"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            {message && (
              <div className="rounded-xl bg-[#E8F4E8] p-3 text-sm leading-5 text-[#3D7040]">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60"
            >
              {loading
                ? 'Sending...'
                : 'Send Reset Link'}
            </button>
          </form>

          <p className="body-text-sm mt-6 text-center text-[#6B6B6B]">
            Remember your password?{' '}

            <Link
              href="/auth/signin"
              className="text-[#E85D2C] hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </main>
  )
}