import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL = process.env.CONTACT_EMAIL

if (!CONTACT_EMAIL) {
  console.warn(
    'CONTACT_EMAIL is not configured. Email sending will fail until it is added.'
  )
}

export type EmailPayload = {
  to?: string | string[]
  replyTo?: string
  subject: string
  html: string
}

export async function sendEmail({
  to = CONTACT_EMAIL,
  replyTo,
  subject,
  html,
}: EmailPayload) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured.')
  }

  if (!to) {
    throw new Error('CONTACT_EMAIL is not configured.')
  }

  const { data, error } = await resend.emails.send({
    from: 'AM:PM Website <onboarding@resend.dev>',
    to,
    replyTo,
    subject,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(error.message)
  }

  return data
}