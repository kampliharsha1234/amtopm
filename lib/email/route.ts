import { NextRequest, NextResponse } from 'next/server'

import {
  sendConsultationEmail,
  ConsultationData,
} from '@/lib/email/consultation'

import {
  sendContactEmail,
  ContactData,
} from '@/lib/email/contact'

import {
  sendNewsletterEmail,
  NewsletterData,
} from '@/lib/email/newsletter'

type EmailType =
  | 'consultation'
  | 'contact'
  | 'newsletter'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const type = body.type as EmailType

    if (!type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email type is required.',
        },
        { status: 400 }
      )
    }

    switch (type) {
      case 'consultation': {
        const data: ConsultationData = body

        if (
          !data.name ||
          !data.email ||
          !data.phone ||
          !data.concern
        ) {
          return NextResponse.json(
            {
              success: false,
              error:
                'Name, email, phone and skin concern are required.',
            },
            { status: 400 }
          )
        }

        await sendConsultationEmail(data)

        break
      }

      case 'contact': {
        const data: ContactData = body

        if (
          !data.name ||
          !data.email ||
          !data.message
        ) {
          return NextResponse.json(
            {
              success: false,
              error:
                'Name, email and message are required.',
            },
            { status: 400 }
          )
        }

        await sendContactEmail(data)

        break
      }

      case 'newsletter': {
        const data: NewsletterData = body

        if (!data.email) {
          return NextResponse.json(
            {
              success: false,
              error: 'Email is required.',
            },
            { status: 400 }
          )
        }

        await sendNewsletterEmail(data)

        break
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid email type.',
          },
          { status: 400 }
        )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Email API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to send email.',
      },
      { status: 500 }
    )
  }
}