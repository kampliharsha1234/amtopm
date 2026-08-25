import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxx',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'xxxxxxxxxxxxxxxx',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json()

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      payment_capture: 1,
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}