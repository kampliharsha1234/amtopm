'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    // Auto sign in after sign up
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    router.push('/account')
    router.refresh()
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-[#E8DFD3]">
        <h1 className="section-heading text-center">Create Account</h1>
        <p className="body-text-sm text-center text-[#6B6B6B] mt-2">
          Join AM:PM for personalised skincare
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="meta-text block mb-1.5">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="meta-text block mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="meta-text block mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
              placeholder="Min 6 characters"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center body-text-sm text-[#6B6B6B]">
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-[#E85D2C] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}