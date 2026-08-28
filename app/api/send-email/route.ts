import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL || 'temporary@example.com'

type EmailType = 'consultation' | 'support' | 'newsletter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      type,
      name,
      email,
      phone,
      concern,
      contactMethod,
      message,
    } = body as {
      type: EmailType
      name?: string
      email?: string
      phone?: string
      concern?: string
      contactMethod?: string
      message?: string
    }

    if (!type) {
      return NextResponse.json(
        { error: 'Email type is required.' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing.')

      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      )
    }

    /*
     * ============================================================
     * NEWSLETTER
     * ============================================================
     */

    if (type === 'newsletter') {
      if (!email) {
        return NextResponse.json(
          { error: 'Email is required.' },
          { status: 400 }
        )
      }

      const { data, error } = await resend.emails.send({
        from: 'AM:PM Website <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: 'New AM:PM Newsletter Subscriber',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Newsletter Subscriber</h2>

            <p>
              <strong>Email:</strong> ${escapeHtml(email)}
            </p>

            <p>
              Someone subscribed to the AM:PM newsletter through the website.
            </p>
          </div>
        `,
      })

      if (error) {
        console.error(error)

        return NextResponse.json(
          { error: 'Failed to send newsletter notification.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        id: data?.id,
      })
    }

    /*
     * ============================================================
     * SUPPORT
     * ============================================================
     */

    if (type === 'support') {
      if (!name || !email || !message) {
        return NextResponse.json(
          { error: 'Name, email and message are required.' },
          { status: 400 }
        )
      }

      const { data, error } = await resend.emails.send({
        from: 'AM:PM Website <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: `AM:PM Support Message — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">

            <h2>New Support Message</h2>

            <hr />

            <p>
              <strong>Name:</strong><br />
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Message:</strong><br />
              ${escapeHtml(message).replace(/\n/g, '<br />')}
            </p>

          </div>
        `,
      })

      if (error) {
        console.error(error)

        return NextResponse.json(
          { error: 'Failed to send support message.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        id: data?.id,
      })
    }

    /*
     * ============================================================
     * FREE CONSULTATION
     * ============================================================
     */

    if (type === 'consultation') {
      if (!name || !email || !phone || !concern) {
        return NextResponse.json(
          {
            error:
              'Name, email, phone and skin concern are required.',
          },
          { status: 400 }
        )
      }

      const { data, error } = await resend.emails.send({
        from: 'AM:PM Website <onboarding@resend.dev>',
        to: [CONTACT_EMAIL],
        replyTo: email,
        subject: `New Free Consultation Request — ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">

            <h2>New Free Consultation Request</h2>

            <hr />

            <p>
              <strong>Name:</strong><br />
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong><br />
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Phone:</strong><br />
              ${escapeHtml(phone)}
            </p>

            <p>
              <strong>Skin Concern:</strong><br />
              ${escapeHtml(concern)}
            </p>

            <p>
              <strong>Preferred Contact Method:</strong><br />
              ${escapeHtml(contactMethod || 'Not specified')}
            </p>

            <p>
              <strong>Additional Information:</strong><br />
              ${
                message
                  ? escapeHtml(message).replace(/\n/g, '<br />')
                  : 'None provided.'
              }
            </p>

          </div>
        `,
      })

      if (error) {
        console.error(error)

        return NextResponse.json(
          { error: 'Failed to send consultation request.' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        id: data?.id,
      })
    }

    return NextResponse.json(
      { error: 'Invalid email type.' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Email API error:', error)

    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}

/*
 * ============================================================
 * BASIC HTML ESCAPING
 * ============================================================
 */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}