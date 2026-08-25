'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { useState } from 'react'

import { getProductById, products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const product = getProductById(id)
  const { addToCart } = useCart()

  const [added, setAdded] = useState(false)
  const [ingredientsOpen, setIngredientsOpen] = useState(false)

  if (!product) {
    notFound()
  }

  const routine =
    product.category === 'am'
      ? 'AM'
      : product.category === 'pm'
        ? 'PM'
        : 'AM + PM'

  const routineLabel =
    product.category === 'am'
      ? 'Morning routine'
      : product.category === 'pm'
        ? 'Evening routine'
        : 'Morning & evening'

  const otherProducts = products.filter(
    (item) => item.id !== product.id
  )

  const handleAddToCart = () => {
    addToCart(product, 1)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  const scrollProducts = (direction: 'left' | 'right') => {
    const carousel = document.getElementById(
      'other-products-carousel'
    )

    if (!carousel) return

    carousel.scrollBy({
      left: direction === 'right' ? 360 : -360,
      behavior: 'smooth',
    })
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--black)]">

      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <Navbar />

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="pt-[96px] pb-28 sm:pt-[108px]">

        {/* =======================================================
            PRODUCT HERO
        ======================================================= */}

        <section className="px-5 sm:px-8 md:px-12">

          <div className="mx-auto max-w-7xl">

            <Link
              href="/shop"
              className="editorial-link text-[var(--black-muted)] transition-colors hover:text-[var(--orange)]"
            >
              ← Back to shop
            </Link>

            <div className="mt-5 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">

              {/* PRODUCT IMAGE */}

              <div>

                <div className="product-image aspect-square bg-white">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />

                </div>

                <div className="mt-2 flex items-center justify-between">

                  <span className="meta-text text-[var(--black-muted)]">
                    AM:PM
                  </span>

                  <span className="body-text-sm">
                    {routine}
                  </span>

                </div>

              </div>

              {/* PRODUCT INFO */}

              <div className="flex flex-col justify-center">

                <div className="flex items-center gap-3">

                  <span className="meta-text text-orange">
                    {routine}
                  </span>

                  <span className="h-px w-6 bg-[var(--border)]" />

                  <span className="meta-text text-[var(--black-muted)]">
                    {product.inStock
                      ? 'In stock'
                      : 'Out of stock'}
                  </span>

                </div>

                <h1 className="section-heading mt-4">
                  {product.name}
                </h1>

                <p className="font-serif mt-3 text-[1.25rem] leading-[1.15] tracking-[-0.02em] text-[var(--black-soft)] sm:text-[1.45rem]">
                  {product.tagline}
                </p>

                {/* PRICE */}

                <div className="mt-5 flex items-baseline gap-4 border-y border-[var(--border)] py-4">

                  <span className="font-serif text-3xl tracking-[-0.03em]">
                    ₹{product.price}
                  </span>

                  <span className="body-text-sm">
                    Inclusive of all taxes
                  </span>

                </div>

                {/* KEY POINTS */}

                <div className="mt-5">

                  <p className="meta-text">
                    KEY POINTS
                  </p>

                  <div className="mt-3 grid grid-cols-1 border-y border-[var(--border)] sm:grid-cols-2">

                    {product.keyBenefits
                      .slice(0, 4)
                      .map((benefit, index) => (

                        <div
                          key={benefit}
                          className={`flex items-start gap-3 py-3 ${
                            index % 2 === 0
                              ? 'sm:border-r sm:border-[var(--border)]'
                              : ''
                          } ${
                            index < 2
                              ? 'border-b border-[var(--border)]'
                              : ''
                          }`}
                        >

                          <span className="text-sm text-orange">
                            +
                          </span>

                          <span className="body-text-sm text-[var(--black-soft)]">
                            {benefit}
                          </span>

                        </div>

                      ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            HOW TO USE
        ========================================================= */}

        <section className="mt-14 border-y border-[var(--border)] bg-[var(--cream-light)]">

          <div className="mx-auto grid max-w-7xl md:grid-cols-2">

            {/* VIDEO */}

            <div className="flex aspect-video items-center justify-center bg-[var(--black-soft)] md:aspect-auto md:min-h-[390px]">

              <div className="px-8 text-center text-white">

                <div className="mx-auto flex h-14 w-14 items-center justify-center border border-white/30">

                  <span className="text-lg">
                    ▶
                  </span>

                </div>

                <p className="meta-text-white mt-4">
                  HOW TO USE
                </p>

                <p className="font-serif mt-2 text-xl">
                  Video coming soon
                </p>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/55">
                  We&apos;re preparing a quick guide to help you get the
                  most from your AM:PM routine.
                </p>

              </div>

            </div>

            {/* INSTRUCTIONS */}

            <div className="flex items-center px-6 py-10 sm:px-10 md:px-12 lg:px-16">

              <div className="w-full">

                <p className="meta-text text-orange">
                  YOUR ROUTINE
                </p>

                <h2 className="section-heading mt-3">
                  How to use
                </h2>

                <div className="mt-5 flex items-center border-y border-[var(--border)]">

                  <div className="flex-1 py-3">

                    <p className="meta-text text-orange">
                      {routine}
                    </p>

                  </div>

                  <div className="h-7 w-px bg-[var(--border)]" />

                  <div className="flex-1 py-3 pl-5">

                    <p className="body-text-sm">
                      {routineLabel}
                    </p>

                  </div>

                </div>

                <p className="body-text mt-5">
                  {product.howToUse}
                </p>

                <p className="body-text-sm mt-4">
                  Always introduce new skincare products gradually and
                  discontinue use if irritation occurs.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            INGREDIENTS
        ========================================================= */}

        <section className="px-5 py-14 sm:px-8 md:px-12">

          <div className="mx-auto max-w-5xl">

            <div className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] md:gap-12">

              <div>

                <p className="meta-text text-orange">
                  FORMULA
                </p>

                <h2 className="section-heading mt-3">
                  Ingredients
                </h2>

                <p className="body-text-sm mt-3">
                  A closer look at what goes into your product.
                </p>

              </div>

              <div>

                <button
                  type="button"
                  onClick={() =>
                    setIngredientsOpen(!ingredientsOpen)
                  }
                  className="flex w-full items-center justify-between border-y border-[var(--border)] py-4 text-left"
                >

                  <span className="meta-text">
                    {ingredientsOpen
                      ? 'Hide ingredient breakdown'
                      : 'View ingredient breakdown'}
                  </span>

                  <span className="text-xl">
                    {ingredientsOpen ? '−' : '+'}
                  </span>

                </button>

                {ingredientsOpen && (

                  <div className="border-b border-[var(--border)]">

                    {product.ingredients.map(
                      (ingredient, index) => (

                        <div
                          key={ingredient}
                          className="flex items-center justify-between border-b border-[var(--border)] py-3 last:border-b-0"
                        >

                          <span className="body-text-sm">
                            {ingredient}
                          </span>

                          <span className="text-[10px] text-[var(--black-muted)]">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            DESCRIPTION
        ========================================================= */}

        <section className="bg-[var(--black)] px-5 py-14 text-white sm:px-8 md:px-12">

          <div className="mx-auto max-w-5xl">

            <div className="grid gap-6 md:grid-cols-[0.6fr_1.4fr] md:gap-12">

              <div>

                <p className="meta-text-white text-orange">
                  THE FORMULA
                </p>

              </div>

              <div>

                <p className="font-serif text-2xl leading-[1.1] tracking-[-0.025em] sm:text-3xl">
                  {product.description}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            REVIEWS
        ========================================================= */}

        <section className="px-5 py-14 sm:px-8 md:px-12">

          <div className="mx-auto max-w-5xl">

            <div className="text-center">

              <p className="meta-text text-orange">
                REAL PEOPLE. REAL EXPERIENCES.
              </p>

              <h2 className="section-heading mt-3">
                Reviews
              </h2>

              <div className="mt-5 flex justify-center gap-1 text-lg">
                ★★★★★
              </div>

              <p className="body-text-sm mt-3">
                Reviews will appear here once customers start sharing
                their experience.
              </p>

            </div>

            <div className="mt-7 border-y border-[var(--border)] py-7 text-center">

              <p className="font-serif text-xl">
                Be the first to review this product.
              </p>

              <p className="body-text-sm mt-2">
                Your experience can help someone choose their routine.
              </p>

            </div>

          </div>

        </section>

        {/* =========================================================
            VIEW OTHER PRODUCTS
        ========================================================= */}

        <section className="px-5 pb-14 sm:px-8 md:px-12">

          <div className="mx-auto max-w-7xl">

            <div className="overflow-hidden rounded-[28px] bg-[#EEE8DE] px-5 py-7 sm:px-8 sm:py-9 md:px-10">

              {/* HEADER */}

              <div className="flex items-end justify-between gap-5">

                <div>

                  <p className="meta-text text-orange">
                    COMPLETE YOUR ROUTINE
                  </p>

                  <h2 className="mt-2 font-serif text-3xl leading-none tracking-[-0.03em] text-[var(--black)] sm:text-4xl">
                    View other products
                  </h2>

                </div>

                {/* DESKTOP CONTROLS */}

                <div className="hidden items-center gap-2 sm:flex">

                  <button
                    type="button"
                    onClick={() => scrollProducts('left')}
                    aria-label="Previous products"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-base transition-all hover:bg-[var(--black)] hover:text-white"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollProducts('right')}
                    aria-label="Next products"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-base transition-all hover:bg-[var(--black)] hover:text-white"
                  >
                    →
                  </button>

                </div>

              </div>

              {/* ===================================================
                  PRODUCT CAROUSEL
              =================================================== */}

              <div
                id="other-products-carousel"
                className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >

                {otherProducts.map((item) => (

                  <Link
                    key={item.id}
                    href={`/shop/${item.id}`}
                    className="group w-[68vw] shrink-0 snap-start sm:w-[calc((100%-2rem)/3)]"
                  >

                    {/* CARD */}

                    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.08)]">

                      {/* IMAGE */}

                      <div className="relative aspect-square overflow-hidden bg-[#F8F5EF]">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                        />

                        <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm">
                          ₹{item.price}
                        </span>

                      </div>

                      {/* CARD CONTENT */}

                      <div className="p-4 sm:p-5">

                        <h3 className="text-base font-medium leading-tight text-[var(--black)]">
                          {item.name}
                        </h3>

                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--black-muted)]">
                          {item.tagline}
                        </p>

                        <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-3">

                          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--black-muted)]">
                            {item.category === 'both'
                              ? 'AM + PM'
                              : item.category.toUpperCase()}
                          </span>

                          <span className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--orange)]">
                            Explore →
                          </span>

                        </div>

                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />

      {/* =========================================================
          STICKY ADD TO BAG
      ========================================================= */}

      <div
        className="fixed inset-x-0 bottom-0 z-[9999] block w-full border-t border-black/15 bg-[#F5F1E9] shadow-[0_-4px_20px_rgba(0,0,0,0.10)]"
        style={{
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >

        <div className="mx-auto flex w-full max-w-7xl items-center px-3 py-2.5 sm:px-8">

          {/* DESKTOP PRODUCT INFO */}

          <div className="hidden min-w-0 flex-1 sm:block">

            <p className="truncate text-sm font-medium text-[#171717]">
              {product.name}
            </p>

            <p className="mt-0.5 text-xs text-[#68655f]">
              ₹{product.price}
            </p>

          </div>

          {/* ADD TO BAG */}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to bag`}
            className="flex h-12 w-full flex-1 items-center justify-center rounded-sm bg-[#E85B32] px-4 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[#171717] active:bg-[#171717] disabled:cursor-not-allowed disabled:bg-[#999999] sm:w-auto sm:min-w-[360px] sm:flex-none"
          >

            {added
              ? '✓ Added to Bag'
              : product.inStock
                ? `Add to Bag — ₹${product.price}`
                : 'Out of Stock'}

          </button>

        </div>

      </div>

    </div>
  )
}