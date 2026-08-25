'use client'

import Link from 'next/link'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    hydrated,
  } = useCart()

  const shipping = items.length > 0 ? 99 : 0
  const total = subtotal + shipping

  /* ============================================================
     WAIT FOR CART TO LOAD FROM LOCAL STORAGE
  ============================================================ */

  if (!hydrated) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

        <section className="flex min-h-[72vh] items-center justify-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
          <div className="w-full max-w-[520px] text-center">

            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-[#E8DFD3] border-t-[#E85D2C]" />

            <p className="mt-5 text-[9px] font-medium uppercase tracking-[0.25em] text-[#6B6B6B]">
              Loading your bag
            </p>

          </div>
        </section>

        <Footer />

      </main>
    )
  }

  /* ============================================================
     EMPTY CART
  ============================================================ */

  if (items.length === 0) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

        <section className="flex min-h-[72vh] items-center justify-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36">

          <div className="w-full max-w-[520px] text-center">

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#E85D2C]">
              YOUR AM · PM ROUTINE
            </p>

            <h1 className="mt-3 font-serif text-[48px] leading-[0.88] tracking-[-0.055em] sm:text-[68px]">
              Your bag is
              <br />
              <span className="italic text-[#E85D2C]">
                waiting.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-[340px] text-[11px] leading-[1.6] text-[#6B6B6B] sm:text-[12px]">
              Start building your AM and PM routine with skincare that actually makes sense.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex min-h-[46px] items-center justify-center bg-[#1A1A1A] px-7 text-[9px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#E85D2C]"
            >
              Shop skincare
            </Link>

          </div>

        </section>

        <Footer />

      </main>
    )
  }

  /* ============================================================
     POPULATED CART
  ============================================================ */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* PAGE HEADER */}

      <section className="px-5 pb-8 pt-32 sm:px-8 sm:pb-10 sm:pt-36">

        <div className="mx-auto max-w-7xl">

          <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#E85D2C]">
            AM · PM · EVERY DAY
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="font-serif text-[50px] leading-[0.85] tracking-[-0.055em] sm:text-[70px]">
                Your bag.
              </h1>

              <p className="mt-3 text-[10px] text-[#6B6B6B] sm:text-[11px]">
                {items.length}{' '}
                {items.length === 1 ? 'product' : 'products'}{' '}
                in your routine
              </p>

            </div>

            <Link
              href="/shop"
              className="w-fit text-[8px] font-medium uppercase tracking-[0.18em] text-[#E85D2C] transition-colors hover:text-[#D14E20]"
            >
              Continue shopping →
            </Link>

          </div>

        </div>

      </section>


      {/* CART CONTENT */}

      <section className="px-4 pb-14 sm:px-6 sm:pb-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-5 lg:grid-cols-[1fr_360px] lg:gap-8">

            {/* CART ITEMS */}

            <div className="space-y-2.5 sm:space-y-3">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="border border-[#E8DFD3] bg-[#FBF8F3] p-3 sm:p-4"
                >

                  <div className="flex gap-3 sm:gap-5">

                    {/* PRODUCT IMAGE */}

                    <Link
                      href={`/shop/${item.id}`}
                      className="relative h-[96px] w-[86px] shrink-0 overflow-hidden bg-[#E8DFD3] sm:h-[125px] sm:w-[112px]"
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    </Link>


                    {/* PRODUCT INFO */}

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">

                      <div>

                        <Link
                          href={`/shop/${item.id}`}
                          className="block font-serif text-[19px] leading-[0.95] tracking-[-0.03em] transition-colors hover:text-[#E85D2C] sm:text-[25px]"
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 line-clamp-1 text-[8px] leading-relaxed text-[#6B6B6B] sm:text-[10px]">
                          {item.product.tagline}
                        </p>

                        <p className="mt-2 text-[12px] font-medium text-[#E85D2C] sm:text-[14px]">
                          ₹{item.price}
                        </p>

                      </div>


                      {/* QUANTITY + REMOVE */}

                      <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">

                        <div className="flex h-[31px] items-center border border-[#E8DFD3] bg-[#F7F2EB]">

                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="flex h-full w-[30px] items-center justify-center text-[14px] text-[#1A1A1A] transition-colors hover:text-[#E85D2C]"
                          >
                            −
                          </button>

                          <span className="flex h-full w-[28px] items-center justify-center border-x border-[#E8DFD3] text-[9px] font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                            className="flex h-full w-[30px] items-center justify-center text-[14px] text-[#1A1A1A] transition-colors hover:text-[#E85D2C]"
                          >
                            +
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[7px] font-medium uppercase tracking-[0.15em] text-[#8A837B] transition-colors hover:text-[#E85D2C] sm:text-[8px]"
                        >
                          Remove
                        </button>

                      </div>

                    </div>


                    {/* DESKTOP TOTAL */}

                    <div className="hidden shrink-0 text-right sm:block">

                      <p className="text-[14px] font-medium">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                  </div>


                  {/* MOBILE TOTAL */}

                  <div className="mt-2 flex justify-end border-t border-[#E8DFD3] pt-2 sm:hidden">

                    <p className="text-[10px] font-medium">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            {/* ORDER SUMMARY */}

            <aside className="h-fit lg:sticky lg:top-[105px]">

              <div className="border border-[#E8DFD3] bg-[#FBF8F3] p-5 sm:p-6">

                {/* SUMMARY HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                      YOUR ROUTINE
                    </p>

                    <h2 className="mt-2 font-serif text-[28px] leading-none tracking-[-0.04em]">
                      Order summary
                    </h2>

                  </div>

                  <span className="text-[9px] text-[#8A837B]">
                    {items.length}{' '}
                    {items.length === 1 ? 'item' : 'items'}
                  </span>

                </div>


                {/* SUMMARY */}

                <div className="mt-7 space-y-3">

                  <div className="flex justify-between text-[10px]">

                    <span className="text-[#6B6B6B]">
                      Subtotal
                    </span>

                    <span>
                      ₹{subtotal}
                    </span>

                  </div>

                  <div className="flex justify-between text-[10px]">

                    <span className="text-[#6B6B6B]">
                      Shipping
                    </span>

                    <span>
                      ₹{shipping}
                    </span>

                  </div>

                  <div className="mt-4 flex items-end justify-between border-t border-[#E8DFD3] pt-4">

                    <span className="text-[9px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                      Total
                    </span>

                    <span className="font-serif text-[28px] leading-none tracking-[-0.03em]">
                      ₹{total}
                    </span>

                  </div>

                </div>


                {/* CHECKOUT */}

                <Link
                  href="/checkout"
                  className="mt-6 flex min-h-[48px] w-full items-center justify-center bg-[#E85D2C] px-5 text-[8px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#D14E20]"
                >
                  Proceed to checkout →
                </Link>


                {/* CONTINUE */}

                <Link
                  href="/shop"
                  className="mt-4 block text-center text-[8px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B] transition-colors hover:text-[#E85D2C]"
                >
                  ← Continue shopping
                </Link>


                {/* TRUST NOTE */}

                <div className="mt-7 border-t border-[#E8DFD3] pt-5">

                  <p className="text-[8px] leading-[1.6] text-[#8A837B]">
                    Science-first skincare.
                    <br />
                    No hype. Just care.
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* FOOTER */}

      <Footer />

    </main>
  )
}