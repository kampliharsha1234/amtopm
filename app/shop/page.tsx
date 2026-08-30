'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'



/* ============================================================
   SHOP PAGE
============================================================ */

export default function ShopPage() {
  const [selectedConcern, setSelectedConcern] =
    useState<string>('all')

  const [selectedSkinType, setSelectedSkinType] =
    useState<string>('all')

  const { addToCart } = useCart()

  const [addedStates, setAddedStates] =
    useState<Record<string, boolean>>({})


  /* ============================================================
     AVAILABLE FILTERS
  ============================================================ */

  const allConcerns = [
    'all',
    ...new Set(
      products.flatMap(
        (product) => product.concern
      )
    ),
  ]

  const allSkinTypes = [
    'all',
    ...new Set(
      products.flatMap(
        (product) => product.skinType
      )
    ),
  ]


  /* ============================================================
     READ FILTERS FROM URL
  ============================================================ */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    )

    const concern =
      params.get('concern')

    const skinType =
      params.get('skinType')


    if (concern) {
      const matchingConcern =
        allConcerns.find(
          (item) =>
            item.toLowerCase() ===
            concern.toLowerCase()
        )

      if (matchingConcern) {
        setSelectedConcern(
          matchingConcern
        )
      }
    }


    if (skinType) {
      const matchingSkinType =
        allSkinTypes.find(
          (item) =>
            item.toLowerCase() ===
            skinType.toLowerCase()
        )

      if (matchingSkinType) {
        setSelectedSkinType(
          matchingSkinType
        )
      }
    }
  }, [])


  /* ============================================================
     FILTER PRODUCTS
  ============================================================ */

  const filteredProducts =
    products.filter((product) => {
      const matchConcern =
        selectedConcern === 'all' ||
        product.concern.includes(
          selectedConcern
        )

      const matchSkinType =
        selectedSkinType === 'all' ||
        product.skinType.includes(
          selectedSkinType
        )

      return (
        matchConcern &&
        matchSkinType
      )
    })


  /* ============================================================
     ADD TO CART
  ============================================================ */

  const handleAddToCart = (
    product: (typeof products)[number]
  ) => {
    addToCart(product, 1)

    setAddedStates((previous) => ({
      ...previous,
      [product.id]: true,
    }))

    setTimeout(() => {
      setAddedStates((previous) => ({
        ...previous,
        [product.id]: false,
      }))
    }, 1800)
  }


  /* ============================================================
     CLEAR FILTERS
  ============================================================ */

  const clearFilters = () => {
    setSelectedConcern('all')
    setSelectedSkinType('all')

    const url =
      new URL(window.location.href)

    url.searchParams.delete(
      'concern'
    )

    url.searchParams.delete(
      'skinType'
    )

    window.history.replaceState(
      {},
      '',
      url.pathname
    )
  }


  /* ============================================================
     CONCERN FILTER
  ============================================================ */

  const updateConcern = (
    value: string
  ) => {
    setSelectedConcern(value)

    const url =
      new URL(window.location.href)

    if (value === 'all') {
      url.searchParams.delete(
        'concern'
      )
    } else {
      url.searchParams.set(
        'concern',
        value
      )
    }

    window.history.replaceState(
      {},
      '',
      `${url.pathname}${url.search}`
    )
  }


  /* ============================================================
     SKIN TYPE FILTER
  ============================================================ */

  const updateSkinType = (
    value: string
  ) => {
    setSelectedSkinType(value)

    const url =
      new URL(window.location.href)

    if (value === 'all') {
      url.searchParams.delete(
        'skinType'
      )
    } else {
      url.searchParams.set(
        'skinType',
        value
      )
    }

    window.history.replaceState(
      {},
      '',
      `${url.pathname}${url.search}`
    )
  }


  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#F7F2EB]
        text-[#1A1A1A]
      "
    >

      {/* =====================================================
          NAVBAR SPACE
      ===================================================== */}

      <div
        className="
          h-24
          sm:h-32
        "
      />


      {/* =====================================================
          FILTER BAR
      ===================================================== */}

      <section
        className="
          border-y
          border-[#E8DFD3]
          bg-[#FBF8F3]
          px-5
          py-4
          sm:px-8
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
            "
          >

            {/* FILTER LABEL */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              <span className="meta-text">
                Filter by
              </span>

              <span
                className="
                  h-4
                  w-px
                  bg-[#E8DFD3]
                "
              />

            </div>


            {/* FILTERS */}

            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {/* CONCERN */}

              <select
                value={selectedConcern}
                onChange={(event) =>
                  updateConcern(
                    event.target.value
                  )
                }
                className="
                  rounded-full
                  border
                  border-[#E8DFD3]
                  bg-[#F7F2EB]
                  px-4
                  py-2.5
                  font-poppins
                  text-[12px]
                  font-semibold
                  text-[#1A1A1A]
                  outline-none
                  transition-colors
                  focus:border-[#E85D2C]
                "
              >

                {allConcerns.map(
                  (concern) => (
                    <option
                      key={concern}
                      value={concern}
                    >
                      {concern === 'all'
                        ? 'All concerns'
                        : concern}
                    </option>
                  )
                )}

              </select>


              {/* SKIN TYPE */}

              <select
                value={selectedSkinType}
                onChange={(event) =>
                  updateSkinType(
                    event.target.value
                  )
                }
                className="
                  rounded-full
                  border
                  border-[#E8DFD3]
                  bg-[#F7F2EB]
                  px-4
                  py-2.5
                  font-poppins
                  text-[12px]
                  font-semibold
                  text-[#1A1A1A]
                  outline-none
                  transition-colors
                  focus:border-[#E85D2C]
                "
              >

                {allSkinTypes.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type === 'all'
                        ? 'All skin types'
                        : type}
                    </option>
                  )
                )}

              </select>

            </div>


            {/* CLEAR */}

            {(selectedConcern !== 'all' ||
              selectedSkinType !== 'all') && (

              <button
                type="button"
                onClick={clearFilters}
                className="
                  w-fit
                  rounded-full
                  border
                  border-[#1A1A1A]
                  px-4
                  py-2
                  font-poppins
                  text-[12px]
                  font-semibold
                  transition-all
                  hover:bg-[#1A1A1A]
                  hover:text-white
                "
              >
                Clear filters
              </button>

            )}


            {/* RESULT COUNT */}

            <div
              className="
                ml-auto
                font-poppins
                text-[11px]
                font-extralight
                text-[#6B6B6B]
              "
            >
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'product'
                : 'products'}
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ACTIVE FILTERS
      ===================================================== */}

      {(selectedConcern !== 'all' ||
        selectedSkinType !== 'all') && (

        <section
          className="
            px-5
            pt-5
            sm:px-8
            sm:pt-6
          "
        >

          <div className="mx-auto max-w-7xl">

            <div className="flex flex-wrap gap-2">

              {selectedConcern !== 'all' && (
                <span
                  className="
                    rounded-full
                    bg-[#FCE6D9]
                    px-4
                    py-2
                    font-poppins
                    text-[10px]
                    font-semibold
                    text-[#E85D2C]
                  "
                >
                  {selectedConcern}
                </span>
              )}

              {selectedSkinType !== 'all' && (
                <span
                  className="
                    rounded-full
                    bg-[#E8DFD3]
                    px-4
                    py-2
                    font-poppins
                    text-[10px]
                    font-semibold
                    text-[#1A1A1A]
                  "
                >
                  {selectedSkinType}
                </span>
              )}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section
        className="
          px-5
          py-8
          sm:px-8
          sm:py-12
        "
      >

        <div className="mx-auto max-w-7xl">

          {filteredProducts.length === 0 ? (

            /* ==================================================
               EMPTY
            ================================================== */

            <div
              className="
                flex
                min-h-[350px]
                items-center
                justify-center
                text-center
              "
            >

              <div>

                <h2
                  className="
                    font-poppins
                    text-[28px]
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  Nothing here yet.
                </h2>

                <p className="body-text mt-3">
                  Try adjusting your filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="
                    mt-6
                    inline-flex
                    min-h-[46px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#1A1A1A]
                    px-6
                    font-[var(--font-cta)]
                    text-[14px]
                    font-medium
                    text-white
                    transition-all
                    hover:bg-[#E85D2C]
                  "
                >
                  Clear filters
                </button>

              </div>

            </div>

          ) : (

            /* ==================================================
               PRODUCT GRID
            ================================================== */

            <div
              className="
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {filteredProducts.map(
                (product) => (

                  <article
                    key={product.id}
                    className="
                      group
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-[#E8DFD3]
                      bg-[#FBF8F3]
                      transition-all
                      duration-500
                      hover:-translate-y-1
                      hover:shadow-[0_18px_45px_rgba(26,26,26,0.08)]
                    "
                  >

                    {/* ==================================================
                        PRODUCT IMAGE

                        Exact artwork ratio:
                        1024 × 1535
                    ================================================== */}

                    <Link
                      href={`/shop/${product.id}`}
                      className="block"
                    >

                      <div
                        className="
                          relative
                          aspect-[1024/1535]
                          w-full
                          overflow-hidden
                          bg-[#E8DFD3]
                        "
                      >

                        <ProductImage
                          product={product}
                        />


                        {/* ROUTINE BADGE */}

                        <div
                          className="
                            absolute
                            left-4
                            top-4
                            rounded-full
                            bg-[#FBF8F3]/95
                            px-3.5
                            py-2
                            backdrop-blur-sm
                          "
                        >

                          <span
                            className="
                              font-poppins
                              text-[9px]
                              font-semibold
                              uppercase
                              tracking-[0.14em]
                              text-[#1A1A1A]
                            "
                          >
                            {product.category ===
                            'both'
                              ? 'AM + PM'
                              : product.category ===
                                'am'
                                ? 'AM'
                                : 'PM'}
                          </span>

                        </div>

                      </div>

                    </Link>


                    {/* ==================================================
                        PRODUCT DETAILS
                    ================================================== */}

                    <div className="p-5 sm:p-6">

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >

                        <Link
                          href={`/shop/${product.id}`}
                          className="min-w-0"
                        >

                          <h2
                            className="
                              font-poppins
                              text-[24px]
                              font-semibold
                              leading-[1]
                              tracking-[-0.035em]
                            "
                          >
                            {product.name}
                          </h2>

                          <p
                            className="
                              sub-heading
                              mt-2
                              text-[20px]
                            "
                          >
                            {product.tagline}
                          </p>

                        </Link>


                        {/* PRICE */}

                        <div
                          className="
                            shrink-0
                            text-right
                          "
                        >

                          <p
                            className="
                              font-poppins
                              text-[20px]
                              font-semibold
                              leading-none
                            "
                          >
                            ₹{product.price}
                          </p>

                          <p
                            className="
                              mt-1
                              text-[9px]
                              font-light
                              text-[#8A837B]
                            "
                          >
                            incl. GST
                          </p>

                        </div>

                      </div>


                      {/* ==================================================
                          CONCERNS
                      ================================================== */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          gap-1.5
                        "
                      >

                        {product.concern
                          .slice(0, 3)
                          .map(
                            (concern) => (
                              <span
                                key={concern}
                                className="
                                  rounded-full
                                  bg-[#F7F2EB]
                                  px-2.5
                                  py-1.5
                                  font-poppins
                                  text-[8px]
                                  font-semibold
                                  uppercase
                                  tracking-[0.08em]
                                  text-[#6B6B6B]
                                "
                              >
                                {concern}
                              </span>
                            )
                          )}

                      </div>


                      {/* ==================================================
                          SIZE
                      ================================================== */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          gap-3
                          border-t
                          border-[#E8DFD3]
                          pt-4
                        "
                      >

                        <span
                          className="
                            font-poppins
                            text-[12px]
                            font-semibold
                          "
                        >
                          {product.weight}
                        </span>

                        <span
                          className="
                            h-4
                            w-px
                            bg-[#E8DFD3]
                          "
                        />

                        <span
                          className="
                            body-text
                            text-[11px]
                          "
                        >
                          {product.category ===
                          'both'
                            ? 'AM + PM'
                            : product.category ===
                              'am'
                              ? 'AM routine'
                              : 'PM routine'}
                        </span>

                      </div>


                      {/* ==================================================
                          ADD TO BAG
                      ================================================== */}

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(
                            product
                          )
                        }
                        className={`
                          mt-5
                          flex
                          min-h-[48px]
                          w-full
                          items-center
                          justify-center
                          rounded-full
                          font-[var(--font-cta)]
                          text-[14px]
                          font-medium
                          text-white
                          transition-all
                          hover:-translate-y-[1px]
                          ${
                            addedStates[
                              product.id
                            ]
                              ? 'bg-[#E85D2C]'
                              : 'bg-[#1A1A1A] hover:bg-[#E85D2C]'
                          }
                        `}
                      >
                        {addedStates[
                          product.id
                        ]
                          ? '✓ Added to bag'
                          : 'Add to bag'}
                      </button>

                    </div>

                  </article>

                )
              )}

            </div>

          )}

        </div>

      </section>


      {/* =====================================================
          SKIN TEST CTA
      ===================================================== */}

      <section
        className="
          px-5
          pb-14
          sm:px-8
          sm:pb-20
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              flex
              flex-col
              gap-5
              rounded-[26px]
              bg-[#1A1A1A]
              p-6
              text-white
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-8
            "
          >

            <div>

              <p
                className="
                  meta-text-white
                  text-[#E85D2C]
                "
              >
                NOT SURE WHERE TO START?
              </p>

              <h2
                className="
                  mt-2
                  font-poppins
                  text-[28px]
                  font-semibold
                  leading-none
                  tracking-[-0.035em]
                  sm:text-[36px]
                "
              >
                Find your routine.
              </h2>

              <p
                className="
                  body-text
                  mt-3
                  text-white/60
                "
              >
                Answer a few questions and
                build a routine around your skin.
              </p>

            </div>


            <Link
              href="/quiz"
              className="
                inline-flex
                min-h-[48px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#E85D2C]
                px-6
                font-[var(--font-cta)]
                text-[14px]
                font-medium
                text-white
                transition-all
                hover:bg-[#D14E20]
              "
            >
              Take the skin test →
            </Link>

          </div>

        </div>

      </section>


    
    </main>
  )
}


/* ============================================================
   PRODUCT IMAGE

   Product artwork ratio:
   1024 × 1535
============================================================ */

function ProductImage({
  product,
}: {
  product: (typeof products)[number]
}) {
  const [failed, setFailed] =
    useState(false)


  /* ==========================================================
     PLACEHOLDER
  ========================================================== */

  if (
    product.imagePlaceholder ||
    failed
  ) {

    return (
      <div
        className="
          relative
          flex
          h-full
          w-full
          items-center
          justify-center
          bg-[#E8DFD3]
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_25%,rgba(232,93,44,0.18),transparent_45%)]
          "
        />

        <div
          className="
            relative
            px-5
            text-center
          "
        >

          <div
            className="
              mx-auto
              flex
              h-28
              w-28
              items-center
              justify-center
              rounded-full
              border
              border-[#E85D2C]/30
              bg-[#FBF8F3]
              sm:h-36
              sm:w-36
            "
          >

            <span
              className="
                font-fahkwang
                text-[30px]
                italic
                text-[#E85D2C]
              "
            >
              am · pm
            </span>

          </div>

          <p
            className="
              mt-5
              font-poppins
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#6B6B6B]
            "
          >
            Product image coming soon
          </p>

        </div>

      </div>
    )
  }


  /* ==========================================================
     REAL IMAGE
  ========================================================== */

  return (
    <img
      src={product.image}
      alt={product.name}
      onError={() =>
        setFailed(true)
      }
      className="
        h-full
        w-full
        object-contain
        transition-transform
        duration-700
        group-hover:scale-[1.02]
      "
    />
  )
}