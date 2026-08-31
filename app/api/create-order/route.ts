import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { getServerSession } from 'next-auth'

import { authOptions } from '../auth/[...nextauth]/route'

import { products } from '../../data/products'

import { createOrder } from '../../../lib/orders'

import {
  getShiprocketShippingRate,
} from '../../../lib/shiprocket'


/* ============================================================
   RAZORPAY
============================================================ */

const razorpayKeyId =
  process.env.RAZORPAY_KEY_ID

const razorpayKeySecret =
  process.env.RAZORPAY_KEY_SECRET


if (
  !razorpayKeyId ||
  !razorpayKeySecret
) {
  console.warn(
    'Razorpay credentials are not configured.'
  )
}


const razorpay =
  new Razorpay({
    key_id:
      razorpayKeyId || '',

    key_secret:
      razorpayKeySecret || '',
  })


/* ============================================================
   SHIPPING CONFIGURATION
============================================================ */

/*
  Temporary packaging assumption.

  Product weight + 100g packaging.

  We can change this one value later when
  the actual average packing weight is known.
*/

const PACKAGING_WEIGHT_G =
  100


/*
  Small dimensional margin for multi-product parcels.
*/

const MULTI_ITEM_MARGIN_CM =
  2


/* ============================================================
   PARSE WEIGHT
============================================================ */

function parseWeightToGrams(
  weight: string
): number {
  const normalized =
    weight
      .trim()
      .toLowerCase()
      .replace(',', '.')


  const match =
    normalized.match(
      /[\d.]+/
    )


  if (!match) {
    return 0
  }


  const value =
    Number(match[0])


  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return 0
  }


  if (
    normalized.includes('kg') ||
    normalized.includes('kgs')
  ) {
    return value * 1000
  }


  /*
    Current AMTOPM data:

    50 ml  → approximately 50g
    50 gm  → 50g
    100 ml → approximately 100g
    30 gm  → 30g

    This is only used for shipping estimation.
  */

  return value
}


/* ============================================================
   PARSE DIMENSION
============================================================ */

function parseDimension(
  dimension: string
): number {
  const normalized =
    dimension
      .trim()
      .replace(',', '.')


  const match =
    normalized.match(
      /[\d.]+/
    )


  if (!match) {
    return 0
  }


  const value =
    Number(match[0])


  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return 0
  }


  return value
}


/* ============================================================
   CALCULATE SHIPMENT
============================================================ */

function calculateShipment(
  items: Array<{
    id: string
    quantity: number
  }>
) {

  let productWeightGrams =
    0

  let totalUnits =
    0


  const packageProducts: Array<{
    length: number
    width: number
    height: number
  }> = []


  for (
    const item of items
  ) {

    const product =
      products.find(
        product =>
          product.id ===
          item.id
      )


    if (!product) {
      throw new Error(
        `Product ${item.id} was not found.`
      )
    }


    const quantity =
      Number(
        item.quantity
      )


    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > 20
    ) {
      throw new Error(
        `Invalid quantity for ${product.name}.`
      )
    }


    const productWeight =
      parseWeightToGrams(
        product.weight
      )


    const length =
      parseDimension(
        product.dimensions.length
      )

    const width =
      parseDimension(
        product.dimensions.width
      )

    const height =
      parseDimension(
        product.dimensions.height
      )


    if (
      productWeight <= 0 ||
      length <= 0 ||
      width <= 0 ||
      height <= 0
    ) {
      throw new Error(
        `Incomplete shipping data for ${product.name}.`
      )
    }


    productWeightGrams +=
      productWeight *
      quantity


    totalUnits +=
      quantity


    for (
      let index = 0;
      index < quantity;
      index++
    ) {
      packageProducts.push({
        length,
        width,
        height,
      })
    }
  }


  /* ==========================================================
     WEIGHT
  ========================================================== */

  const totalWeightGrams =
    productWeightGrams +
    PACKAGING_WEIGHT_G


  /*
    Shiprocket minimum chargeable weight:
    0.50 kg.
  */

  const shipmentWeight =
    Math.max(
      0.5,
      totalWeightGrams / 1000
    )


  /* ==========================================================
     DIMENSIONS
  ========================================================== */

  let packageDimensions: {
    length: number
    breadth: number
    height: number
  }


  /*
    Single product:
    use the actual supplied product dimensions.
  */

  if (
    packageProducts.length === 1
  ) {

    packageDimensions = {
      length:
        packageProducts[0].length,

      breadth:
        packageProducts[0].width,

      height:
        packageProducts[0].height,
    }

  } else {

    /*
      Multiple products:
      approximate a compact grid.
    */

    const count =
      packageProducts.length


    const columns =
      Math.ceil(
        Math.sqrt(count)
      )


    const rows =
      Math.ceil(
        count / columns
      )


    const maxLength =
      Math.max(
        ...packageProducts.map(
          item => item.length
        )
      )


    const maxWidth =
      Math.max(
        ...packageProducts.map(
          item => item.width
        )
      )


    const maxHeight =
      Math.max(
        ...packageProducts.map(
          item => item.height
        )
      )


    packageDimensions = {
      length:
        Number(
          (
            maxLength *
              columns +
            MULTI_ITEM_MARGIN_CM
          ).toFixed(1)
        ),

      breadth:
        Number(
          (
            maxWidth *
              rows +
            MULTI_ITEM_MARGIN_CM
          ).toFixed(1)
        ),

      height:
        Number(
          (
            maxHeight +
            MULTI_ITEM_MARGIN_CM
          ).toFixed(1)
        ),
    }
  }


  return {
    shipmentWeight:
      Number(
        shipmentWeight.toFixed(3)
      ),

    packageDimensions,

    productWeightGrams,

    packagingWeightGrams:
      PACKAGING_WEIGHT_G,
  }
}


/* ============================================================
   POST
============================================================ */

export async function POST(
  request: NextRequest
) {

  try {

    /* ========================================================
       AUTHENTICATION
    ======================================================== */

    const session =
      await getServerSession(
        authOptions
      )


    if (
      !session?.user?.id
    ) {
      return NextResponse.json(
        {
          error:
            'You must be signed in to place an order.',
        },
        {
          status: 401,
        }
      )
    }


    /* ========================================================
       REQUEST
    ======================================================== */

    const body =
      await request.json()


    const {
      items,
      shipping,
    } = body


    /* ========================================================
       VALIDATE CART
    ======================================================== */

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            'Your cart is empty.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       VALIDATE DELIVERY
    ======================================================== */

    if (
      !shipping?.name ||
      !shipping?.email ||
      !shipping?.phone ||
      !shipping?.address ||
      !shipping?.city ||
      !shipping?.state ||
      !shipping?.pincode
    ) {
      return NextResponse.json(
        {
          error:
            'Complete delivery details are required.',
        },
        {
          status: 400,
        }
      )
    }


    if (
      !/^\d{6}$/.test(
        String(
          shipping.pincode
        )
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Please enter a valid 6-digit pincode.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       PRODUCTS + SUBTOTAL
    ======================================================== */

    const orderItems = []

    let subtotal = 0


    for (
      const item of items
    ) {

      const product =
        products.find(
          product =>
            product.id ===
            item.id
        )


      const quantity =
        Number(
          item.quantity
        )


      if (!product) {
        return NextResponse.json(
          {
            error:
              'One or more products in your cart are invalid.',
          },
          {
            status: 400,
          }
        )
      }


      if (
        !product.inStock ||
        !Number.isInteger(
          quantity
        ) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return NextResponse.json(
          {
            error:
              `Invalid quantity for ${product.name}.`,
          },
          {
            status: 400,
          }
        )
      }


      const itemTotal =
        product.price *
        quantity


      subtotal +=
        itemTotal


      orderItems.push({
        productId:
          product.id,

        name:
          product.name,

        price:
          product.price,

        priceExcludingGst:
          product.priceExcludingGst,

        sku:
          product.sku,

        quantity,

        image:
          product.image,
      })
    }


    /* ========================================================
       SHIPMENT
    ======================================================== */

    const shipment =
      calculateShipment(
        items
      )


    /* ========================================================
       SHIPROCKET SHIPPING RATE
    ======================================================== */

    const shippingRate =
      await getShiprocketShippingRate({
        destinationPincode:
          String(
            shipping.pincode
          ),

        weight:
          shipment.shipmentWeight,

        length:
          shipment
            .packageDimensions
            .length,

        breadth:
          shipment
            .packageDimensions
            .breadth,

        height:
          shipment
            .packageDimensions
            .height,

        declaredValue:
          subtotal,

        cod:
          0,
      })


    const shippingCharge =
      Math.max(
        0,
        Number(
          shippingRate.shippingCharge
        )
      )


    /* ========================================================
       FINAL TOTAL
    ======================================================== */

    const total =
      subtotal +
      shippingCharge


    const amountInPaise =
      Math.round(
        total * 100
      )


    if (
      amountInPaise < 100
    ) {
      return NextResponse.json(
        {
          error:
            'Order amount must be at least ₹1.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       RAZORPAY ORDER
    ======================================================== */

    const receipt =
      `AMPM-${Date.now()}`


    const razorpayOrder =
      await razorpay.orders.create({
        amount:
          amountInPaise,

        currency:
          'INR',

        receipt,
      })


    /* ========================================================
       CREATE PENDING LOCAL ORDER
    ======================================================== */

    const order =
      createOrder({
        userId:
          session.user.id,

        items:
          orderItems,

        subtotal,

        shippingCharge,

        shipmentWeight:
          shipment.shipmentWeight,

        packageDimensions:
          shipment.packageDimensions,

        total,

        shipping: {
          name:
            shipping.name,

          email:
            shipping.email,

          phone:
            shipping.phone,

          address:
            shipping.address,

          city:
            shipping.city,

          state:
            shipping.state,

          pincode:
            shipping.pincode,
        },

        payment: {
          status:
            'pending',

          razorpayOrderId:
            razorpayOrder.id,
        },

        /*
          We do NOT create the Shiprocket shipment
          yet. That happens only after verified payment.
        */

        status:
          'pending',
      })


    /* ========================================================
       RESPONSE
    ======================================================== */

    return NextResponse.json({

      order_id:
        razorpayOrder.id,

      amount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      order_reference:
        order.id,

      subtotal,

      shipping:
        shippingCharge,

      total,

      shipmentWeight:
        shipment.shipmentWeight,

      packageDimensions:
        shipment.packageDimensions,

      courier:
        shippingRate.courier,
    })

  } catch (
    error: any
  ) {

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
      {
        status: 500,
      }
    )
  }
}