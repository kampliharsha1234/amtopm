'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

/* ============================================================
   SHOP PAGE — Premium Editorial Design
   Concern links from homepage automatically select filters
============================================================ */

export default function ShopPage() {
  const [selectedConcern, setSelectedConcern] = useState<string>('all')
  const [selectedSkinType, setSelectedSkinType] = useState<string>('all')

  const { addToCart } = useCart()

  const [addedStates, setAddedStates] =
    useState<Record<string, boolean>>({})


  /* ============================================================
     AVAILABLE FILTERS
  ============================================================ */

  const allConcerns = [
    'all',
    ...new Set(products.flatMap((p) => p.concern))
  ]

  const allSkinTypes = [
    'all',
    ...new Set(products.flatMap((p) => p.skinType))
  ]


  /* ============================================================
     READ CONCERN FROM HOMEPAGE URL
     
     Examples:
     /shop?concern=Acne
     /shop?concern=Dark%20Spots
     /shop?concern=SPF
     /shop?concern=Barrier
  ============================================================ */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const concernFromUrl = params.get('concern')

    if (!concernFromUrl) {
      return
    }

    const matchingConcern = allConcerns.find(
      (concern) =>
        concern.toLowerCase() === concernFromUrl.toLowerCase()
    )

    if (matchingConcern) {
      setSelectedConcern(matchingConcern)
    }
  }, [])


  /* ============================================================
     FILTER PRODUCTS
  ============================================================ */

  const filteredProducts = products.filter((product) => {
    const matchConcern =
      selectedConcern === 'all' ||
      product.concern.includes(selectedConcern)

    const matchSkinType =
      selectedSkinType === 'all' ||
      product.skinType.includes('All') ||
      product.skinType.includes(selectedSkinType)

    return matchConcern && matchSkinType
  })


  /* ============================================================
     ADD TO CART
  ============================================================ */

  const handleAddToCart = (
    product: (typeof products)[number],
    e: React.MouseEvent
  ) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product, 1)

    setAddedStates((prev) => ({
      ...prev,
      [product.id]: true
    }))

    setTimeout(() => {
      setAddedStates((prev) => ({
        ...prev,
        [product.id]: false
      }))
    }, 2000)
  }


  /* ============================================================
     CLEAR FILTERS
  ============================================================ */

  const clearFilters = () => {
    setSelectedConcern('all')
    setSelectedSkinType('all')

    /*
      Remove query parameters from URL as well.
    */
    const url = new URL(window.location.href)
    url.searchParams.delete('concern')
    url.searchParams.delete('skinType')

    window.history.replaceState(
      {},
      '',
      url.pathname
    )
  }


  /* ============================================================
     CONCERN CHANGE
  ============================================================ */

  const handleConcernChange = (
    value: string
  ) => {
    setSelectedConcern(value)

    const url = new URL(window.location.href)

    if (value === 'all') {
      url.searchParams.delete('concern')
    } else {
      url.searchParams.set('concern', value)
    }

    window.history.replaceState(
      {},
      '',
      `${url.pathname}${url.search}`
    )
  }


  /* ============================================================
     SKIN TYPE CHANGE
  ============================================================ */

  const handleSkinTypeChange = (
    value: string
  ) => {
    setSelectedSkinType(value)

    const url = new URL(window.location.href)

    if (value === 'all') {
      url.searchParams.delete('skinType')
    } else {
      url.searchParams.set('skinType', value)
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
    <div className="
      min-h-screen
      bg-[#F7F2EB]
      text-[#1A1A1A]
    ">


      {/* ======================================================
          SPACER — Space below floating navbar
      ====================================================== */}

      <div className="
        h-24
        sm:h-32
      " />


      {/* ======================================================
          FILTERS
      ====================================================== */}

      <section className="
        px-4
        sm:px-6
      ">

        <div className="
          mx-auto
          max-w-7xl
        ">

          <div className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:gap-6
          ">


            {/* FILTER LABEL */}

            <div className="
              flex
              items-center
              gap-3
            ">

              <span className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[#6B6B6B]
              ">
                Filter by
              </span>

              <span className="
                h-4
                w-px
                bg-[#E8DFD3]
              " />

            </div>


            {/* SELECT FILTERS */}

            <div className="
              flex
              flex-wrap
              gap-3
            ">


              {/* CONCERN */}

              <select
                value={selectedConcern}
                onChange={(e) =>
                  handleConcernChange(e.target.value)
                }
                className="
                  rounded-full
                  border
                  border-[#E8DFD3]
                  bg-[#FBF8F3]
                  px-4
                  py-2
                  text-[11px]
                  font-medium
                  text-[#1A1A1A]
                  focus:border-[#E85D2C]
                  focus:outline-none
                "
              >

                {allConcerns.map((concern) => (

                  <option
                    key={concern}
                    value={concern}
                  >
                    {concern === 'all'
                      ? 'All'
                      : concern}
                  </option>

                ))}

              </select>


              {/* SKIN TYPE */}

              <select
                value={selectedSkinType}
                onChange={(e) =>
                  handleSkinTypeChange(e.target.value)
                }
                className="
                  rounded-full
                  border
                  border-[#E8DFD3]
                  bg-[#FBF8F3]
                  px-4
                  py-2
                  text-[11px]
                  font-medium
                  text-[#1A1A1A]
                  focus:border-[#E85D2C]
                  focus:outline-none
                "
              >

                {allSkinTypes.map((type) => (

                  <option
                    key={type}
                    value={type}
                  >
                    {type === 'all'
                      ? 'All Skin Types'
                      : type}
                  </option>

                ))}

              </select>

            </div>


            {/* PRODUCT COUNT */}

            <div className="
              ml-auto
              text-[11px]
              text-[#6B6B6B]
            ">
              {filteredProducts.length}{' '}
              product
              {filteredProducts.length !== 1 && 's'}
            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          ACTIVE FILTER MESSAGE
      ====================================================== */}

      {selectedConcern !== 'all' && (
        <section className="
          px-4
          pt-5
          sm:px-6
          sm:pt-7
        ">

          <div className="
            mx-auto
            max-w-7xl
          ">

            <div className="
              flex
              items-center
              justify-between
              border-l-2
              border-[#E85D2C]
              bg-[#FCE6D9]
              px-4
              py-3
            ">

              <div>

                <p className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#E85D2C]
                ">
                  SHOPPING FOR
                </p>

                <p className="
                  mt-0.5
                  font-serif
                  text-[20px]
                  leading-none
                  text-[#1A1A1A]
                ">
                  {selectedConcern}
                </p>

              </div>


              <button
                type="button"
                onClick={clearFilters}
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-[#6B6B6B]
                  transition-colors
                  hover:text-[#E85D2C]
                "
              >
                Clear ×
              </button>

            </div>

          </div>

        </section>
      )}


      {/* ======================================================
          PRODUCT GRID
      ====================================================== */}

      <section className="
        px-4
        py-8
        sm:px-6
        sm:py-12
      ">

        <div className="
          mx-auto
          max-w-7xl
        ">


          {/* NO PRODUCTS */}

          {filteredProducts.length === 0 ? (

            <div className="
              flex
              min-h-[300px]
              flex-col
              items-center
              justify-center
              text-center
            ">

              <p className="
                text-[16px]
                text-[#6B6B6B]
              ">
                No products match your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="
                  mt-4
                  rounded-full
                  border
                  border-[#1A1A1A]
                  px-6
                  py-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-[#1A1A1A]
                  transition-colors
                  hover:bg-[#1A1A1A]
                  hover:text-white
                "
              >
                Clear filters
              </button>

            </div>

          ) : (

            <div className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              sm:gap-5
              lg:grid-cols-3
              xl:grid-cols-4
            ">

              {filteredProducts.map((product) => (

                <Link
                  key={product.id}
                  href={`/shop/${product.id}`}
                  className="
                    group
                    overflow-hidden
                    bg-[#FBF8F3]
                    transition-shadow
                    hover:shadow-md
                  "
                >


                  {/* ==================================================
                      PRODUCT IMAGE
                  ================================================== */}

                  <div className="
                    relative
                    aspect-[0.94]
                    overflow-hidden
                    bg-[#E8DFD3]
                  ">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.03]
                      "
                    />


                    {/* CONCERN TAGS */}

                    <div className="
                      absolute
                      left-3
                      top-3
                      flex
                      flex-wrap
                      gap-1.5
                      sm:left-4
                      sm:top-4
                    ">

                      {product.concern
                        .slice(0, 2)
                        .map((c) => (

                          <span
                            key={c}
                            className="
                              bg-[#FCE6D9]
                              px-2
                              py-0.5
                              text-[7px]
                              font-medium
                              uppercase
                              tracking-[0.08em]
                              text-[#1A1A1A]
                              sm:text-[8px]
                            "
                          >
                            {c}
                          </span>

                        ))}

                    </div>


                    {/* BEST SELLER */}

                    {product.id === products[0].id && (

                      <div className="
                        absolute
                        right-3
                        top-3
                        bg-[#1A1A1A]
                        px-2
                        py-0.5
                        text-[7px]
                        font-medium
                        uppercase
                        tracking-[0.08em]
                        text-white
                        sm:right-4
                        sm:top-4
                        sm:text-[8px]
                      ">
                        Best seller
                      </div>

                    )}

                  </div>


                  {/* ==================================================
                      PRODUCT DETAILS
                  ================================================== */}

                  <div className="
                    px-4
                    pb-4
                    pt-3
                    sm:p-5
                  ">

                    <h3 className="
                      font-serif
                      text-[20px]
                      leading-[0.98]
                      tracking-[-0.035em]
                      text-[#1A1A1A]
                      sm:text-[23px]
                    ">
                      {product.name}
                    </h3>


                    <p className="
                      mt-1
                      text-[10px]
                      leading-relaxed
                      text-[#6B6B6B]
                      sm:text-[11px]
                    ">
                      {product.tagline}
                    </p>


                    <div className="
                      mt-3
                      flex
                      items-center
                      justify-between
                    ">

                      <span className="
                        text-[15px]
                        font-medium
                        text-[#1A1A1A]
                        sm:text-[17px]
                      ">
                        ₹{product.price}
                      </span>


                      <button
                        type="button"
                        onClick={(e) =>
                          handleAddToCart(
                            product,
                            e
                          )
                        }
                        className={`
                          rounded-[2px]
                          px-3
                          py-1.5
                          text-[8px]
                          font-medium
                          uppercase
                          tracking-[0.12em]
                          text-white
                          transition-colors
                          sm:px-4
                          sm:py-1.5
                          sm:text-[9px]
                          ${
                            addedStates[product.id]
                              ? 'bg-[#E85D2C]'
                              : 'bg-[#1A1A1A] hover:bg-[#E85D2C]'
                          }
                        `}
                      >
                        {addedStates[product.id]
                          ? '✓ Added'
                          : 'Add'}
                      </button>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ======================================================
          FOOTER SPACER
      ====================================================== */}

      <div className="
        h-16
        sm:h-24
      " />


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  )
}