import fs from 'fs'
import path from 'path'


/* ============================================================
   FILE
============================================================ */

const ordersFilePath =
  path.join(
    process.cwd(),
    'data',
    'orders.json'
  )


/* ============================================================
   ORDER TYPES
============================================================ */

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

  status:
    | 'generated'
    | 'draft'

  invoiceFileName?: string
}


/* ============================================================
   ORDER
============================================================ */

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
    status:
      | 'pending'
      | 'paid'
      | 'failed'

    razorpayOrderId: string

    razorpayPaymentId?: string
  }

  invoice?: InvoiceDetails

  shiprocket?: ShiprocketDetails

  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'

  createdAt: string
}


/* ============================================================
   ENSURE FILE
============================================================ */

function ensureOrdersFile() {
  const dataDirectory =
    path.dirname(
      ordersFilePath
    )


  if (
    !fs.existsSync(
      dataDirectory
    )
  ) {
    fs.mkdirSync(
      dataDirectory,
      {
        recursive: true,
      }
    )
  }


  if (
    !fs.existsSync(
      ordersFilePath
    )
  ) {
    fs.writeFileSync(
      ordersFilePath,
      '[]',
      'utf-8'
    )
  }
}


/* ============================================================
   GET ORDERS
============================================================ */

export function getOrders(): Order[] {
  try {
    ensureOrdersFile()


    const data =
      fs.readFileSync(
        ordersFilePath,
        'utf-8'
      )


    const parsed =
      JSON.parse(data)


    return Array.isArray(
      parsed
    )
      ? parsed
      : []

  } catch (error) {

    console.error(
      'Failed to read orders:',
      error
    )

    return []
  }
}


/* ============================================================
   SAVE ORDERS
============================================================ */

export function saveOrders(
  orders: Order[]
) {
  ensureOrdersFile()


  fs.writeFileSync(
    ordersFilePath,
    JSON.stringify(
      orders,
      null,
      2
    ),
    'utf-8'
  )
}


/* ============================================================
   CREATE ORDER
============================================================ */

export function createOrder(
  orderData:
    Omit<
      Order,
      'id' | 'createdAt'
    >
): Order {

  const orders =
    getOrders()


  const order: Order = {
    ...orderData,

    id:
      `AMPM-${Date.now()}`,

    createdAt:
      new Date().toISOString(),
  }


  orders.push(order)


  saveOrders(
    orders
  )


  return order
}


/* ============================================================
   UPDATE PAYMENT
============================================================ */

export function updateOrderPayment(
  razorpayOrderId: string,
  paymentData: {
    razorpayPaymentId: string
  }
): Order | null {

  const orders =
    getOrders()


  const orderIndex =
    orders.findIndex(
      order =>
        order.payment
          .razorpayOrderId ===
        razorpayOrderId
    )


  if (
    orderIndex === -1
  ) {
    return null
  }


  const order =
    orders[
      orderIndex
    ]


  const updatedOrder:
    Order = {
      ...order,

      payment: {
        ...order.payment,

        status:
          'paid',

        razorpayPaymentId:
          paymentData
            .razorpayPaymentId,
      },

      status:
        'confirmed',
    }


  orders[
    orderIndex
  ] =
    updatedOrder


  saveOrders(
    orders
  )


  return updatedOrder
}


/* ============================================================
   UPDATE INVOICE
============================================================ */

export function updateOrderInvoice(
  orderId: string,
  invoice: InvoiceDetails
): Order | null {

  const orders =
    getOrders()


  const orderIndex =
    orders.findIndex(
      order =>
        order.id ===
        orderId
    )


  if (
    orderIndex === -1
  ) {
    return null
  }


  const updatedOrder:
    Order = {
      ...orders[
        orderIndex
      ],

      invoice,
    }


  orders[
    orderIndex
  ] =
    updatedOrder


  saveOrders(
    orders
  )


  return updatedOrder
}


/* ============================================================
   UPDATE SHIPROCKET
============================================================ */

export function updateOrderShiprocket(
  orderId: string,
  shiprocket: ShiprocketDetails
): Order | null {

  const orders =
    getOrders()


  const orderIndex =
    orders.findIndex(
      order =>
        order.id ===
        orderId
    )


  if (
    orderIndex === -1
  ) {
    return null
  }


  const updatedOrder:
    Order = {
      ...orders[
        orderIndex
      ],

      shiprocket,
    }


  orders[
    orderIndex
  ] =
    updatedOrder


  saveOrders(
    orders
  )


  return updatedOrder
}


/* ============================================================
   GET USER ORDERS
============================================================ */

export function getOrdersByUserId(
  userId: string
): Order[] {

  return getOrders()
    .filter(
      order =>
        order.userId ===
        userId
    )
    .sort(
      (a, b) =>
        new Date(
          b.createdAt
        ).getTime() -
        new Date(
          a.createdAt
        ).getTime()
    )
}


/* ============================================================
   GET ORDER
============================================================ */

export function getOrderById(
  orderId: string
): Order | undefined {

  return getOrders().find(
    order =>
      order.id ===
      orderId
  )
}