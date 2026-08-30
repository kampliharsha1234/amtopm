'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { products } from './data/products'
import { useCart } from './context/CartContext'

/* ============================================================
   SHOP BY CONCERN
============================================================ */

const concerns = [
  {
    name: 'Acne',
    description: 'Clarify, calm, keep clear.',
    image: '/images/acne.png',
  },
  {
    name: 'Dark Spots',
    description: 'Even tone. Softer marks.',
    image: '/images/darkspots.png',
  },
  {
    name: 'SPF',
    description: 'The last step. Every day.',
    image: '/images/sunscreen.png',
  },
  {
    name: 'Barrier',
    description: 'Repair. Restore. Protect.',
    image: '/images/barrier.png',
  },
]

/* ============================================================
   HERO SLIDES
============================================================ */

type HeroSlide = {
  id: string
  type: 'main' | 'consultation' | 'science'
}

const heroSlides: HeroSlide[] = [
  {
    id: 'main',
    type: 'main',
  },
  {
    id: 'consultation',
    type: 'consultation',
  },
  {
    id: 'science',
    type: 'science',
  },
]

/* ============================================================
   BEFORE / AFTER CUSTOMER RESULTS
============================================================ */

const beforeAfterImages = [
  {
    id: 'bfaf5',
    image: '/images/before-after/bfaf5.png',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'bfaf4',
    image: '/images/before-after/bfaf4.png',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'bfaf1',
    image: '/images/before-after/bfaf1.png',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'bfaf2',
    image: '/images/before-after/bfaf2.png',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'bfaf3',
    image: '/images/before-after/bfaf3.png',
    alt: 'Customer before and after skincare results',
  },
]

/* ============================================================
   DOCTOR REVIEWS
============================================================ */

const doctorReviews = [
  {
    id: 'doctor-1',
    name: 'Dr. Your Name',
    designation: 'Dermatologist',
    image: '/images/doctors/doctor1.png',
    review:
      'amtopm takes a thoughtful approach to skincare, with a clear focus on purposeful formulations and skin health.',
  },
  {
    id: 'doctor-2',
    name: 'Dr. Your Name',
    designation: 'Consultant Dermatologist',
    image: '/images/doctors/doctor2.png',
    review:
      'Good skincare starts with understanding the skin. amtopm keeps that principle at the centre of its approach.',
  },
  {
    id: 'doctor-3',
    name: 'Dr. Your Name',
    designation: 'Dermatology Expert',
    image: '/images/doctors/doctor3.png',
    review:
      'A simple, science-led routine can make a meaningful difference without unnecessary complexity.',
  },
]

/* ============================================================
   HERO CAROUSEL
============================================================ */

function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      )
    }, 8500)

    return () => clearInterval(interval)
  }, [])

  const slide = heroSlides[current]

  return (
    <section className="bg-[#F7F2EB] px-4 pb-5 pt-3 sm:px-6 sm:pb-8 sm:pt-5">
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1600px]
          overflow-hidden
          rounded-[24px]
        "
      >
        {/* ==================================================
            MAIN HERO
        ================================================== */}

        {slide.type === 'main' && (
          <div
            className="
              relative
              min-h-[570px]
              overflow-hidden
              bg-[#E85D2C]
              sm:min-h-[700px]
              lg:min-h-[760px]
              xl:min-h-[800px]
            "
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(0,0,0,0.12),transparent_35%)]" />

            <div className="absolute -right-28 -top-28 h-[330px] w-[330px] rounded-full border border-white/10 sm:h-[480px] sm:w-[480px]" />

            <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full border border-black/10 sm:h-[450px] sm:w-[450px]" />

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                z-10
                p-6
                pb-12
                sm:p-10
                sm:pb-14
                lg:p-14
                lg:pb-16
              "
            >
              <p className="mb-3 text-[9px] font-semibold lowercase tracking-[0.2em] text-white/80 sm:text-[10px]">
                am · pm · every day
              </p>

              <h1
                className="
                  max-w-[920px]
                  font-sans
                  text-[35px]
                  font-bold
                  leading-[0.96]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[62px]
                  sm:leading-[0.92]
                  sm:tracking-[-0.04em]
                  lg:text-[74px]
                  xl:text-[86px]
                "
              >
                Specialised
                <br />
                Cosmeceutical
                <br className="hidden sm:block" />
                <span className="sm:inline">
                  {' '}
                  &amp; Dermacare
                </span>
                <br />
                Products.
              </h1>

              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <Link
                  href="/quiz"
                  className="
                    inline-flex
                    min-h-[44px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white
                    bg-transparent
                    px-5
                    text-[14px]
                    font-medium
                    text-white
                    transition-all
                    hover:bg-white
                    hover:text-[#1A1A1A]
                    sm:min-h-[50px]
                    sm:px-7
                  "
                >
                  Take the skin test →
                </Link>

                <Link
                  href="/shop"
                  className="
                    hidden
                    min-h-[50px]
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    px-7
                    text-[14px]
                    font-medium
                    text-[#1A1A1A]
                    transition-all
                    hover:bg-[#1A1A1A]
                    hover:text-white
                    sm:inline-flex
                  "
                >
                  Shop everything
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================
            FREE CONSULTATION HERO
        ================================================== */}

        {slide.type === 'consultation' && (
          <div
            className="
              relative
              min-h-[570px]
              overflow-hidden
              bg-[#E85D2C]
              sm:min-h-[700px]
              lg:min-h-[760px]
              xl:min-h-[800px]
            "
          >
            <img
              src="/images/barrier.png"
              alt="amtopm free skin consultation"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/30 to-[#1A1A1A]/5" />

            <div className="absolute left-5 top-5 z-10 sm:left-7 sm:top-7">
              <span className="rounded-full bg-[#FCE6D9] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1A1A1A]">
                Free consultation
              </span>
            </div>

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10
                p-6
                pb-12
                sm:p-10
                sm:pb-14
                lg:p-14
                lg:pb-16
              "
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:text-[10px]">
                Personal skin guidance
              </p>

              <h2
                className="
                  mt-3
                  max-w-[850px]
                  font-sans
                  text-[34px]
                  font-bold
                  leading-[0.96]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[56px]
                  lg:text-[70px]
                "
              >
                Fix your skin health with our specialised skin expert and dermat.
              </h2>

              <Link
                href="/consultation"
                className="
                  mt-6
                  inline-flex
                  min-h-[44px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white
                  bg-transparent
                  px-5
                  text-[14px]
                  font-medium
                  text-white
                  transition-all
                  hover:bg-white
                  hover:text-[#1A1A1A]
                  sm:min-h-[50px]
                  sm:px-7
                "
              >
                Book your free consultation →
              </Link>
            </div>
          </div>
        )}

        {/* ==================================================
            INGREDIENT SCIENCE HERO
        ================================================== */}

        {slide.type === 'science' && (
          <div
            className="
              relative
              min-h-[570px]
              overflow-hidden
              bg-[#1A1A1A]
              sm:min-h-[700px]
              lg:min-h-[760px]
              xl:min-h-[800px]
            "
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="/videos/skinschool.mp4"
                type="video/mp4"
              />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/30 to-transparent" />

            <div className="absolute left-5 top-5 z-10 sm:left-7 sm:top-7">
              <span className="rounded-full bg-[#FCE6D9] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#1A1A1A]">
                Ingredient science
              </span>
            </div>

            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                z-10
                p-6
                pb-12
                sm:p-10
                sm:pb-14
                lg:p-14
                lg:pb-16
              "
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:text-[10px]">
                Formulation science
              </p>

              <h2
                className="
                  mt-3
                  max-w-[900px]
                  font-sans
                  text-[34px]
                  font-bold
                  leading-[0.96]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[56px]
                  lg:text-[70px]
                "
              >
                How our formulations work on your skin.
              </h2>

              <Link
                href="/science"
                className="
                  mt-6
                  inline-flex
                  min-h-[44px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/80
                  bg-transparent
                  px-5
                  text-[14px]
                  font-medium
                  text-white
                  transition-all
                  hover:bg-white
                  hover:text-[#1A1A1A]
                  sm:min-h-[50px]
                  sm:px-7
                "
              >
                Explore ingredient science →
              </Link>
            </div>
          </div>
        )}

        {/* ==================================================
            HERO DOTS
        ================================================== */}

        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 sm:bottom-5">
          {heroSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Hero slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   OUR PRODUCTS
============================================================ */

function BestSellerSection() {
  const { addToCart } = useCart()

  const [addedId, setAddedId] =
    useState<string | null>(null)

  const displayedProducts = products.slice(0, 4)

  const handleAddToCart = (
    product: (typeof products)[number]
  ) => {
    addToCart(product, 1)

    setAddedId(product.id)

    setTimeout(() => {
      setAddedId(null)
    }, 1800)
  }

  return (
    <section className="bg-[#F7F2EB] py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between px-4 sm:px-6">
          <h2 className="font-sans text-[34px] font-bold leading-none tracking-[-0.04em] text-[#1A1A1A] sm:text-[48px]">
            Our Products
          </h2>

          <Link
            href="/shop"
            className="
              hidden
              rounded-full
              border
              border-[#1A1A1A]
              px-5
              py-2.5
              text-[14px]
              font-medium
              text-[#1A1A1A]
              transition-all
              hover:bg-[#1A1A1A]
              hover:text-white
              sm:block
            "
          >
            View more
          </Link>
        </div>

        <div
          className="
            mt-6
            overflow-x-auto
            pb-2
            snap-x
            snap-mandatory
            scrollbar-hide
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div
            className="
              flex
              gap-5
              pl-5
              pr-[15vw]

              sm:grid
              sm:grid-cols-2
              sm:gap-6
              sm:px-6
              sm:pr-6

              lg:grid-cols-4
            "
          >
            {displayedProducts.map((product) => (
              <article
                key={product.id}
                className="min-w-[78vw] snap-start sm:min-w-0"
              >
                <Link
                  href={`/shop/${product.id}`}
                  className="block"
                >
                  <div
                    className="
                      relative
                      aspect-[0.88]
                      overflow-hidden
                      rounded-[22px]
                      bg-[#E8DFD3]
                    "
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        hover:scale-[1.03]
                      "
                    />
                  </div>
                </Link>

                <div className="flex min-h-[122px] flex-col px-1 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3
                      className="
                        min-w-0
                        flex-1
                        font-sans
                        text-[19px]
                        font-semibold
                        leading-[1.05]
                        tracking-[-0.025em]
                        text-[#1A1A1A]
                        sm:text-[21px]
                      "
                    >
                      {product.name}
                    </h3>

                    <span className="shrink-0 pt-0.5 text-[15px] font-semibold text-[#1A1A1A]">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="mt-auto pt-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className={`
                        flex
                        min-h-[42px]
                        w-full
                        items-center
                        justify-center
                        rounded-full
                        px-5
                        text-[14px]
                        font-medium
                        transition-all
                        ${
                          addedId === product.id
                            ? 'bg-[#E85D2C] text-white'
                            : 'bg-[#1A1A1A] text-white hover:bg-[#E85D2C]'
                        }
                      `}
                    >
                      {addedId === product.id
                        ? '✓ Added to cart'
                        : 'Add to cart'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-1.5 sm:hidden">
          <span className="h-1.5 w-6 rounded-full bg-[#1A1A1A]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
        </div>

        <div className="px-4 pt-4 sm:hidden">
          <Link
            href="/shop"
            className="
              flex
              min-h-[44px]
              items-center
              justify-center
              rounded-full
              border
              border-[#1A1A1A]
              text-[14px]
              font-medium
              text-[#1A1A1A]
            "
          >
            View all products →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   SHOP BY CONCERN
============================================================ */

function ConcernSection() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h2 className="font-sans text-[34px] font-bold leading-none tracking-[-0.04em] text-[#1A1A1A] sm:text-[48px]">
            Shop by Concern
          </h2>
        </div>

        <div
          className="
            overflow-x-auto
            pb-2
            snap-x
            snap-mandatory
            scrollbar-hide
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-4 pl-1 pr-[18vw]">
            {concerns.map((item) => (
              <Link
                key={item.name}
                href={`/shop?concern=${encodeURIComponent(item.name)}`}
                className="
                  group
                  relative
                  min-w-[76vw]
                  snap-start
                  overflow-hidden
                  rounded-[22px]
                  bg-[#E8DFD3]
                  sm:min-w-[330px]
                  lg:min-w-[300px]
                "
              >
                <div className="relative aspect-[0.82]">
                  <img
                    src={item.image}
                    alt={`${item.name} skincare`}
                    className="
                      absolute
                      inset-0
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/10 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-6">
                    <h3 className="font-sans text-[27px] font-bold leading-none tracking-[-0.03em] sm:text-[32px]">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-[14px] font-light leading-[1.35] text-white/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          <span className="h-1.5 w-6 rounded-full bg-[#1A1A1A]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   FREE CONSULTATION SECTION
============================================================ */

function FreeConsultationSection() {
  return (
    <section className="bg-[#1A1A1A] px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#A7A7A7]">
            FREE CONSULTATION
          </p>

          <h2 className="mt-2 font-sans text-[42px] font-bold leading-[0.9] tracking-[-0.04em] text-white sm:text-[62px]">
            Get expert guidance.
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-[22px] bg-[#111111]">
          <div className="relative aspect-[0.85] w-full sm:aspect-[1.75]">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src="/videos/skinschool.mp4"
                type="video/mp4"
              />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/95 via-[#111111]/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/75">
                PERSONAL SKIN CONSULTATION
              </p>

              <h3 className="mt-3 max-w-[700px] font-sans text-[31px] font-bold leading-[0.94] tracking-[-0.04em] text-white sm:text-[52px]">
                Understand your skin.
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Get the right direction.
                </span>
              </h3>

              <Link
                href="/support"
                className="
                  mt-5
                  inline-flex
                  min-h-[45px]
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/80
                  bg-transparent
                  px-6
                  text-[14px]
                  font-medium
                  text-white
                  transition-all
                  hover:border-[#E85D2C]
                  hover:bg-[#E85D2C]
                "
              >
                Book your free consultation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   BEFORE / AFTER CUSTOMER RESULTS
============================================================ */

function BeforeAfterSection() {
  return (
    <section className="bg-[#F7F2EB] px-4 py-9 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B]">
            REAL SKIN. REAL JOURNEYS.
          </p>

          <h2 className="mt-2 font-sans text-[38px] font-bold leading-[0.95] tracking-[-0.04em] text-[#1A1A1A] sm:text-[48px]">
            Skin changes.
          </h2>
        </div>

        <div
          className="
            overflow-x-auto
            pb-2
            snap-x
            snap-mandatory
            scrollbar-hide
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-4 pr-[8vw] sm:gap-5 sm:pr-0">
            {beforeAfterImages.map((item, index) => (
              <article
                key={item.id}
                className="
                  min-w-[86vw]
                  snap-start
                  sm:min-w-[620px]
                  lg:min-w-[720px]
                "
              >
                <div className="overflow-hidden rounded-[24px] bg-[#E8DFD3]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="block h-auto w-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-1.5">
          {beforeAfterImages.map((item, index) => (
            <span
              key={item.id}
              className={`
                h-1.5
                rounded-full
                ${
                  index === 0
                    ? 'w-6 bg-[#1A1A1A]'
                    : 'w-1.5 bg-[#1A1A1A]/20'
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   EFFORTLESS BEAUTY
============================================================ */

function EditorialPromo() {
  return (
    <section className="bg-[#F7F2EB] px-4 py-9 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-stretch sm:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between rounded-t-[22px] bg-[#E85D2C] p-6 sm:rounded-l-[22px] sm:rounded-tr-none sm:p-10">
            <div>
              <p className="text-[10px] font-semibold lowercase tracking-[0.2em] text-white/70">
                am · pm · every day
              </p>

              <h2 className="mt-6 font-sans text-[39px] font-bold leading-[0.9] tracking-[-0.05em] text-white sm:text-[60px]">
                effortless
                <br />
                beauty,
                <br />
                <span className="font-fahkwang font-normal italic text-[#FCE6D9]">
                  timeless care.
                </span>
              </h2>
            </div>

            <div className="mt-10">
              <p className="max-w-[340px] font-fahkwang text-[20px] leading-[1.25] text-white/85 sm:text-[25px]">
                Skincare that makes sense.
              </p>

              <Link
                href="/shop"
                className="
                  mt-6
                  inline-flex
                  min-h-[45px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1A1A1A]
                  px-6
                  text-[14px]
                  font-medium
                  text-white
                  transition-all
                  hover:bg-[#3D3D3D]
                "
              >
                Shop now →
              </Link>
            </div>
          </div>

          <div className="relative min-h-[370px] overflow-hidden rounded-b-[22px] bg-[#E8DFD3] sm:min-h-[540px] sm:rounded-b-none sm:rounded-r-[22px]">
            <img
              src="/images/barrier.png"
              alt="amtopm skincare"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/35 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
              <p className="max-w-[220px] font-fahkwang text-[22px] italic leading-[1] text-white sm:text-[29px]">
                Good skin starts with understanding.
              </p>

              <span className="hidden text-[10px] uppercase tracking-[0.2em] text-white/80 sm:block">
                amtopm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   WHY amtopm
============================================================ */

function TrustSection() {
  const trustItems = [
    {
      number: '01',
      title: 'Dermatologist-inspired',
      description: 'Built around real skin health.',
    },
    {
      number: '02',
      title: 'Science-first',
      description: 'Every ingredient has a purpose.',
    },
    {
      number: '03',
      title: 'No unnecessary hype',
      description: 'Simple products. Honest information.',
    },
  ]

  return (
    <section className="bg-white px-4 py-9 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 sm:grid-cols-[0.9fr_1.1fr] sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B]">
              WHY amtopm
            </p>

            <h2 className="mt-2 font-sans text-[40px] font-bold leading-[0.9] tracking-[-0.045em] text-[#1A1A1A] sm:text-[62px]">
              Less noise.
              <br />
              <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                Better skincare.
              </span>
            </h2>
          </div>

          <p className="max-w-[430px] text-[14px] font-light leading-relaxed text-[#6B6B6B] sm:justify-self-end">
            Simple routines. Purposeful formulas.
          </p>
        </div>

        <div className="mt-7 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
          {trustItems.map((item, index) => (
            <div
              key={item.number}
              className={`
                relative
                min-h-[190px]
                overflow-hidden
                rounded-[22px]
                p-5
                sm:min-h-[240px]
                sm:p-7
                ${
                  index === 1
                    ? 'bg-[#E85D2C] text-white'
                    : 'bg-[#F7F2EB] text-[#1A1A1A]'
                }
              `}
            >
              <div
                className={`
                  text-[10px]
                  tracking-[0.25em]
                  ${
                    index === 1
                      ? 'text-white/70'
                      : 'text-[#E85D2C]'
                  }
                `}
              >
                {item.number}
              </div>

              <div
                className={`
                  absolute
                  -right-10
                  -top-10
                  h-28
                  w-28
                  rounded-full
                  ${
                    index === 1
                      ? 'bg-white/10'
                      : 'bg-[#E85D2C]/10'
                  }
                `}
              />

              <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">
                <h3
                  className={`
                    font-sans
                    text-[24px]
                    font-bold
                    leading-[0.95]
                    tracking-[-0.03em]
                    sm:text-[29px]
                    ${
                      index === 1
                        ? 'text-white'
                        : 'text-[#1A1A1A]'
                    }
                  `}
                >
                  {item.title}
                </h3>

                <p
                  className={`
                    mt-2
                    max-w-[280px]
                    text-[14px]
                    font-light
                    leading-relaxed
                    ${
                      index === 1
                        ? 'text-white/70'
                        : 'text-[#6B6B6B]'
                    }
                  `}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E8DFD3]" />

          <span className="font-fahkwang text-[20px] italic text-[#E85D2C]">
            Made with patience.
          </span>

          <span className="h-px flex-1 bg-[#E8DFD3]" />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   DOCTOR REVIEWS
============================================================ */

function DoctorReviewsSection() {
  return (
    <section className="bg-[#F7F2EB] px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 sm:mb-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6B6B6B]">
            EXPERT PERSPECTIVE
          </p>

          <h2 className="mt-2 font-sans text-[38px] font-bold leading-[0.95] tracking-[-0.04em] text-[#1A1A1A] sm:text-[48px]">
            Trusted by skin experts.
          </h2>
        </div>

        <div
          className="
            overflow-x-auto
            pb-3
            snap-x
            snap-mandatory
            scrollbar-hide
          "
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-4 pr-[12vw] sm:grid sm:grid-cols-3 sm:gap-5 sm:pr-0">
            {doctorReviews.map((doctor) => (
              <article
                key={doctor.id}
                className="
                  min-w-[86vw]
                  snap-start
                  overflow-hidden
                  rounded-[24px]
                  bg-white
                  sm:min-w-0
                "
              >
                <div className="relative aspect-[1.15] overflow-hidden bg-[#E8DFD3]">
                  <DoctorImage
                    src={doctor.image}
                    alt={doctor.name}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-4 text-[#E85D2C]">
                    <span className="text-[26px] leading-none">
                      “
                    </span>
                  </div>

                  <p className="font-fahkwang text-[20px] leading-[1.35] text-[#1A1A1A]">
                    {doctor.review}
                  </p>

                  <div className="mt-6 border-t border-[#E8DFD3] pt-4">
                    <p className="font-sans text-[15px] font-semibold text-[#1A1A1A]">
                      {doctor.name}
                    </p>

                    <p className="mt-1 text-[11px] font-light uppercase tracking-[0.12em] text-[#6B6B6B]">
                      {doctor.designation}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-1.5 sm:hidden">
          <span className="h-1.5 w-6 rounded-full bg-[#1A1A1A]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   DOCTOR IMAGE
============================================================ */

function DoctorImage({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#E8DFD3]">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FCE6D9] text-[26px] font-semibold text-[#E85D2C]">
            Dr.
          </div>

          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
            Doctor image
          </p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  )
}

/* ============================================================
   HOMEPAGE
============================================================ */

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">
      {/* 01 — HERO */}

      <HeroCarousel />

      {/* 02 — OUR PRODUCTS */}

      <BestSellerSection />

      {/* 03 — SHOP BY CONCERN */}

      <ConcernSection />

      {/* 04 — FREE CONSULTATION */}

      <FreeConsultationSection />

      {/* 05 — BEFORE / AFTER */}

      <BeforeAfterSection />

      {/* 06 — EFFORTLESS BEAUTY */}

      <EditorialPromo />

      {/* 07 — WHY amtopm */}

      <TrustSection />

      {/* 08 — DOCTOR REVIEWS */}

      <DoctorReviewsSection />
    </main>
  )
}