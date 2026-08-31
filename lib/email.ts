import { Resend } from 'resend'

import { Order } from './orders'

const resend = new Resend(process.env.RESEND_API_KEY)

const defaultAdminEmail =
  process.env.ADMIN_EMAIL || 'amtopmformulation@gmail.com'

export async function sendOrderConfirmationEmail({
  order,
  invoicePdf,
  recipient,
  recipientName,
}: {
  order: Order
  invoicePdf: Buffer
  recipient: string
  recipientName: string
}) {
  const from = process.env.RESEND_FROM_EMAIL

  if (!from) {
    throw new Error('RESEND_FROM_EMAIL is not configured.')
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured.')
  }

  const orderId = order.id
  const invoiceNumber = order.invoice?.invoiceNumber || 'N/A'
  const subtotal = order.subtotal ?? order.total
  const shipping = order.shippingCharge ?? 0
  const total = order.total

  const itemsHtml = order.items
    .map(
      item => `
        <tr>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E8DFD3; color: #171717; font-size: 14px;">${item.name}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E8DFD3; color: #6B6B6B; font-size: 14px; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px 12px; border-bottom: 1px solid #E8DFD3; color: #171717; font-size: 14px; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
        </tr>
      `
    )
    .join('')

  const subject = `Order confirmed — amtopm #${orderId}`

  const html = `
    <div style="font-family: Arial, sans-serif; background: #F7F2EB; padding: 40px 20px; color: #171717;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #E8DFD3;">
        <div style="background: #F7F2EB; padding: 28px 32px; border-bottom: 1px solid #E8DFD3;">
          <p style="margin: 0; font-size: 10px; letter-spacing: 3px; color: #E85D2C; font-weight: 700;">AMTOPM</p>
          <h1 style="margin: 14px 0 0; font-size: 30px; color: #171717;">Order confirmed</h1>
        </div>

        <div style="padding: 32px;">
          <p style="margin: 0; font-size: 16px; color: #171717;">Hello ${recipientName},</p>
          <p style="margin: 16px 0 0; font-size: 15px; line-height: 1.7; color: #454545;">
            Thank you for your order. Your amtopm order #${orderId} has been confirmed and your payment has been received.
          </p>

          <p style="margin: 20px 0; font-size: 15px; line-height: 1.7; color: #171717; font-weight: 600;">
            Your order has been confirmed and will be prepared for dispatch.
          </p>

          <div style="background: #F7F2EB; border: 1px solid #E8DFD3; border-radius: 14px; padding: 18px 20px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.12em;">Order summary</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 14px;">
              <thead>
                <tr>
                  <th style="padding: 10px 12px; text-align: left; font-size: 12px; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #E8DFD3;">Product</th>
                  <th style="padding: 10px 12px; text-align: center; font-size: 12px; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #E8DFD3;">Qty</th>
                  <th style="padding: 10px 12px; text-align: right; font-size: 12px; color: #6B6B6B; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #E8DFD3;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div style="margin-top: 28px; padding-top: 14px; border-top: 1px solid #E8DFD3;">
            <p style="margin: 0 0 8px; font-size: 14px; color: #6B6B6B;">Subtotal: <strong style="color: #171717;">₹${subtotal.toLocaleString('en-IN')}</strong></p>
            <p style="margin: 0 0 8px; font-size: 14px; color: #6B6B6B;">Shipping: <strong style="color: #171717;">₹${shipping.toLocaleString('en-IN')}</strong></p>
            <p style="margin: 0; font-size: 18px; color: #171717; font-weight: 700;">Total: ₹${total.toLocaleString('en-IN')}</p>
            <p style="margin: 14px 0 0; font-size: 14px; color: #6B6B6B;">Invoice number: <strong style="color: #171717;">${invoiceNumber}</strong></p>
          </div>

          <div style="margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL || 'https://amtopm.net'} /orders" style="display: inline-block; background: #E85D2C; color: #ffffff; text-decoration: none; padding: 14px 22px; border-radius: 999px; font-size: 14px; font-weight: 600;">View order</a>
          </div>
        </div>
      </div>
    </div>
  `

  const { error } = await resend.emails.send({
    from,
    to: recipient,
    subject,
    html,
    attachments: [
      {
        filename: `amtopm-invoice-${invoiceNumber}.pdf`,
        content: invoicePdf.toString('base64'),
      },
    ],
  })

  if (error) {
    console.error('Resend email error:', error)
    throw new Error(error.message)
  }

  return { ok: true }
}

export async function sendAdminOrderEmail({
  order,
  invoicePdf,
}: {
  order: Order
  invoicePdf: Buffer
}) {
  const adminEmail = process.env.ADMIN_EMAIL || defaultAdminEmail
  const recipientName = 'amtopm team'

  await sendOrderConfirmationEmail({
    order,
    invoicePdf,
    recipient: adminEmail,
    recipientName,
  })
}

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || 'amtopmformulation@gmail.com'
}
