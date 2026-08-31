import {
  NextRequest,
  NextResponse,
} from 'next/server'

import crypto from 'crypto'

import {
  getServerSession,
} from 'next-auth'

import {
  authOptions,
} from '../auth/[...nextauth]/route'

import {
  getOrders,
  updateOrderPayment,
  updateOrderShiprocket,
  updateOrderInvoice,
} from '../../../lib/orders'

import {
  createShiprocketOrder,
  assignShiprocketAwb,
} from '../../../lib/shiprocket'

import {
  generateInvoicePdf,
  buildInvoiceFilename,
} from '../../../lib/invoice'

import {
  sendOrderConfirmationEmail,
  getAdminEmail,
} from '../../../lib/email'


/* ============================================================
   INVOICE NUMBER
============================================================ */

function createInvoiceNumber() {
  const now =
    new Date()

  const year =
    now.getFullYear()

  const timestamp =
    Date.now()
      .toString()
      .slice(-8)

  return `AMPM/${year}/${timestamp}`
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
          success: false,

          error:
            'You must be signed in to verify payment.',
        },
        {
          status: 401,
        }
      )
    }


    /* ========================================================
       PAYMENT DATA
    ======================================================== */

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } =
      await request.json()


    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            'Missing payment verification fields.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       RAZORPAY SECRET
    ======================================================== */

    const secret =
      process.env
        .RAZORPAY_KEY_SECRET


    if (!secret) {

      console.error(
        'RAZORPAY_KEY_SECRET is not configured.'
      )


      return NextResponse.json(
        {
          success: false,

          error:
            'Payment verification is not configured.',
        },
        {
          status: 500,
        }
      )
    }


    /* ========================================================
       FIND LOCAL ORDER
    ======================================================== */

    const order =
      getOrders().find(
        item =>
          item.payment
            .razorpayOrderId ===
          razorpay_order_id
      )


    if (!order) {
      return NextResponse.json(
        {
          success: false,

          error:
            'Order could not be found.',
        },
        {
          status: 404,
        }
      )
    }


    /* ========================================================
       OWNERSHIP
    ======================================================== */

    if (
      order.userId !==
      session.user.id
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            'You are not authorized to verify this order.',
        },
        {
          status: 403,
        }
      )
    }


    /* ========================================================
       ALREADY PAID
    ======================================================== */

    if (
      order.payment.status ===
      'paid'
    ) {

      return NextResponse.json({
        success: true,

        message:
          'Payment was already verified.',

        order_id:
          order.id,
      })
    }


    /* ========================================================
       VERIFY RAZORPAY SIGNATURE
    ======================================================== */

    const generatedSignature =
      crypto
        .createHmac(
          'sha256',
          secret
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest('hex')


    const signaturesMatch =
      generatedSignature.length ===
        razorpay_signature.length &&
      crypto.timingSafeEqual(
        Buffer.from(
          generatedSignature
        ),
        Buffer.from(
          razorpay_signature
        )
      )


    if (
      !signaturesMatch
    ) {

      return NextResponse.json(
        {
          success: false,

          error:
            'Invalid payment signature.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       MARK ORDER PAID
    ======================================================== */

    const updatedOrder =
      updateOrderPayment(
        razorpay_order_id,
        {
          razorpayPaymentId:
            razorpay_payment_id,
        }
      )


    if (!updatedOrder) {

      return NextResponse.json(
        {
          success: false,

          error:
            'Unable to update order.',
        },
        {
          status: 500,
        }
      )
    }


    /* ========================================================
       GENERATE INVOICE NUMBER
    ======================================================== */

    const invoiceNumber =
      createInvoiceNumber()

    const invoiceFileName =
      buildInvoiceFilename(
        invoiceNumber
      )

    let invoicePdf: Buffer | null = null

    try {
      invoicePdf = await generateInvoicePdf({
        ...updatedOrder,
        invoice: {
          invoiceNumber,
          generatedAt:
            new Date().toISOString(),
          status:
            'generated',
          invoiceFileName,
        },
      })
    } catch (invoiceError) {
      console.error(
        'Invoice generation failed:',
        invoiceError
      )
    }

    const invoiceRecord =
      updateOrderInvoice(
        updatedOrder.id,
        {
          invoiceNumber,

          generatedAt:
            new Date().toISOString(),

          status:
            'generated',

          invoiceFileName,
        }
      )

    if (invoicePdf && invoiceRecord) {
      try {
        await sendOrderConfirmationEmail({
          order: invoiceRecord,
          invoicePdf,
          recipient: invoiceRecord.shipping.email,
          recipientName: invoiceRecord.shipping.name || 'Customer',
        })
      } catch (customerEmailError) {
        console.error(
          'Customer order confirmation email failed:',
          customerEmailError
        )
      }

      try {
        await sendOrderConfirmationEmail({
          order: invoiceRecord,
          invoicePdf,
          recipient: getAdminEmail(),
          recipientName: 'amtopm team',
        })
      } catch (adminEmailError) {
        console.error(
          'Admin order confirmation email failed:',
          adminEmailError
        )
      }
    }


    /* ========================================================
       SHIPROCKET FULFILLMENT
    ======================================================== */

    try {

      if (
        !updatedOrder.shipmentWeight ||
        !updatedOrder.packageDimensions
      ) {
        throw new Error(
          'Shipment information is missing from the order.'
        )
      }

      const shiprocketItems =
        updatedOrder.items.map(
          item => ({
            name:
              item.name,

            sku:
              item.sku ||
              item.productId,

            quantity:
              item.quantity,

            price:
              item.price,
          })
        )

      const created =
        await createShiprocketOrder({
          orderId:
            updatedOrder.id,

          orderDate:
            new Date(
              updatedOrder.createdAt
            ).toISOString(),

          customer: {
            name:
              updatedOrder
                .shipping
                .name,

            email:
              updatedOrder
                .shipping
                .email,

            phone:
              updatedOrder
                .shipping
                .phone,

            address:
              updatedOrder
                .shipping
                .address,

            city:
              updatedOrder
                .shipping
                .city,

            state:
              updatedOrder
                .shipping
                .state,

            pincode:
              updatedOrder
                .shipping
                .pincode,
          },

          items:
            shiprocketItems,

          subtotal:
            updatedOrder.subtotal ??
            updatedOrder.total,

          shippingCharge:
            updatedOrder.shippingCharge ??
            0,

          total:
            updatedOrder.total,

          packageDimensions:
            updatedOrder.packageDimensions,

          shipmentWeight:
            Number(
              (
                updatedOrder.shipmentWeight ?? 0
              ).toFixed(3)
            ),

          invoiceNumber,
        })

      const awb =
        await assignShiprocketAwb({
          shipmentId:
            created.shipmentId,
        })

      updateOrderShiprocket(
        updatedOrder.id,
        {
          status:
            'awb_assigned',

          orderId:
            created.shiprocketOrderId,

          shipmentId:
            created.shipmentId,

          awbCode:
            awb.awbCode,

          courierCompanyId:
            awb.courierCompanyId,

          courierName:
            created.courierName ||
            undefined,

          updatedAt:
            new Date()
              .toISOString(),
        }
      )

    } catch (
      shiprocketError
    ) {

      console.error(
        'Shiprocket fulfillment error:',
        shiprocketError
      )

      updateOrderShiprocket(
        updatedOrder.id,
        {
          status:
            'failed',

          error:
            shiprocketError instanceof Error
              ? shiprocketError.message
              : 'Shiprocket fulfillment failed.',

          updatedAt:
            new Date()
              .toISOString(),
        }
      )
    }


    /* ========================================================
       FINAL RESPONSE
    ======================================================== */

    return NextResponse.json({
      success: true,

      message:
        'Payment verified successfully, shipment processing pending.',

      order_id:
        updatedOrder.id,
    })

  } catch (
    error
  ) {

    console.error(
      'Payment verification error:',
      error
    )


    return NextResponse.json(
      {
        success: false,

        error:
          'Failed to verify payment.',
      },
      {
        status: 500,
      }
    )
  }
}