'use client'

import Link from 'next/link'
import Image from 'next/image'
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
    image: '/images/spf-concern.png',
  },
  {
    name: 'Barrier',
    description: 'Repair. Restore. Protect.',
    image: '/images/barrier-concern.png',
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
    id: 'before-after-1',
    image: '/images/before-after/before%20after%20(1).jpeg',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'before-after-2',
    image: '/images/before-after/before%20after%20(2).jpeg',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'before-after-3',
    image: '/images/before-after/before%20after%20(3).jpeg',
    alt: 'Customer before and after skincare results',
  },
  {
    id: 'before-after-4',
    image: '/images/before-after/before%20after%20(4).jpeg',
    alt: 'Customer before and after skincare results',
  },
]

/* ============================================================
   DOCTOR REVIEWS
============================================================ */

const doctorReviews = [
  {
    id: 'doctor-1',
    name: 'Dr Shloka Mehta',
    designation: 'Dermatologist',
    image: '/images/doctors-review/Dr%20Shloka%20Mehta.jpeg',
    review:
      'I appreciate the ingredient-focused approach. The formulations are designed around concerns rather than unnecessary complexity.',
  },
  {
    id: 'doctor-2',
    name: 'Dr Ramesh Gaurav',
    designation: 'Consultant and Dermatologist',
    image: '/images/doctors-review/Dr%20Ramesh%20Gaurav.jpeg',
    review:
      'amtopm takes a sensible approach to everyday skincare, well-selected actives, purposeful formulations and a strong focus on skin comfort.',
  },
  {
    id: 'doctor-3',
    name: 'Dr R Sharma',
    designation: 'Dermatology expert',
    image: '/images/doctors-review/Dr%20R%20Sharma.jpeg',
    review:
      'A promising science-led skincare approach with formulations built around commonly encountered concerns such as acne, pigmentation and barrier care.',
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
            <Image
              src="/images/orangehero.PNG"
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 48px), 1600px"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/75 via-[#1A1A1A]/20 to-[#E85D2C]/10" />

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
                amtopm · every day
              </p>

              <h1
                className="
                  max-w-[920px]
                  font-sans
                  text-[32px]
                  font-bold
                  leading-[0.96]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[56px]
                  sm:leading-[0.92]
                  sm:tracking-[-0.04em]
                  lg:text-[66px]
                  xl:text-[76px]
                "
              >
                Skin Health, Simply Done
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
            <Image
              src="/images/doctors-review/dr%20anand%20patil.PNG"
              alt="Dr Anand Patil consultation"
              fill
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 48px), 1600px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/65 via-[#1A1A1A]/15 to-transparent" />

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
                  text-[29px]
                  font-bold
                  leading-[0.96]
                  tracking-[-0.03em]
                  text-white
                  sm:text-[46px]
                  lg:text-[58px]
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
                      className={`flex min-h-[42px] w-full items-center justify-center rounded-full px-5 text-[14px] font-medium transition-all ${
                        addedId === product.id
                          ? 'bg-[#E85D2C] text-white'
                          : 'bg-[#1A1A1A] text-white hover:bg-[#E85D2C]'
                      }`}
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
                href="/consultation"
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
                <div className="relative aspect-square overflow-hidden rounded-[24px] bg-[#E8DFD3]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </article>
            ))}
          </div>
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
                amtopm · every day
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
              src="/images/labelled.PNG"
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
            <p className="text-[10px] font-semibold lowercase tracking-[0.28em] text-[#6B6B6B]">
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
                    : index === 0
                      ? 'border border-[#D7A184] bg-[#FFF7F0] text-[#1A1A1A] shadow-[0_12px_30px_rgba(232,93,44,0.12)]'
                      : 'border border-[#9EAFA5] bg-[#EEF5F0] text-[#1A1A1A] shadow-[0_12px_30px_rgba(61,93,74,0.12)]'
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
      </div>
    </section>
  )
}

/* ============================================================
   CERTIFICATIONS — COMPACT LOGO-ONLY VERSION
============================================================ */

function CertificationsSection() {
  const certifications = [
    {
      image: '/images/certificates/iso.svg',
      alt: 'ISO certification logo',
    },
    {
      image: '/images/certificates/fda.jpg',
      alt: 'FDA certification logo',
    },
    {
      image: '/images/certificates/gmp.avif',
      alt: 'GMP certification logo',
    },
    {
      image: '/images/certificates/leaping-bunny.png',
      alt: 'Leaping Bunny certification logo',
    },
    {
      image: '/images/certificates/who.svg',
      alt: 'WHO logo',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] px-4 py-9 sm:px-6 sm:py-11">
      {/* ======================================================
          SUBTLE BACKGROUND DETAILS
      ====================================================== */}

      <div className="pointer-events-none absolute -right-24 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-white/[0.05]" />

      <div className="pointer-events-none absolute -left-32 bottom-[-170px] h-[360px] w-[360px] rounded-full border border-[#E85D2C]/10" />


      <div className="relative mx-auto max-w-7xl">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#E85D2C]">
              CERTIFICATION &amp; CARE
            </p>

            <h2 className="mt-2 font-sans text-[31px] font-bold leading-[0.92] tracking-[-0.04em] text-white sm:text-[40px]">
              Made with{' '}
              <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                standards.
              </span>
            </h2>

          </div>

          <p className="max-w-[340px] text-[11px] font-light leading-[1.5] text-white/35 sm:text-right">
            Thoughtful formulation. Responsible care.
          </p>

        </div>


        {/* ====================================================
            LOGO STRIP
        ==================================================== */}

        <div className="mt-6 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          <div className="flex min-w-max items-center">

            {certifications.map(
              (certification, index) => (

                <div
                  key={certification.image}
                  className="
                    flex
                    min-w-[145px]
                    items-center
                    justify-center
                    border-r
                    border-white/10
                    px-5
                    first:pl-0
                    last:border-r-0
                    last:pr-0
                    sm:min-w-[175px]
                    sm:px-7
                  "
                >

                  <div className="flex h-[62px] w-[105px] items-center justify-center">

                    <Image
                        src={certification.image}
                        alt={certification.alt}
                        width={120}
                        height={70}
                        className="
                          max-h-[60px]
                          w-auto
                          max-w-[105px]
                          object-contain
                          opacity-85
                          transition-all
                          duration-300
                          hover:opacity-100
                        "
                      />

                  </div>

                </div>

              )
            )}

          </div>

        </div>


        {/* ====================================================
            BOTTOM LINE
        ==================================================== */}

        <div className="mt-6 flex items-center gap-3">

          <span className="h-px flex-1 bg-white/10" />

          <span className="text-[8px] font-semibold lowercase tracking-[0.24em] text-white/25">
            amtopm
          </span>

          <span className="h-px flex-1 bg-white/10" />

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
    <Image
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      fill
      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 30vw, 390px"
      className="object-cover"
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

      {/* 09 — CERTIFICATIONS */}
      <CertificationsSection />

    </main>
  )
}