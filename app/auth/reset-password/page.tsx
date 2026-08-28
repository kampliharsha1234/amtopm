'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    if (!token) {
      setError('This reset link is invalid.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.error || 'Unable to reset password.'
        )
      }

      setSuccess(true)
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

  if (success) {
    return (
      <main className="min-h-[calc(100vh-80px)] px-5 pt-24 pb-16 sm:px-8 sm:pt-28 md:px-12">
        <div className="mx-auto flex w-full max-w-md items-center justify-center">

          <div className="w-full rounded-2xl border border-[#E8DFD3] bg-white p-6 text-center shadow-sm sm:p-8">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F4E8]">
              <span className="text-xl">
                ✓
              </span>
            </div>

            <h1 className="section-heading">
              Password Updated
            </h1>

            <p className="body-text-sm mt-3 text-[#6B6B6B]">
              Your password has been
              successfully changed.
            </p>

            <Link
              href="/auth/signin"
              className="btn-primary mt-6 inline-flex w-full justify-center"
            >
              Sign In
            </Link>

          </div>

        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-80px)] px-5 pt-24 pb-16 sm:px-8 sm:pt-28 md:px-12">
      <div className="mx-auto flex w-full max-w-md items-center justify-center">

        <div className="w-full rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm sm:p-8">

          <h1 className="section-heading text-center">
            Create New Password
          </h1>

          <p className="body-text-sm mt-2 text-center text-[#6B6B6B]">
            Choose a new password for
            your AM:PM account.
          </p>

          {!token ? (
            <div className="mt-6">

              <p className="text-center text-sm text-red-500">
                This password reset link is
                invalid or incomplete.
              </p>

              <Link
                href="/auth/forgot-password"
                className="btn-primary mt-6 inline-flex w-full justify-center"
              >
                Request New Link
              </Link>

            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >

              <div>
                <label className="meta-text mb-1.5 block">
                  New Password
                </label>

                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#E8DFD3] bg-[#F7F2EB] px-4 py-3 transition focus:border-[#E85D2C] focus:outline-none"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="meta-text mb-1.5 block">
                  Confirm Password
                </label>

                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#E8DFD3] bg-[#F7F2EB] px-4 py-3 transition focus:border-[#E85D2C] focus:outline-none"
                  placeholder="Enter password again"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading
                  ? 'Updating...'
                  : 'Update Password'}
              </button>

            </form>
          )}

          <p className="body-text-sm mt-6 text-center text-[#6B6B6B]">
            <Link
              href="/auth/signin"
              className="text-[#E85D2C] hover:underline"
            >
              ← Back to Sign In
            </Link>
          </p>

        </div>

      </div>
    </main>
  )
}