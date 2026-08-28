import fs from 'fs'
import path from 'path'

const ordersFilePath = path.join(
  process.cwd(),
  'data',
  'orders.json'
)

export type OrderItem = {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export type ShippingDetails = {
  name: string
  email: string
  address: string
  city: string
  pincode: string
}

export type Order = {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  shipping: ShippingDetails

  payment: {
    status: 'pending' | 'paid' | 'failed'
    razorpayOrderId: string
    razorpayPaymentId?: string
  }

  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'

  createdAt: string
}

function ensureOrdersFile() {
  const dataDirectory = path.dirname(ordersFilePath)

  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, {
      recursive: true,
    })
  }

  if (!fs.existsSync(ordersFilePath)) {
    fs.writeFileSync(
      ordersFilePath,
      '[]',
      'utf-8'
    )
  }
}

export function getOrders(): Order[] {
  try {
    ensureOrdersFile()

    const data = fs.readFileSync(
      ordersFilePath,
      'utf-8'
    )

    const parsed = JSON.parse(data)

    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error(
      'Failed to read orders:',
      error
    )

    return []
  }
}

export function saveOrders(orders: Order[]) {
  ensureOrdersFile()

  fs.writeFileSync(
    ordersFilePath,
    JSON.stringify(orders, null, 2),
    'utf-8'
  )
}

export function createOrder(
  orderData: Omit<Order, 'id' | 'createdAt'>
): Order {
  const orders = getOrders()

  const order: Order = {
    ...orderData,
    id: `AMPM-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }

  orders.push(order)

  saveOrders(orders)

  return order
}

export function updateOrderPayment(
  razorpayOrderId: string,
  paymentData: {
    razorpayPaymentId: string
  }
): Order | null {
  const orders = getOrders()

  const orderIndex = orders.findIndex(
    order =>
      order.payment.razorpayOrderId ===
      razorpayOrderId
  )

  if (orderIndex === -1) {
    return null
  }

  const order = orders[orderIndex]

  const updatedOrder: Order = {
    ...order,

    payment: {
      ...order.payment,
      status: 'paid',
      razorpayPaymentId:
        paymentData.razorpayPaymentId,
    },

    status: 'confirmed',
  }

  orders[orderIndex] = updatedOrder

  saveOrders(orders)

  return updatedOrder
}

export function getOrdersByUserId(
  userId: string
): Order[] {
  return getOrders()
    .filter(order => order.userId === userId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
}

export function getOrderById(
  orderId: string
): Order | undefined {
  return getOrders().find(
    order => order.id === orderId
  )
}