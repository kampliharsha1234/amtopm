import fs from 'fs'
import path from 'path'
import { generateInvoicePdf } from '../lib/invoice'

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
    status: 'paid' as const,
    razorpayOrderId: 'order_demo_123',
    razorpayPaymentId: 'pay_demo_123',
  },
  invoice: {
    invoiceNumber: 'AMPM/2026/000001',
    generatedAt: new Date().toISOString(),
    status: 'generated' as const,
    invoiceFileName: 'amtopm-invoice-preview.pdf',
  },
  shiprocket: {
    status: 'created' as const,
    updatedAt: new Date().toISOString(),
  },
  status: 'confirmed' as const,
  createdAt: new Date().toISOString(),
}

async function main() {
  const outputPath = path.join(process.cwd(), 'preview-demo-invoice.pdf')
  const pdf = await generateInvoicePdf(sampleOrder)
  fs.writeFileSync(outputPath, pdf)
  console.log(`Generated ${outputPath}`)
}

main().catch((error) => {
  console.error('Failed to generate invoice preview:', error)
  process.exit(1)
})
