import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  findUserByEmail,
  createPasswordResetToken,
} from '../../../../lib/users'

const resend =
  new Resend(
    process.env.RESEND_API_KEY
  )

export async function POST(
  request: NextRequest
) {
  try {
    const { email } =
      await request.json()

    if (
      !email ||
      typeof email !== 'string'
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please enter your email address.',
        },
        { status: 400 }
      )
    }

    const normalizedEmail =
      email.trim().toLowerCase()

    const user =
      findUserByEmail(
        normalizedEmail
      )

    /*
     * Always return the same response,
     * whether the account exists or not.
     * This prevents email enumeration.
     */
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          'If an account exists with that email, a password reset link has been sent.',
      })
    }

    const token =
      createPasswordResetToken(
        user.id
      )

    const baseUrl =
      process.env.NEXTAUTH_URL ||
      'http://localhost:3000'

    const resetUrl =
      `${baseUrl}/auth/reset-password?token=${token}`

    const fromEmail =
      process.env.RESEND_FROM_EMAIL ||
      'AM:PM <onboarding@resend.dev>'

    const { error } =
      await resend.emails.send({
        from: fromEmail,
        to: [user.email],
        subject:
          'Reset your AM:PM password',
        html: `
          <div style="font-family: Arial, sans-serif; background: #F7F2EB; padding: 40px 20px;">
            <div style="max-width: 560px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 20px;">
              
              <p style="font-size: 11px; letter-spacing: 3px; color: #E85D2C; margin-bottom: 20px;">
                AM:PM
              </p>

              <h1 style="font-size: 28px; color: #171717; margin-bottom: 15px;">
                Reset your password
              </h1>

              <p style="font-size: 15px; line-height: 1.6; color: #6B6B6B;">
                Hi ${user.name || 'there'},
              </p>

              <p style="font-size: 15px; line-height: 1.6; color: #6B6B6B;">
                We received a request to reset the password
                for your AM:PM account.
              </p>

              <a
                href="${resetUrl}"
                style="
                  display: inline-block;
                  background: #E85D2C;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 14px 24px;
                  border-radius: 10px;
                  font-size: 14px;
                  font-weight: 600;
                  margin: 15px 0 20px;
                "
              >
                Reset Password
              </a>

              <p style="font-size: 13px; line-height: 1.6; color: #777777;">
                This link will expire in 15 minutes and can
                only be used once.
              </p>

              <p style="font-size: 13px; line-height: 1.6; color: #777777;">
                If you didn't request a password reset,
                you can safely ignore this email.
              </p>

              <div style="border-top: 1px solid #E8DFD3; margin-top: 30px; padding-top: 20px;">
                <p style="font-size: 11px; color: #999999;">
                  AM:PM Skincare
                </p>
              </div>

            </div>
          </div>
        `,
      })

    if (error) {
      console.error(
        'Resend error:',
        error
      )

      return NextResponse.json(
        {
          success: false,
          error:
            'Unable to send reset email. Please try again later.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message:
        'If an account exists with that email, a password reset link has been sent.',
    })
  } catch (error) {
    console.error(
      'Forgot password error:',
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