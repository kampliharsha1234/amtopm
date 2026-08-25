'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [step] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'razorpay'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Checkout functionality coming soon! Razorpay integration will be added.')
  }

  return (
    <div className="bg-[#F7F2EB] min-h-screen">
      
      <section className="py-8 sm:py-12 px-5 sm:px-8 md:px-12 bg-white/50">
        <div className="max-w-7xl mx-auto w-full">
          <Link href="/cart" className="body-text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition">
            ← Back to Cart
          </Link>
          <h1 className="section-heading mt-4">Checkout</h1>
        </div>
      </section>

      <section className="py-8 sm:py-12 px-5 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto w-full">
          
          <div className="flex items-center justify-between mb-8">
            {['Shipping', 'Payment', 'Confirm'].map((label, index) => (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index + 1 <= step ? 'bg-[#E85D2C] text-white' : 'bg-[#E8DFD3] text-[#6B6B6B]'
                }`}>
                  {index + 1}
                </div>
                <span className={`text-xs ml-2 ${
                  index + 1 <= step ? 'text-[#171717]' : 'text-[#6B6B6B]'
                }`}>
                  {label}
                </span>
                {index < 2 && <div className="w-12 h-px bg-[#E8DFD3] mx-4" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="meta-text block mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="meta-text block mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
                  placeholder="john@email.com"
                />
              </div>
              <div>
                <label className="meta-text block mb-1.5">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="meta-text block mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="meta-text block mb-1.5">Pincode</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value }))}
                    className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] focus:outline-none focus:border-[#E85D2C] transition"
                    placeholder="400001"
                  />
                </div>
              </div>

              <div className="pt-4">
                <label className="meta-text block mb-1.5">Payment Method</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'razorpay' }))}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.paymentMethod === 'razorpay'
                        ? 'border-[#E85D2C] bg-[#FCE6D9] text-[#E85D2C]'
                        : 'border-[#E8DFD3] bg-white hover:border-[#E85D2C]'
                    }`}
                  >
                    💳 Razorpay
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-[#E85D2C] bg-[#FCE6D9] text-[#E85D2C]'
                        : 'border-[#E8DFD3] bg-white hover:border-[#E85D2C]'
                    }`}
                  >
                    📦 Cash on Delivery
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary w-full mt-6">
                Place Order
              </button>
            </div>
          </form>

          <div className="mt-6 text-center body-text-sm text-[#6B6B6B]">
            <p>🔒 Your information is secure and will not be shared.</p>
          </div>
        </div>
      </section>
    </div>
  )
}