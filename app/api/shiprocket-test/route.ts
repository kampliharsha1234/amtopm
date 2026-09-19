import { NextResponse } from 'next/server'
import { getShiprocketToken } from '../../../lib/shiprocket'

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not found.' },
      { status: 404 }
    )
  }

  try {
    const token = await getShiprocketToken()

    return NextResponse.json({
      success: true,
      message: 'Shiprocket authentication successful.',
      tokenReceived: Boolean(token),
    })
  } catch (error) {
    console.error(
      'Shiprocket authentication test failed:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Shiprocket authentication failed.',
      },
      { status: 500 }
    )
  }
}