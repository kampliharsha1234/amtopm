'use client'

import { use, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  getProductById,
  products,
} from '../../data/products'

import { useCart } from '../../context/CartContext'



/* ============================================================
   TYPES
============================================================ */

type Review = {
  id: string
  productId: string
  name: string
  rating: number
  review: string
  createdAt: string
}


/* ============================================================
   PRODUCT PAGE
============================================================ */

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)

  const product = getProductById(id)

  const { addToCart } = useCart()

  const [added, setAdded] = useState(false)

  const [ingredientsOpen, setIngredientsOpen] =
    useState(false)


  /* ============================================================
     REVIEWS
  ============================================================ */

  const [reviews, setReviews] =
    useState<Review[]>([])

  const [reviewsLoading, setReviewsLoading] =
    useState(true)

  const [reviewFormOpen, setReviewFormOpen] =
    useState(false)

  const [reviewName, setReviewName] =
    useState('')

  const [reviewRating, setReviewRating] =
    useState(5)

  const [reviewText, setReviewText] =
    useState('')

  const [reviewSubmitting, setReviewSubmitting] =
    useState(false)

  const [reviewMessage, setReviewMessage] =
    useState('')

  const [reviewError, setReviewError] =
    useState('')


  /* ============================================================
     SAFETY
  ============================================================ */

  if (!product) {
    notFound()
  }


  /* ============================================================
     ROUTINE
  ============================================================ */

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


  /* ============================================================
     OTHER PRODUCTS
  ============================================================ */

  const otherProducts = products.filter(
    (item) => item.id !== product.id
  )


  /* ============================================================
     LOAD REVIEWS
  ============================================================ */

  const loadReviews = async () => {
    try {
      setReviewsLoading(true)

      const response = await fetch(
        `/api/reviews?productId=${encodeURIComponent(
          product.id
        )}`,
        {
          cache: 'no-store',
        }
      )

      if (!response.ok) {
        throw new Error(
          'Unable to load reviews.'
        )
      }

      const data = await response.json()

      setReviews(
        Array.isArray(data.reviews)
          ? data.reviews
          : []
      )
    } catch (error) {
      console.error(
        'Review loading error:',
        error
      )
    } finally {
      setReviewsLoading(false)
    }
  }


  useEffect(() => {
    loadReviews()
  }, [product.id])


  /* ============================================================
     REVIEW STATS
  ============================================================ */

  const averageRating = useMemo(() => {
    if (reviews.length === 0) {
      return 0
    }

    const total = reviews.reduce(
      (sum, review) =>
        sum + review.rating,
      0
    )

    return total / reviews.length
  }, [reviews])


  /* ============================================================
     ADD TO CART
  ============================================================ */

  const handleAddToCart = () => {
    addToCart(product, 1)

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }


  /* ============================================================
     SUBMIT REVIEW
  ============================================================ */

  const handleSubmitReview = async (
    event: React.FormEvent
  ) => {
    event.preventDefault()

    setReviewError('')
    setReviewMessage('')

    if (
      !reviewName.trim() ||
      !reviewText.trim()
    ) {
      setReviewError(
        'Please complete your name and review.'
      )

      return
    }

    if (
      reviewName.trim().length < 2 ||
      reviewName.trim().length > 60
    ) {
      setReviewError(
        'Please enter a name between 2 and 60 characters.'
      )

      return
    }

    if (
      reviewText.trim().length < 10
    ) {
      setReviewError(
        'Your review should be at least 10 characters.'
      )

      return
    }

    setReviewSubmitting(true)

    try {
      const response = await fetch(
        '/api/reviews',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            productId:
              product.id,

            name:
              reviewName.trim(),

            rating:
              reviewRating,

            review:
              reviewText.trim(),
          }),
        }
      )

      const data =
        await response.json()

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Unable to submit review.'
        )
      }

      setReviewName('')
      setReviewRating(5)
      setReviewText('')

      setReviewMessage(
        'Thanks for sharing your experience.'
      )

      setReviewFormOpen(false)

      await loadReviews()
    } catch (error) {
      setReviewError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your review right now.'
      )
    } finally {
      setReviewSubmitting(false)
    }
  }


  /* ============================================================
     FORMAT DATE
  ============================================================ */

  const formatReviewDate = (
    date: string
  ) => {
    try {
      return new Intl.DateTimeFormat(
        'en-IN',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }
      ).format(new Date(date))
    } catch {
      return ''
    }
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
          PRODUCT HERO
      ===================================================== */}

      <section
        className="
          px-5
          pb-12
          pt-28
          sm:px-8
          sm:pb-16
          sm:pt-32
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* BACK */}

          <Link
            href="/shop"
            className="
              font-[var(--font-cta)]
              text-[14px]
              font-medium
              text-[#6B6B6B]
              transition-colors
              hover:text-[#E85D2C]
            "
          >
            ← Back to shop
          </Link>


          <div
            className="
              mt-6
              grid
              gap-8
              lg:grid-cols-[1.05fr_0.95fr]
              lg:gap-14
            "
          >

            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <div>

              {/*
                Product artwork is 1024 × 1535.
                Keeping the container at the same ratio prevents
                cropping and preserves the complete artwork.
              */}

              <div
                className="
                  relative
                  aspect-[1024/1535]
                  w-full
                  overflow-hidden
                  rounded-[30px]
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
                    left-5
                    top-5
                    rounded-full
                    bg-[#FBF8F3]/95
                    px-4
                    py-2.5
                    backdrop-blur-sm
                  "
                >

                  <span
                    className="
                      font-poppins
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                    "
                  >
                    {routine}
                  </span>

                </div>

              </div>


              {/* SIMPLE PRODUCT META */}

              <div
                className="
                  mt-3
                  grid
                  grid-cols-2
                  gap-px
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#E8DFD3]
                  bg-[#E8DFD3]
                "
              >

                <ProductSpec
                  label="Size"
                  value={product.weight}
                />

                <ProductSpec
                  label="Routine"
                  value={routine}
                />

              </div>

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div
              className="
                flex
                flex-col
                justify-center
              "
            >

              {/* BADGES */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    rounded-full
                    bg-[#FCE6D9]
                    px-3.5
                    py-2
                    font-poppins
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#E85D2C]
                  "
                >
                  {routineLabel}
                </span>


                <span
                  className="
                    rounded-full
                    border
                    border-[#E8DFD3]
                    bg-[#FBF8F3]
                    px-3.5
                    py-2
                    font-poppins
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-[#6B6B6B]
                  "
                >
                  {product.inStock
                    ? 'In stock'
                    : 'Out of stock'}
                </span>

              </div>


              {/* PRODUCT NAME */}

              <h1
                className="
                  mt-5
                  font-poppins
                  text-[42px]
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.045em]
                  sm:text-[58px]
                  lg:text-[64px]
                "
              >
                {product.name}
              </h1>


              {/* TAGLINE */}

              <p className="sub-heading mt-4">
                {product.tagline}
              </p>


              {/* PRICE */}

              <div
                className="
                  mt-6
                  flex
                  items-end
                  justify-between
                  border-y
                  border-[#E8DFD3]
                  py-5
                "
              >

                <div>

                  <p
                    className="
                      font-poppins
                      text-[34px]
                      font-semibold
                      leading-none
                      tracking-[-0.04em]
                    "
                  >
                    ₹{product.price}
                  </p>

                  <p
                    className="
                      body-text
                      mt-2
                      text-[11px]
                    "
                  >
                    Inclusive of all taxes
                  </p>

                </div>


                <div className="text-right">

                  <p
                    className="
                      font-poppins
                      text-[14px]
                      font-semibold
                    "
                  >
                    {product.weight}
                  </p>

                  <p
                    className="
                      body-text
                      mt-1
                      text-[11px]
                    "
                  >
                    Net quantity
                  </p>

                </div>

              </div>


              {/* BENEFITS */}

              <div className="mt-6">

                <p className="meta-text text-orange">
                  WHY YOU&apos;LL LIKE IT
                </p>


                <div
                  className="
                    mt-4
                    grid
                    gap-px
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-[#E8DFD3]
                    bg-[#E8DFD3]
                    sm:grid-cols-2
                  "
                >

                  {product.keyBenefits
                    .slice(0, 6)
                    .map(
                      (benefit) => (
                        <div
                          key={benefit}
                          className="
                            flex
                            items-start
                            gap-3
                            bg-[#FBF8F3]
                            px-4
                            py-3.5
                          "
                        >

                          <span
                            className="
                              mt-0.5
                              font-poppins
                              text-[15px]
                              font-semibold
                              text-[#E85D2C]
                            "
                          >
                            +
                          </span>

                          <span className="body-text text-[13px]">
                            {benefit}
                          </span>

                        </div>
                      )
                    )}

                </div>

              </div>


              {/* HERO ADD BUTTON */}

              <button
                type="button"
                onClick={
                  handleAddToCart
                }
                disabled={
                  !product.inStock
                }
                className="
                  mt-6
                  flex
                  min-h-[54px]
                  w-full
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
                  hover:-translate-y-[1px]
                  hover:bg-[#E85D2C]
                  disabled:cursor-not-allowed
                  disabled:bg-[#B0AAA2]
                "
              >
                {added
                  ? '✓ Added to bag'
                  : product.inStock
                    ? `Add to bag — ₹${product.price}`
                    : 'Out of stock'}
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FORMULA
      ===================================================== */}

      <section
        className="
          bg-[#1A1A1A]
          px-5
          py-12
          text-white
          sm:px-8
          sm:py-16
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              grid
              gap-9
              lg:grid-cols-[0.65fr_1.35fr]
              lg:gap-20
            "
          >

            <div>

              <p className="meta-text-white text-[#E85D2C]">
                THE FORMULA
              </p>

              <h2
                className="
                  mt-3
                  font-poppins
                  text-[40px]
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.045em]
                  sm:text-[56px]
                "
              >
                Purposeful
                <br />
                ingredients.
              </h2>

            </div>


            <div>

              <p
                className="
                  font-fahkwang
                  text-[23px]
                  font-normal
                  leading-[1.3]
                  text-white/85
                  sm:text-[27px]
                "
              >
                {product.description}
              </p>

              <p
                className="
                  mt-6
                  font-poppins
                  text-[14px]
                  font-extralight
                  leading-[1.75]
                  text-white/55
                "
              >
                Built around a clear purpose, with complementary
                ingredients selected to support the role this product
                plays in your routine.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ROUTINE + HOW TO USE
      ===================================================== */}

      <section
        className="
          border-b
          border-[#E8DFD3]
          bg-[#FBF8F3]
        "
      >

        <div className="mx-auto grid max-w-7xl md:grid-cols-2">

          {/* ROUTINE */}

          <div
            className="
              border-b
              border-[#E8DFD3]
              p-6
              sm:p-8
              md:border-b-0
              md:border-r
              md:p-12
            "
          >

            <p className="meta-text text-orange">
              YOUR ROUTINE
            </p>

            <h2
              className="
                mt-3
                font-poppins
                text-[38px]
                font-semibold
                leading-[0.92]
                tracking-[-0.04em]
                sm:text-[50px]
              "
            >
              {routineLabel}
            </h2>

            <p className="sub-heading mt-4">
              Simple enough to use consistently.
            </p>


            <div
              className="
                mt-7
                rounded-[22px]
                bg-[#F7F2EB]
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <span
                  className="
                    font-poppins
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#E85D2C]
                  "
                >
                  {routine}
                </span>

                <span className="text-[20px] text-[#E85D2C]">
                  {routine === 'AM'
                    ? '☼'
                    : '◐'}
                </span>

              </div>

              <p className="body-text mt-4">
                {routine === 'AM'
                  ? 'Use in your morning routine as directed.'
                  : routine === 'PM'
                    ? 'Use in your evening routine as directed.'
                    : 'Suitable for both morning and evening use.'}
              </p>

            </div>

          </div>


          {/* HOW TO USE */}

          <div className="p-6 sm:p-8 md:p-12">

            <p className="meta-text text-orange">
              HOW TO USE
            </p>

            <h2
              className="
                mt-3
                font-poppins
                text-[38px]
                font-semibold
                leading-[0.92]
                tracking-[-0.04em]
                sm:text-[50px]
              "
            >
              Use it well.
            </h2>

            <p className="body-text mt-5">
              {product.howToUse}
            </p>

            <div
              className="
                mt-6
                rounded-[20px]
                border-l-2
                border-[#E85D2C]
                bg-[#F7F2EB]
                p-4
              "
            >

              <p className="font-poppins text-[12px] font-semibold">
                Introduce new skincare gradually.
              </p>

              <p className="body-text mt-2 text-[12px]">
                Discontinue use if significant irritation occurs.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SKIN PROFILE
      ===================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-4 sm:grid-cols-2">

            {/* CONCERNS */}

            <div
              className="
                rounded-[24px]
                border
                border-[#E8DFD3]
                bg-[#FBF8F3]
                p-6
              "
            >

              <p className="meta-text text-orange">
                MADE FOR
              </p>

              <h2
                className="
                  mt-3
                  font-poppins
                  text-[28px]
                  font-semibold
                  leading-none
                "
              >
                Skin concerns
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">

                {product.concern.map(
                  (concern) => (
                    <span
                      key={concern}
                      className="
                        rounded-full
                        bg-[#F7F2EB]
                        px-3.5
                        py-2
                        font-poppins
                        text-[10px]
                        font-semibold
                      "
                    >
                      {concern}
                    </span>
                  )
                )}

              </div>

            </div>


            {/* SKIN TYPES */}

            <div
              className="
                rounded-[24px]
                border
                border-[#E8DFD3]
                bg-[#FBF8F3]
                p-6
              "
            >

              <p className="meta-text text-orange">
                SUITABLE FOR
              </p>

              <h2
                className="
                  mt-3
                  font-poppins
                  text-[28px]
                  font-semibold
                  leading-none
                "
              >
                Skin types
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">

                {product.skinType.map(
                  (type) => (
                    <span
                      key={type}
                      className="
                        rounded-full
                        bg-[#FCE6D9]
                        px-3.5
                        py-2
                        font-poppins
                        text-[10px]
                        font-semibold
                        text-[#E85D2C]
                      "
                    >
                      {type}
                    </span>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INGREDIENTS
      ===================================================== */}

      <section
        className="
          border-y
          border-[#E8DFD3]
          bg-[#FBF8F3]
          px-5
          py-12
          sm:px-8
          sm:py-16
        "
      >

        <div className="mx-auto max-w-5xl">

          <div
            className="
              grid
              gap-8
              md:grid-cols-[0.7fr_1.3fr]
              md:gap-14
            "
          >

            <div>

              <p className="meta-text text-orange">
                FORMULA
              </p>

              <h2
                className="
                  mt-3
                  font-poppins
                  text-[40px]
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.04em]
                  sm:text-[52px]
                "
              >
                What&apos;s inside.
              </h2>

              <p className="body-text mt-4">
                A closer look at the ingredients selected for this formula.
              </p>

            </div>


            <div>

              <button
                type="button"
                onClick={() =>
                  setIngredientsOpen(
                    (previous) =>
                      !previous
                  )
                }
                className="
                  flex
                  min-h-[58px]
                  w-full
                  items-center
                  justify-between
                  border-y
                  border-[#E8DFD3]
                  text-left
                "
              >

                <span
                  className="
                    font-poppins
                    text-[14px]
                    font-semibold
                  "
                >
                  {ingredientsOpen
                    ? 'Hide ingredient breakdown'
                    : 'View ingredient breakdown'}
                </span>

                <span
                  className="
                    font-poppins
                    text-[24px]
                    font-extralight
                    text-[#E85D2C]
                  "
                >
                  {ingredientsOpen
                    ? '−'
                    : '+'}
                </span>

              </button>


              {ingredientsOpen && (

                <div
                  className="
                    divide-y
                    divide-[#E8DFD3]
                    border-b
                    border-[#E8DFD3]
                  "
                >

                  {product.ingredients.map(
                    (ingredient) => (
                      <div
                        key={ingredient}
                        className="py-4"
                      >

                        <p
                          className="
                            font-poppins
                            text-[14px]
                            font-semibold
                            tracking-[-0.01em]
                          "
                        >
                          {ingredient}
                        </p>

                      </div>
                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-5xl">

          <div className="mb-6">

            <p className="meta-text text-orange">
              PRODUCT DETAILS
            </p>

            <h2
              className="
                mt-3
                font-poppins
                text-[38px]
                font-semibold
                leading-none
                tracking-[-0.04em]
                sm:text-[48px]
              "
            >
              The details.
            </h2>

          </div>


          <div
            className="
              grid
              gap-px
              overflow-hidden
              rounded-[24px]
              border
              border-[#E8DFD3]
              bg-[#E8DFD3]
              sm:grid-cols-2
            "
          >

            <ProductSpec
              label="Net quantity"
              value={product.weight}
            />

            <ProductSpec
              label="Routine"
              value={routine}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <section
        className="
          bg-[#F7F2EB]
          px-5
          py-12
          sm:px-8
          sm:py-16
        "
      >

        <div className="mx-auto max-w-5xl">

          {/* HEADER */}

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p className="meta-text text-orange">
                REAL PEOPLE. REAL EXPERIENCES.
              </p>

              <h2
                className="
                  mt-3
                  font-poppins
                  text-[40px]
                  font-semibold
                  leading-[0.92]
                  tracking-[-0.04em]
                  sm:text-[52px]
                "
              >
                Reviews.
              </h2>


              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-3
                "
              >

                <div className="flex gap-0.5">
                  <StarRow
                    rating={
                      Math.round(
                        averageRating
                      )
                    }
                  />
                </div>

                <span
                  className="
                    font-poppins
                    text-[12px]
                    font-semibold
                  "
                >
                  {reviews.length > 0
                    ? averageRating.toFixed(1)
                    : '—'}
                </span>

                <span className="body-text text-[12px]">
                  {reviews.length}{' '}
                  {reviews.length === 1
                    ? 'review'
                    : 'reviews'}
                </span>

              </div>

            </div>


            <button
              type="button"
              onClick={() => {
                setReviewFormOpen(
                  (previous) =>
                    !previous
                )

                setReviewMessage('')
                setReviewError('')
              }}
              className="
                inline-flex
                min-h-[48px]
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
              {reviewFormOpen
                ? 'Close review form'
                : 'Write a review →'}
            </button>

          </div>


          {/* SUCCESS */}

          {reviewMessage && (
            <div
              className="
                mt-5
                rounded-[18px]
                border
                border-[#E85D2C]/20
                bg-[#FCE6D9]
                px-5
                py-4
              "
            >

              <p
                className="
                  font-poppins
                  text-[14px]
                  font-semibold
                  text-[#E85D2C]
                "
              >
                {reviewMessage}
              </p>

            </div>
          )}


          {/* ERROR */}

          {reviewError && (
            <div
              className="
                mt-5
                rounded-[18px]
                border
                border-red-200
                bg-red-50
                px-5
                py-4
              "
            >

              <p className="font-poppins text-[13px] font-semibold text-red-700">
                {reviewError}
              </p>

            </div>
          )}


          {/* =================================================
              REVIEW FORM
          ================================================= */}

          {reviewFormOpen && (

            <form
              onSubmit={
                handleSubmitReview
              }
              className="
                mt-6
                overflow-hidden
                rounded-[24px]
                border
                border-[#E8DFD3]
                bg-[#FBF8F3]
              "
            >

              <div className="p-5 sm:p-7">

                <div
                  className="
                    grid
                    gap-5
                    sm:grid-cols-[1fr_auto]
                  "
                >

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="review-name"
                      className="meta-text"
                    >
                      Your name
                    </label>

                    <input
                      id="review-name"
                      type="text"
                      value={reviewName}
                      onChange={(event) =>
                        setReviewName(
                          event.target.value
                        )
                      }
                      placeholder="Your name"
                      maxLength={60}
                      className="
                        mt-2
                        h-[50px]
                        w-full
                        rounded-full
                        border
                        border-[#E8DFD3]
                        bg-[#F7F2EB]
                        px-5
                        font-poppins
                        text-[14px]
                        font-extralight
                        text-[#1A1A1A]
                        outline-none
                        transition-colors
                        focus:border-[#E85D2C]
                      "
                    />

                  </div>


                  {/* RATING */}

                  <div>

                    <p className="meta-text">
                      Your rating
                    </p>

                    <div
                      className="
                        mt-2
                        flex
                        h-[50px]
                        items-center
                        gap-1
                        rounded-full
                        border
                        border-[#E8DFD3]
                        bg-[#F7F2EB]
                        px-4
                      "
                    >

                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() =>
                              setReviewRating(
                                star
                              )
                            }
                            aria-label={`${star} star${
                              star === 1
                                ? ''
                                : 's'
                            }`}
                            className="
                              flex
                              h-7
                              w-7
                              items-center
                              justify-center
                              text-[20px]
                              transition-transform
                              hover:scale-110
                            "
                          >

                            <span
                              className={
                                star <=
                                reviewRating
                                  ? 'text-[#E85D2C]'
                                  : 'text-[#CFC7BD]'
                              }
                            >
                              ★
                            </span>

                          </button>
                        )
                      )}

                    </div>

                  </div>

                </div>


                {/* REVIEW */}

                <div className="mt-5">

                  <label
                    htmlFor="review-text"
                    className="meta-text"
                  >
                    Your experience
                  </label>

                  <textarea
                    id="review-text"
                    value={reviewText}
                    onChange={(event) =>
                      setReviewText(
                        event.target.value
                      )
                    }
                    placeholder="Tell us about your experience with this product..."
                    maxLength={1000}
                    rows={5}
                    className="
                      mt-2
                      w-full
                      resize-none
                      rounded-[20px]
                      border
                      border-[#E8DFD3]
                      bg-[#F7F2EB]
                      px-5
                      py-4
                      font-poppins
                      text-[14px]
                      font-extralight
                      leading-[1.6]
                      text-[#1A1A1A]
                      outline-none
                      transition-colors
                      focus:border-[#E85D2C]
                    "
                  />

                  <div className="mt-2 flex justify-end">

                    <span className="text-[10px] text-[#8A837B]">
                      {reviewText.length}/1000
                    </span>

                  </div>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={reviewSubmitting}
                  className="
                    mt-4
                    flex
                    min-h-[50px]
                    w-full
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
                    disabled:cursor-wait
                    disabled:opacity-70
                  "
                >
                  {reviewSubmitting
                    ? 'Submitting review...'
                    : 'Submit review →'}
                </button>


                <p className="body-text mt-4 text-[11px] text-[#8A837B]">
                  Please share an honest experience. Reviews are stored with
                  your name and the product you reviewed.
                </p>

              </div>

            </form>

          )}


          {/* =================================================
              REVIEW LIST
          ================================================= */}

          <div className="mt-7">

            {reviewsLoading ? (

              <div
                className="
                  rounded-[24px]
                  border
                  border-[#E8DFD3]
                  bg-[#FBF8F3]
                  p-7
                  text-center
                "
              >

                <div
                  className="
                    mx-auto
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-[#E8DFD3]
                    border-t-[#E85D2C]
                  "
                />

                <p className="body-text mt-4 text-[12px]">
                  Loading reviews...
                </p>

              </div>

            ) : reviews.length === 0 ? (

              <div
                className="
                  rounded-[24px]
                  border
                  border-[#E8DFD3]
                  bg-[#FBF8F3]
                  p-7
                  text-center
                "
              >

                <p
                  className="
                    font-fahkwang
                    text-[25px]
                    italic
                  "
                >
                  Be the first to share your experience.
                </p>

                <p className="body-text mt-3 text-[12px]">
                  Your review can help someone choose their routine.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {reviews.map(
                  (review) => (

                    <article
                      key={review.id}
                      className="
                        rounded-[24px]
                        border
                        border-[#E8DFD3]
                        bg-[#FBF8F3]
                        p-5
                        sm:p-6
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          gap-3
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >

                        <div>

                          <p
                            className="
                              font-poppins
                              text-[15px]
                              font-semibold
                            "
                          >
                            {review.name}
                          </p>

                          <p
                            className="
                              mt-1
                              text-[10px]
                              font-light
                              text-[#8A837B]
                            "
                          >
                            {formatReviewDate(
                              review.createdAt
                            )}
                          </p>

                        </div>


                        <div className="flex items-center gap-2">

                          <div className="flex gap-0.5">
                            <StarRow
                              rating={
                                review.rating
                              }
                            />
                          </div>

                          <span className="text-[10px] font-semibold text-[#8A837B]">
                            {review.rating}/5
                          </span>

                        </div>

                      </div>


                      <p
                        className="
                          mt-5
                          font-poppins
                          text-[14px]
                          font-extralight
                          leading-[1.75]
                          text-[#3D3D3D]
                        "
                      >
                        “{review.review}”
                      </p>

                    </article>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =====================================================
          OTHER PRODUCTS
      ===================================================== */}

      <section
        className="
          bg-[#E8DFD3]
          px-5
          py-12
          sm:px-8
          sm:py-16
        "
      >

        <div className="mx-auto max-w-7xl">

          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >

            <div>

              <p className="meta-text text-orange">
                EXPLORE MORE
              </p>

              <h2
                className="
                  mt-3
                  font-poppins
                  text-[36px]
                  font-semibold
                  leading-none
                  tracking-[-0.04em]
                  sm:text-[50px]
                "
              >
                Build your routine.
              </h2>

            </div>


            <Link
              href="/shop"
              className="
                hidden
                min-h-[46px]
                items-center
                justify-center
                rounded-full
                border
                border-[#1A1A1A]
                px-5
                font-[var(--font-cta)]
                text-[14px]
                font-medium
                text-[#1A1A1A]
                transition-all
                hover:bg-[#1A1A1A]
                hover:text-white
                sm:inline-flex
              "
            >
              View all →
            </Link>

          </div>


          <div
            className="
              mt-7
              flex
              gap-4
              overflow-x-auto
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >

            {otherProducts.map(
              (item) => (

                <Link
                  key={item.id}
                  href={`/shop/${item.id}`}
                  className="
                    group
                    w-[78vw]
                    shrink-0
                    sm:w-[300px]
                  "
                >

                  <div
                    className="
                      overflow-hidden
                      rounded-[24px]
                      bg-[#FBF8F3]
                    "
                  >

                    <div
                      className="
                        relative
                        aspect-square
                        bg-[#E8DFD3]
                      "
                    >

                      <OtherProductImage
                        product={item}
                      />

                    </div>


                    <div className="p-5">

                      <div className="flex items-start justify-between gap-3">

                        <h3
                          className="
                            font-poppins
                            text-[20px]
                            font-semibold
                            leading-[1]
                            tracking-[-0.025em]
                          "
                        >
                          {item.name}
                        </h3>

                        <span
                          className="
                            shrink-0
                            font-poppins
                            text-[14px]
                            font-semibold
                          "
                        >
                          ₹{item.price}
                        </span>

                      </div>

                      <p className="sub-heading mt-2 text-[19px]">
                        {item.tagline}
                      </p>

                    </div>

                  </div>

                </Link>

              )
            )}

          </div>

        </div>

      </section>




      {/* =====================================================
          STICKY ADD TO BAG
      ===================================================== */}

      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-[9999]
          border-t
          border-[#E8DFD3]
          bg-[#FBF8F3]/95
          shadow-[0_-8px_30px_rgba(26,26,26,0.08)]
          backdrop-blur-md
        "
        style={{
          paddingBottom:
            'env(safe-area-inset-bottom, 0px)',
        }}
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            gap-4
            px-4
            py-3
            sm:px-8
          "
        >

          <div className="hidden min-w-0 flex-1 sm:block">

            <p
              className="
                truncate
                font-poppins
                text-[14px]
                font-semibold
              "
            >
              {product.name}
            </p>

            <p
              className="
                mt-1
                font-poppins
                text-[11px]
                font-extralight
                text-[#6B6B6B]
              "
            >
              {product.weight} · ₹{product.price}
            </p>

          </div>


          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="
              flex
              min-h-[50px]
              w-full
              items-center
              justify-center
              rounded-full
              bg-[#E85D2C]
              px-5
              font-[var(--font-cta)]
              text-[14px]
              font-medium
              text-white
              transition-all
              hover:bg-[#1A1A1A]
              disabled:cursor-not-allowed
              disabled:bg-[#B0AAA2]
              sm:w-auto
              sm:min-w-[340px]
            "
          >
            {added
              ? '✓ Added to bag'
              : `Add to bag — ₹${product.price}`}
          </button>

        </div>

      </div>

    </main>
  )
}


/* ============================================================
   PRODUCT IMAGE
============================================================ */

function ProductImage({
  product,
}: {
  product: (typeof products)[number]
}) {
  const [failed, setFailed] =
    useState(false)


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
        "
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(232,93,44,0.16),transparent_43%)]" />

        <div className="relative text-center">

          <div
            className="
              mx-auto
              flex
              h-40
              w-40
              items-center
              justify-center
              rounded-full
              border
              border-[#E85D2C]/25
              bg-[#FBF8F3]
              sm:h-52
              sm:w-52
            "
          >

            <span
              className="
                font-fahkwang
                text-[34px]
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
      "
    />
  )
}


/* ============================================================
   OTHER PRODUCT IMAGE
============================================================ */

function OtherProductImage({
  product,
}: {
  product: (typeof products)[number]
}) {
  const [failed, setFailed] =
    useState(false)


  if (
    product.imagePlaceholder ||
    failed
  ) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
        "
      >

        <span
          className="
            font-fahkwang
            text-[24px]
            italic
            text-[#E85D2C]
          "
        >
          am · pm
        </span>

      </div>
    )
  }


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
        p-8
        transition-transform
        duration-700
        group-hover:scale-[1.04]
      "
    />
  )
}


/* ============================================================
   PRODUCT SPEC
============================================================ */

function ProductSpec({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="bg-[#FBF8F3] p-4">

      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#8A837B]">
        {label}
      </p>

      <p className="mt-2 font-poppins text-[12px] font-semibold">
        {value}
      </p>

    </div>
  )
}


/* ============================================================
   STAR ROW
============================================================ */

function StarRow({
  rating,
}: {
  rating: number
}) {
  return (
    <>
      {[1, 2, 3, 4, 5].map(
        (star) => (
          <span
            key={star}
            className={
              star <= rating
                ? 'text-[17px] text-[#E85D2C]'
                : 'text-[17px] text-[#D6CEC4]'
            }
          >
            ★
          </span>
        )
      )}
    </>
  )
}