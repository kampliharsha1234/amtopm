import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateInvoicePdf } from '../lib/invoice.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sampleOrder = {
  id: 'AMPM-TEST-001',
  userId: 'demo-user',
  items: [
    {
      productId: 'amp-001',
      name: 'AM:PM Glow Cleanser',
      price: 1299,
      quantity: 1,
      image: '/images/products/cleanser.png',
      sku: 'AMP-001',
    },
    {
      productId: 'amp-002',
      name: 'AM:PM Barrier Serum',
      price: 2499,
      quantity: 1,
      image: '/images/products/serum.png',
      sku: 'AMP-002',
    },
  ],
  subtotal: 3798,
  shippingCharge: 199,
  shipmentWeight: 0.7,
  packageDimensions: { length: 18, breadth: 12, height: 10 },
  total: 3997,
  shipping: {
    name: 'Aarav Patil',
    email: 'demo@example.com',
    phone: '9876543210',
    address: '12, MG Road',
    city: 'Belagavi',
    state: 'Karnataka',
    pincode: '590001',
  },
  payment: {
    status: 'paid',
    razorpayOrderId: 'order_demo_123',
    razorpayPaymentId: 'pay_demo_123',
  },
  invoice: {
    invoiceNumber: 'AMPM/2026/000001',
    generatedAt: new Date().toISOString(),
    status: 'generated',
    invoiceFileName: 'amtopm-invoice-preview.pdf',
  },
  shiprocket: {
    status: 'created',
    updatedAt: new Date().toISOString(),
  },
  status: 'confirmed',
  createdAt: new Date().toISOString(),
}

const outputPath = path.join(__dirname, '..', 'preview-demo-invoice.pdf')
const pdf = await generateInvoicePdf(sampleOrder)
fs.writeFileSync(outputPath, pdf)
console.log(`Generated ${outputPath}`)
