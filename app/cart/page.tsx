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
     WAIT FOR CART TO LOAD
  ============================================================ */

  if (!hydrated) {
    return (
      <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">
        <section className="flex min-h-[72vh] items-center justify-center px-5 pb-16 pt-32 sm:px-8 sm:pt-36">
          <div className="w-full max-w-[520px] text-center">

            <div className="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-[#E8DFD3] border-t-[#E85D2C]" />

            <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#6B6B6B]">
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

            <p className="text-[10px] font-medium lowercase tracking-[0.25em] text-[#E85D2C]">
              amtopm
            </p>

            <h1
              className="
                mt-4
                font-sans
                text-[42px]
                font-bold
                leading-[0.94]
                tracking-[-0.04em]
                sm:text-[56px]
              "
            >
              Your bag is
              <br />
              <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                waiting.
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[360px] text-[14px] font-light leading-[1.6] text-[#6B6B6B]">
              Start building your skincare routine.
            </p>

            <Link
              href="/shop"
              className="
                mt-7
                inline-flex
                min-h-[46px]
                items-center
                justify-center
                rounded-full
                bg-[#1A1A1A]
                px-7
                text-[14px]
                font-medium
                text-white
                transition-all
                hover:bg-[#E85D2C]
              "
            >
              Shop skincare →
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

      {/* ========================================================
          PAGE HEADER
      ======================================================== */}

      <section className="px-5 pb-8 pt-32 sm:px-8 sm:pb-10 sm:pt-36">
        <div className="mx-auto max-w-7xl">

          <p className="text-[10px] font-medium lowercase tracking-[0.25em] text-[#E85D2C]">
            amtopm
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1
                className="
                  font-sans
                  text-[42px]
                  font-bold
                  leading-[0.9]
                  tracking-[-0.04em]
                  sm:text-[56px]
                "
              >
                Your bag.
              </h1>

              <p className="mt-3 text-[14px] font-light text-[#6B6B6B]">
                {items.length}{' '}
                {items.length === 1 ? 'product' : 'products'}{' '}
                in your routine
              </p>

            </div>

            <Link
              href="/shop"
              className="
                w-fit
                rounded-full
                px-4
                py-2
                text-[14px]
                font-medium
                text-[#E85D2C]
                transition-all
                hover:bg-[#FCE6D9]
              "
            >
              Continue shopping →
            </Link>

          </div>

        </div>
      </section>


      {/* ========================================================
          CART CONTENT
      ======================================================== */}

      <section className="px-4 pb-48 sm:px-6 sm:pb-52">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">

            {/* ==================================================
                CART ITEMS
            ================================================== */}

            <div className="space-y-3">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="
                    border
                    border-[#E8DFD3]
                    bg-[#FBF8F3]
                    p-3
                    sm:p-4
                  "
                >

                  <div className="flex gap-3 sm:gap-5">

                    {/* PRODUCT IMAGE */}

                    <Link
                      href={`/shop/${item.id}`}
                      className="
                        relative
                        h-[96px]
                        w-[86px]
                        shrink-0
                        overflow-hidden
                        rounded-[18px]
                        bg-[#E8DFD3]
                        sm:h-[125px]
                        sm:w-[112px]
                      "
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
                          className="
                            block
                            font-sans
                            text-[18px]
                            font-semibold
                            leading-[1.05]
                            tracking-[-0.02em]
                            transition-colors
                            hover:text-[#E85D2C]
                            sm:text-[21px]
                          "
                        >
                          {item.name}
                        </Link>

                        <p className="mt-1 line-clamp-1 text-[14px] font-light leading-relaxed text-[#6B6B6B]">
                          {item.product.tagline}
                        </p>

                        <p className="mt-2 text-[14px] font-semibold text-[#E85D2C]">
                          ₹{item.price}
                        </p>

                      </div>


                      {/* QUANTITY + REMOVE */}

                      <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">

                        <div className="
                          flex
                          h-[34px]
                          items-center
                          rounded-full
                          border
                          border-[#E8DFD3]
                          bg-[#F7F2EB]
                        ">

                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="
                              flex
                              h-full
                              w-[32px]
                              items-center
                              justify-center
                              rounded-full
                              text-[16px]
                              text-[#1A1A1A]
                              transition-colors
                              hover:text-[#E85D2C]
                            "
                          >
                            −
                          </button>

                          <span className="
                            flex
                            h-full
                            min-w-[28px]
                            items-center
                            justify-center
                            border-x
                            border-[#E8DFD3]
                            px-2
                            text-[10px]
                            font-medium
                          ">
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
                            className="
                              flex
                              h-full
                              w-[32px]
                              items-center
                              justify-center
                              rounded-full
                              text-[16px]
                              text-[#1A1A1A]
                              transition-colors
                              hover:text-[#E85D2C]
                            "
                          >
                            +
                          </button>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="
                            rounded-full
                            px-3
                            py-1.5
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.12em]
                            text-[#8A837B]
                            transition-all
                            hover:bg-[#FCE6D9]
                            hover:text-[#E85D2C]
                          "
                        >
                          Remove
                        </button>

                      </div>

                    </div>


                    {/* DESKTOP ITEM TOTAL */}

                    <div className="hidden shrink-0 pt-1 text-right sm:block">

                      <p className="text-[14px] font-semibold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>

                  </div>


                  {/* MOBILE ITEM TOTAL */}

                  <div className="mt-3 flex justify-end border-t border-[#E8DFD3] pt-2 sm:hidden">

                    <p className="text-[11px] font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            {/* ==================================================
                ORDER SUMMARY
            ================================================== */}

            <aside className="h-fit lg:sticky lg:top-[105px]">

              <div className="
                border
                border-[#E8DFD3]
                bg-[#FBF8F3]
                p-5
                sm:p-6
              ">

                {/* SUMMARY HEADER */}

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[9px] font-medium lowercase tracking-[0.2em] text-[#E85D2C]">
                      amtopm
                    </p>

                    <h2 className="
                      mt-2
                      font-sans
                      text-[24px]
                      font-semibold
                      leading-none
                      tracking-[-0.02em]
                    ">
                      Order Summary
                    </h2>

                  </div>

                  <span className="text-[10px] font-light text-[#8A837B]">
                    {items.length}{' '}
                    {items.length === 1 ? 'item' : 'items'}
                  </span>

                </div>


                {/* SUMMARY DETAILS */}

                <div className="mt-7 space-y-3">

                  <div className="flex justify-between text-[14px]">

                    <span className="font-light text-[#6B6B6B]">
                      Subtotal
                    </span>

                    <span className="font-medium">
                      ₹{subtotal}
                    </span>

                  </div>

                  <div className="flex justify-between text-[14px]">

                    <span className="font-light text-[#6B6B6B]">
                      Shipping
                    </span>

                    <span className="font-medium">
                      ₹{shipping}
                    </span>

                  </div>

                  <div className="
                    mt-4
                    flex
                    items-end
                    justify-between
                    border-t
                    border-[#E8DFD3]
                    pt-4
                  ">

                    <span className="
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-[#6B6B6B]
                    ">
                      Total
                    </span>

                    <span className="
                      font-sans
                      text-[27px]
                      font-semibold
                      leading-none
                      tracking-[-0.03em]
                    ">
                      ₹{total}
                    </span>

                  </div>

                </div>


                {/* ==================================================
                    DESKTOP ONLY CHECKOUT BUTTON

                    Hidden on mobile because the sticky bottom
                    checkout bar is the primary mobile CTA.
                ================================================== */}

                <Link
                  href="/checkout"
                  className="
                    mt-6
                    hidden
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E85D2C]
                    px-5
                    text-[14px]
                    font-medium
                    text-white
                    transition-all
                    hover:bg-[#D14E20]
                    hover:-translate-y-[1px]
                    lg:flex
                  "
                >
                  Proceed to checkout →
                </Link>


                {/* CONTINUE SHOPPING */}

                <Link
                  href="/shop"
                  className="
                    mt-4
                    block
                    rounded-full
                    py-2
                    text-center
                    text-[14px]
                    font-medium
                    text-[#6B6B6B]
                    transition-colors
                    hover:text-[#E85D2C]
                  "
                >
                  ← Continue shopping
                </Link>


                {/* TRUST NOTE */}

                <div className="mt-6 border-t border-[#E8DFD3] pt-5">

                  <p className="text-[12px] font-light leading-[1.6] text-[#8A837B]">
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


      {/* ========================================================
          STICKY BOTTOM BAR
          DESKTOP + MOBILE
      ======================================================== */}

      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
          border-t
          border-[#E8DFD3]
          bg-[#FBF8F3]/95
          px-4
          py-3
          shadow-[0_-8px_25px_rgba(26,26,26,0.06)]
          backdrop-blur-md
          sm:px-6
          sm:py-4
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            gap-4
          "
        >

          {/* ESTIMATED TOTAL */}

          <div className="min-w-0 flex-1">

            <p className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-[#6B6B6B]
              sm:text-[9px]
            ">
              Estimated total
            </p>

            <p className="
              mt-1
              font-sans
              text-[23px]
              font-semibold
              leading-none
              tracking-[-0.03em]
              sm:text-[28px]
            ">
              ₹{total}
            </p>

          </div>


          {/* STICKY CHECKOUT BUTTON */}

          <Link
            href="/checkout"
            className="
              flex
              min-h-[46px]
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#E85D2C]
              px-5
              text-[12px]
              font-medium
              text-white
              transition-all
              hover:bg-[#D14E20]
              hover:-translate-y-[1px]
              sm:min-h-[50px]
              sm:px-8
              sm:text-[14px]
            "
          >
            Proceed to checkout →
          </Link>

        </div>

      </div>




    </main>
  )
}