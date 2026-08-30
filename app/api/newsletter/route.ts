import { NextResponse } from 'next/server'
import { sendNewsletterEmail } from '@/lib/email/newsletter'

export async function POST(request: Request) {
try {
const body = await request.json()


const email = String(body?.email ?? '').trim().toLowerCase()

if (!email) {
  return NextResponse.json(
    {
      success: false,
      error: 'Please enter your email address.',
    },
    { status: 400 }
  )
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(email)) {
  return NextResponse.json(
    {
      success: false,
      error: 'Please enter a valid email address.',
    },
    { status: 400 }
  )
}

await sendNewsletterEmail({
  email,
})

return NextResponse.json(
  {
    success: true,
    message: 'You have successfully subscribed to the newsletter.',
  },
  { status: 200 }
)


} catch (error) {
console.error('Newsletter API error:', error)


const message =
  error instanceof Error
    ? error.message
    : 'Unknown server error.'

return NextResponse.json(
  {
    success: false,
    error: `Unable to subscribe to the newsletter. ${message}`,
  },
  { status: 500 }
)


}
}
