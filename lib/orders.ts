import crypto from 'crypto'

import { Prisma } from '@prisma/client'

import { prisma } from './prisma'

export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  sku?: string
  priceExcludingGst?: number
}

export type ShippingDetails = {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
}

export type ShiprocketDetails = {
  status:
    | 'pending'
    | 'created'
    | 'awb_assigned'
    | 'pickup_generated'
    | 'failed'
  orderId?: number
  shipmentId?: number
  awbCode?: string
  courierCompanyId?: number
  courierName?: string
  pickupScheduledDate?: string | null
  pickupToken?: string | null
  pickupStatus?: number | null
  manifestGenerated?: boolean
  manifestUrl?: string | null
  error?: string
  updatedAt: string
}

export type InvoiceDetails = {
  invoiceNumber: string
  generatedAt: string
  status: 'generated' | 'draft'
  invoiceFileName?: string
}

export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  subtotal?: number
  shippingCharge?: number
  shipmentWeight?: number
  packageDimensions?: {
    length: number
    breadth: number
    height: number
  }
  total: number
  shipping: ShippingDetails
  payment: {
    status: 'pending' | 'paid' | 'failed'
    razorpayOrderId: string
    razorpayPaymentId?: string
  }
  invoice?: InvoiceDetails
  shiprocket?: ShiprocketDetails
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}

type DatabaseOrder = Prisma.OrderGetPayload<{
  include: { items: true }
}>

const includeItems = { items: true } as const

function decimalToNumber(value: Prisma.Decimal | null): number | undefined {
  return value === null ? undefined : Number(value)
}

function toOrder(order: DatabaseOrder): Order {
  const packageDimensions =
    order.packageLength !== null &&
    order.packageBreadth !== null &&
    order.packageHeight !== null
      ? {
          length: Number(order.packageLength),
          breadth: Number(order.packageBreadth),
          height: Number(order.packageHeight),
        }
      : undefined

  const invoice =
    order.invoiceNumber &&
    order.invoiceGeneratedAt &&
    order.invoiceStatus
      ? {
          invoiceNumber: order.invoiceNumber,
          generatedAt: order.invoiceGeneratedAt.toISOString(),
          status: order.invoiceStatus,
          invoiceFileName: order.invoiceFileName ?? undefined,
        }
      : undefined

  const shiprocket =
    order.shiprocketStatus && order.shiprocketUpdatedAt
      ? {
          status: order.shiprocketStatus,
          orderId: order.shiprocketOrderId ?? undefined,
          shipmentId: order.shipmentId ?? undefined,
          awbCode: order.awbCode ?? undefined,
          courierCompanyId: order.courierCompanyId ?? undefined,
          courierName: order.courierName ?? undefined,
          pickupScheduledDate:
            order.pickupScheduledDate?.toISOString() ?? null,
          pickupToken: order.pickupToken ?? null,
          pickupStatus: order.pickupStatus ?? null,
          manifestGenerated: order.manifestGenerated ?? undefined,
          manifestUrl: order.manifestUrl ?? null,
          error: order.shiprocketError ?? undefined,
          updatedAt: order.shiprocketUpdatedAt.toISOString(),
        }
      : undefined

  return {
    id: order.id,
    userId: order.userId,
    items: order.items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: Number(item.price),
      quantity: item.quantity,
      image: item.image,
      sku: item.sku ?? undefined,
      priceExcludingGst: decimalToNumber(item.priceExcludingGst),
    })),
    subtotal: decimalToNumber(order.subtotal),
    shippingCharge: decimalToNumber(order.shippingCharge),
    shipmentWeight: decimalToNumber(order.shipmentWeight),
    packageDimensions,
    total: Number(order.total),
    shipping: {
      name: order.shippingName,
      email: order.shippingEmail,
      phone: order.shippingPhone,
      address: order.shippingAddress,
      city: order.shippingCity,
      state: order.shippingState,
      pincode: order.shippingPincode,
    },
    payment: {
      status: order.paymentStatus,
      razorpayOrderId: order.razorpayOrderId,
      razorpayPaymentId: order.razorpayPaymentId ?? undefined,
    },
    invoice,
    shiprocket,
    status: order.status,
    createdAt: order.createdAt.toISOString(),
  }
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

function itemFields(orderId: string, item: OrderItem) {
  return {
    orderId,
    productId: item.productId,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    sku: item.sku,
    priceExcludingGst: item.priceExcludingGst,
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const orders = await prisma.order.findMany({
      include: includeItems,
      orderBy: { createdAt: 'desc' },
    })

    return orders.map(toOrder)
  } catch (error) {
    console.error('Failed to read orders:', error)
    return []
  }
}

export async function saveOrders(orders: Order[]): Promise<void> {
  await prisma.$transaction(async transaction => {
    for (const order of orders) {
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
          data: order.items.map(item => itemFields(order.id, item)),
        })
      }
    }
  })
}

export async function createOrder(
  orderData: Omit<Order, 'id' | 'createdAt'>
): Promise<Order> {
  const order = await prisma.order.create({
    data: {
      ...orderFields({
        ...orderData,
        id: '',
        createdAt: new Date().toISOString(),
      }),
      id: `AMPM-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
      user: { connect: { id: orderData.userId } },
      items: {
        create: orderData.items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          sku: item.sku,
          priceExcludingGst: item.priceExcludingGst,
        })),
      },
    },
    include: includeItems,
  })

  return toOrder(order)
}

export async function updateOrderPayment(
  razorpayOrderId: string,
  paymentData: { razorpayPaymentId: string }
): Promise<Order | null> {
  const updated = await prisma.order.updateMany({
    where: {
      razorpayOrderId,
      paymentStatus: 'pending',
    },
    data: {
      paymentStatus: 'paid',
      razorpayPaymentId: paymentData.razorpayPaymentId,
      status: 'confirmed',
    },
  })

  if (updated.count !== 1) {
    return null
  }

  const order = await prisma.order.update({
    where: { razorpayOrderId },
    data: {},
    include: includeItems,
  })

  return toOrder(order)
}

export async function updateOrderInvoice(
  orderId: string,
  invoice: InvoiceDetails
): Promise<Order | null> {
  const existing = await prisma.order.findUnique({
    where: { id: orderId },
  })

  if (!existing) {
    return null
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      invoiceNumber: invoice.invoiceNumber,
      invoiceGeneratedAt: new Date(invoice.generatedAt),
      invoiceStatus: invoice.status,
      invoiceFileName: invoice.invoiceFileName,
    },
    include: includeItems,
  })

  return toOrder(order)
}

export async function updateOrderShiprocket(
  orderId: string,
  shiprocket: ShiprocketDetails
): Promise<Order | null> {
  const existing = await prisma.order.findUnique({
    where: { id: orderId },
  })

  if (!existing) {
    return null
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      shiprocketStatus: shiprocket.status,
      shiprocketOrderId: shiprocket.orderId,
      shipmentId: shiprocket.shipmentId,
      awbCode: shiprocket.awbCode,
      courierCompanyId: shiprocket.courierCompanyId,
      courierName: shiprocket.courierName,
      pickupScheduledDate: shiprocket.pickupScheduledDate
        ? new Date(shiprocket.pickupScheduledDate)
        : shiprocket.pickupScheduledDate,
      pickupToken: shiprocket.pickupToken,
      pickupStatus: shiprocket.pickupStatus,
      manifestGenerated: shiprocket.manifestGenerated,
      manifestUrl: shiprocket.manifestUrl,
      shiprocketError: shiprocket.error,
      shiprocketUpdatedAt: new Date(shiprocket.updatedAt),
    },
    include: includeItems,
  })

  return toOrder(order)
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: includeItems,
    orderBy: { createdAt: 'desc' },
  })

  return orders.map(toOrder)
}

export async function getOrderById(
  orderId: string
): Promise<Order | undefined> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: includeItems,
  })

  return order ? toOrder(order) : undefined
}
