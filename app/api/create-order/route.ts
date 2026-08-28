import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]/route'
import { products } from '../../data/products'
import { createOrder } from '../../../lib/orders'

const razorpayKeyId =
  process.env.RAZORPAY_KEY_ID

const razorpayKeySecret =
  process.env.RAZORPAY_KEY_SECRET

if (!razorpayKeyId || !razorpayKeySecret) {
  console.warn(
    'Razorpay credentials are not configured.'
  )
}

const razorpay = new Razorpay({
  key_id: razorpayKeyId || '',
  key_secret: razorpayKeySecret || '',
})

export async function POST(
  request: NextRequest
) {
  try {
    /* ==========================================================
       AUTHENTICATION
    ========================================================== */

    const session =
      await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error:
            'You must be signed in to place an order.',
        },
        { status: 401 }
      )
    }

    /* ==========================================================
       REQUEST
    ========================================================== */

    const body = await request.json()

    const {
      items,
      shipping,
    } = body

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: 'Your cart is empty.',
        },
        { status: 400 }
      )
    }

    if (
      !shipping?.name ||
      !shipping?.email ||
      !shipping?.address ||
      !shipping?.city ||
      !shipping?.pincode
    ) {
      return NextResponse.json(
        {
          error:
            'Complete delivery details are required.',
        },
        { status: 400 }
      )
    }

    /* ==========================================================
       VALIDATE PRODUCTS + CALCULATE TOTAL SERVER-SIDE
    ========================================================== */

    const orderItems = []

    let total = 0

    for (const item of items) {
      const product = products.find(
        product =>
          product.id === item.id
      )

      const quantity = Number(item.quantity)

      if (!product) {
        return NextResponse.json(
          {
            error:
              'One or more products in your cart are invalid.',
          },
          { status: 400 }
        )
      }

      if (
        !product.inStock ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return NextResponse.json(
          {
            error:
              `Invalid quantity for ${product.name}.`,
          },
          { status: 400 }
        )
      }

      const itemTotal =
        product.price * quantity

      total += itemTotal

      orderItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
      })
    }

    const amountInPaise = Math.round(
      total * 100
    )

    if (amountInPaise < 100) {
      return NextResponse.json(
        {
          error:
            'Order amount must be at least ₹1.',
        },
        { status: 400 }
      )
    }

    /* ==========================================================
       CREATE RAZORPAY ORDER
    ========================================================== */

    const receipt = `AMPM-${Date.now()}`

    const razorpayOrder =
      await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt,
      })

    /* ==========================================================
       CREATE PENDING APPLICATION ORDER
    ========================================================== */

    const order = createOrder({
      userId: session.user.id,

      items: orderItems,

      total,

      shipping: {
        name: shipping.name,
        email: shipping.email,
        address: shipping.address,
        city: shipping.city,
        pincode: shipping.pincode,
      },

      payment: {
        status: 'pending',
        razorpayOrderId:
          razorpayOrder.id,
      },

      status: 'pending',
    })

    return NextResponse.json({
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      order_reference: order.id,
    })
  } catch (error: any) {
    console.error(
      'Error creating Razorpay order:',
      error
    )

    return NextResponse.json(
      {
        error:
          error?.error?.description ||
          error?.message ||
          'Failed to create order.',
      },
      { status: 500 }
    )
  }
}