'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState } from 'react'
import { getProductById } from '../../data/products'
import { useCart } from '../../context/CartContext'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#F7F2EB] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="px-5 sm:px-8 md:px-12 pt-6 sm:pt-8">
        <div className="max-w-7xl mx-auto w-full">
          <Link href="/shop" className="body-text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition">
            ← Back to Shop
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 sm:py-12 px-5 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            
            {/* Product Image */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 flex items-center justify-center aspect-square shadow-sm">
              <span className="text-7xl sm:text-8xl opacity-60">
                {product.id.includes('spf') ? '☀️' : 
                 product.id.includes('acne') ? '🧴' : 
                 product.id.includes('dark') ? '✨' : '🧴'}
              </span>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.concern.map((c) => (
                  <span key={c} className="text-[10px] sm:text-xs px-3 py-1 bg-[#FCE6D9] text-[#E85D2C] rounded-full font-medium">
                    {c}
                  </span>
                ))}
                <span className="text-[10px] sm:text-xs px-3 py-1 bg-[#F0EBE5] text-[#6B6B6B] rounded-full font-medium">
                  {product.category.toUpperCase()}
                </span>
              </div>

              <h1 className="section-heading">{product.name}</h1>
              <p className="sub-heading text-[#3D3D3D] mt-2">{product.tagline}</p>
              
              <div className="mt-6 py-6 border-y border-[#E8DFD3]">
                <p className="text-3xl sm:text-4xl font-semibold text-[#E85D2C]">₹{product.price}</p>
                <p className="body-text-sm text-[#6B6B6B] mt-1">In stock</p>
              </div>

              <div className="mt-6">
                <h3 className="product-title-sm">Description</h3>
                <p className="body-text mt-2">{product.description}</p>
              </div>

              <div className="mt-6">
                <h3 className="product-title-sm">Key Benefits</h3>
                <ul className="mt-2 space-y-1.5">
                  {product.keyBenefits.map((benefit, index) => (
                    <li key={index} className="body-text-sm flex items-start gap-2">
                      <span className="text-[#E85D2C] mt-0.5">✦</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="product-title-sm">How to Use</h3>
                <p className="body-text-sm mt-2">{product.howToUse}</p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAddToCart}
                  className={`btn-primary transition-all ${added ? 'bg-green-600 hover:bg-green-600' : ''}`}
                >
                  {added ? '✓ Added to Bag' : `Add to Bag — ₹${product.price}`}
                </button>
                <button className="btn-secondary">
                  Add to Wishlist
                </button>
              </div>

              {/* Ingredients */}
              <div className="mt-8 pt-6 border-t border-[#E8DFD3]">
                <h3 className="product-title-sm">Ingredients</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.ingredients.map((ingredient) => (
                    <span key={ingredient} className="body-text-sm px-3 py-1.5 bg-white rounded-full border border-[#E8DFD3]">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}