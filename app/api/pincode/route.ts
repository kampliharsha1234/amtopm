import { NextRequest, NextResponse } from 'next/server'


export async function GET(
  request: NextRequest
) {
  const pincode =
    request.nextUrl.searchParams.get('pincode')?.trim() || ''


  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Enter a valid 6-digit pincode.',
      },
      { status: 400 }
    )
  }


  try {
    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
      {
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      throw new Error('Pincode service unavailable.')
    }

    const results = await response.json()
    const postOffice = results?.[0]?.PostOffice?.[0]

    if (!postOffice) {
      return NextResponse.json(
        {
          success: false,
          error: 'We could not find that pincode.',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      city: postOffice.District || postOffice.Block || '',
      state: postOffice.State || '',
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to look up this pincode right now.',
      },
      { status: 502 }
    )
  }
}