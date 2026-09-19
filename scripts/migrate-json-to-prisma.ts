import fs from 'node:fs/promises'
import path from 'node:path'

import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '@prisma/client'

import type { Order } from '../lib/orders'
import type { UserRecord } from '../lib/users'
import type { Review } from '../lib/reviews'

type PasswordResetRecord = {
  userId: string
  tokenHash: string
  expiresAt: number
  used: boolean
}

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to run the JSON migration.')
}

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(databaseUrl),
})

const dataDirectory = path.join(process.cwd(), 'data')

async function readJson<T>(filename: string): Promise<T> {
  const contents = await fs.readFile(
    path.join(dataDirectory, filename),
    'utf8'
  )

  return JSON.parse(contents) as T
}

function orderFields(order: Order) {
  return {
    subtotal: order.subtotal,
    shippingCharge: order.shippingCharge,
    shipmentWeight: order.shipmentWeight,
    packageLength: order.packageDimensions?.length,
    packageBreadth: order.packageDimensions?.breadth,
    packageHeight: order.packageDimensions?.height,
    total: order.total,
    shippingName: order.shipping.name,
    shippingEmail: order.shipping.email,
    shippingPhone: order.shipping.phone,
    shippingAddress: order.shipping.address,
    shippingCity: order.shipping.city,
    shippingState: order.shipping.state,
    shippingPincode: order.shipping.pincode,
    paymentStatus: order.payment.status,
    razorpayOrderId: order.payment.razorpayOrderId,
    razorpayPaymentId: order.payment.razorpayPaymentId,
    invoiceNumber: order.invoice?.invoiceNumber,
    invoiceGeneratedAt: order.invoice
      ? new Date(order.invoice.generatedAt)
      : undefined,
    invoiceStatus: order.invoice?.status,
    invoiceFileName: order.invoice?.invoiceFileName,
    shiprocketStatus: order.shiprocket?.status,
    shiprocketOrderId: order.shiprocket?.orderId,
    shipmentId: order.shiprocket?.shipmentId,
    awbCode: order.shiprocket?.awbCode,
    courierCompanyId: order.shiprocket?.courierCompanyId,
    courierName: order.shiprocket?.courierName,
    pickupScheduledDate: order.shiprocket?.pickupScheduledDate
      ? new Date(order.shiprocket.pickupScheduledDate)
      : order.shiprocket?.pickupScheduledDate,
    pickupToken: order.shiprocket?.pickupToken,
    pickupStatus: order.shiprocket?.pickupStatus,
    manifestGenerated: order.shiprocket?.manifestGenerated,
    manifestUrl: order.shiprocket?.manifestUrl,
    shiprocketError: order.shiprocket?.error,
    shiprocketUpdatedAt: order.shiprocket
      ? new Date(order.shiprocket.updatedAt)
      : undefined,
    status: order.status,
    createdAt: new Date(order.createdAt),
  }
}

async function migrateUsers(users: UserRecord[]) {
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        name: user.name,
        email: user.email.toLowerCase(),
        password: user.password,
      },
      update: {
        name: user.name,
        email: user.email.toLowerCase(),
        password: user.password,
      },
    })
  }

  return users.length
}

async function migratePasswordResets(
  tokens: PasswordResetRecord[],
  userIds: Set<string>
) {
  let skipped = 0

  for (const token of tokens) {
    if (!userIds.has(token.userId)) {
      skipped += 1
      console.warn(
        `Skipped password reset token ${token.tokenHash}: user ${token.userId} does not exist.`
      )
      continue
    }

    await prisma.passwordResetToken.upsert({
      where: { tokenHash: token.tokenHash },
      create: {
        userId: token.userId,
        tokenHash: token.tokenHash,
        expiresAt: new Date(token.expiresAt),
        used: token.used,
      },
      update: {
        userId: token.userId,
        expiresAt: new Date(token.expiresAt),
        used: token.used,
      },
    })
  }

  return {
    imported: tokens.length - skipped,
    skipped,
  }
}

async function migrateOrders(orders: Order[]) {
  for (const order of orders) {
    await prisma.$transaction(async transaction => {
      await transaction.order.upsert({
        where: { id: order.id },
        create: {
          id: order.id,
          ...orderFields(order),
          user: { connect: { id: order.userId } },
        },
        update: orderFields(order),
      })

      await transaction.orderItem.deleteMany({
        where: { orderId: order.id },
      })

      if (order.items.length > 0) {
        await transaction.orderItem.createMany({
          data: order.items.map(item => ({
            orderId: order.id,
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            sku: item.sku,
            priceExcludingGst: item.priceExcludingGst,
          })),
        })
      }
    })
  }

  return orders.length
}

async function migrateReviews(reviews: Review[]) {
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      create: {
        id: review.id,
        productId: review.productId,
        name: review.name,
        rating: review.rating,
        review: review.review,
        createdAt: new Date(review.createdAt),
      },
      update: {
        productId: review.productId,
        name: review.name,
        rating: review.rating,
        review: review.review,
        createdAt: new Date(review.createdAt),
      },
    })
  }

  return reviews.length
}

async function main() {
  const [users, resetTokens, orders, reviews] = await Promise.all([
    readJson<UserRecord[]>('users.json'),
    readJson<PasswordResetRecord[]>('password-resets.json'),
    readJson<Order[]>('orders.json'),
    readJson<Review[]>('reviews.json'),
  ])

  const userCount = await migrateUsers(users)
  const resetTokenSummary = await migratePasswordResets(
    resetTokens,
    new Set(users.map(user => user.id))
  )
  const orderCount = await migrateOrders(orders)
  const reviewCount = await migrateReviews(reviews)
  const orderItemCount = orders.reduce(
    (total, order) => total + order.items.length,
    0
  )

  console.log('JSON to MariaDB migration completed.')
  console.log(`Users: ${userCount}`)
  console.log(
    `Password reset tokens: ${resetTokenSummary.imported} imported, ${resetTokenSummary.skipped} skipped`
  )
  console.log(`Orders: ${orderCount}`)
  console.log(`Order items: ${orderItemCount}`)
  console.log(`Reviews: ${reviewCount}`)
  console.log('Existing JSON files were kept unchanged.')
}

main()
  .catch(error => {
    console.error('JSON migration failed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
