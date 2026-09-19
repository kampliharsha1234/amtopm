import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '../../../../lib/users'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { name, email, password } = body as {
      name?: unknown
      email?: unknown
      password?: unknown
    }

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !password
    ) {
      return NextResponse.json(
        { error: 'Missing fields' },
        { status: 400 }
      )
    }

    if (
      name.trim().length > 100 ||
      email.trim().length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 6 ||
      password.length > 128
    ) {
      if (password.length < 6 || password.length > 128) {
        return NextResponse.json(
          { error: 'Password must be between 6 and 128 characters' },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: 'Please enter valid account details' },
        { status: 400 }
      )
    }

    const user = await createUser(name, email, password)
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error: unknown) {
    const message =
      error instanceof Error && error.message === 'User already exists'
        ? error.message
        : 'Something went wrong'

    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}