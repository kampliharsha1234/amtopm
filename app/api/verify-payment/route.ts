import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]/route'
import {
  getOrders,
  updateOrderPayment,
} from '../../../lib/orders'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'You must be signed in to verify payment.',
        },
        { status: 401 }
      )
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json()

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing payment verification fields.',
        },
        { status: 400 }
      )
    }

    const secret = process.env.RAZORPAY_KEY_SECRET

    if (!secret) {
      console.error('RAZORPAY_KEY_SECRET is not configured.')

      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification is not configured.',
        },
        { status: 500 }
      )
    }

    const order = getOrders().find(
      item =>
        item.payment.razorpayOrderId === razorpay_order_id
    )

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: 'Order could not be found.',
        },
        { status: 404 }
      )
    }

    if (order.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'You are not authorized to verify this order.',
        },
        { status: 403 }
      )
    }

    if (order.payment.status === 'paid') {
      return NextResponse.json({
        success: true,
        message: 'Payment was already verified.',
        order_id: order.id,
      })
    }

    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest('hex')

    const signaturesMatch =
      generatedSignature.length ===
        razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(razorpay_signature)
      )

    if (!signaturesMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payment signature.',
        },
        { status: 400 }
      )
    }

    const updatedOrder = updateOrderPayment(
      razorpay_order_id,
      {
        razorpayPaymentId: razorpay_payment_id,
      }
    )

    if (!updatedOrder) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to update order.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      order_id: updatedOrder.id,
    })
  } catch (error) {
    console.error('Payment verification error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to verify payment.',
      },
      { status: 500 }
    )
  }
}