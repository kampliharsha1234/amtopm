import { NextRequest, NextResponse } from 'next/server'

import {
  resetPassword,
} from '../../../../lib/users'

export async function POST(
  request: NextRequest
) {
  try {
    const {
      token,
      password,
    } = await request.json()

    if (
      !token ||
      typeof token !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid or missing reset token.',
        },
        { status: 400 }
      )
    }

    if (
      !password ||
      typeof password !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please enter a new password.',
        },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Password must be at least 6 characters.',
        },
        { status: 400 }
      )
    }

    const success =
      resetPassword(
        token,
        password
      )

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This reset link is invalid or has expired.',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message:
        'Password updated successfully.',
    })
  } catch (error) {
    console.error(
      'Reset password error:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          'Something went wrong. Please try again.',
      },
      { status: 500 }
    )
  }
}