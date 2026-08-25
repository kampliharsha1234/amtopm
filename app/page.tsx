'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { products } from './data/products'
import { useCart } from './context/CartContext'
import Footer from './components/Footer'
import { BRAND } from './constants/brand'

const C = BRAND.colors

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
  type: 'main' | 'bestSeller' | 'school'
}

const heroSlides: HeroSlide[] = [
  {
    id: 'main',
    type: 'main',
  },
  {
    id: 'best-seller',
    type: 'bestSeller',
  },
  {
    id: 'skin-school',
    type: 'school',
  },
]


/* ============================================================
   HERO CAROUSEL
============================================================ */

function HeroCarousel({
  bestSeller,
}: {
  bestSeller: (typeof products)[number]
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      )
    }, 8500)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    )
  }

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    )
  }

  const slide = heroSlides[current]

  return (
    <section className="bg-[#F7F2EB] px-4 pb-5 pt-3 sm:px-6 sm:pb-8 sm:pt-5">

      <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-[18px]">

        {/* ==================================================
            MAIN HERO
        ================================================== */}

        {slide.type === 'main' && (
          <div className="relative min-h-[570px] overflow-hidden bg-[#E85D2C] sm:min-h-[650px]">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_15%_85%,rgba(0,0,0,0.12),transparent_35%)]" />

            <div className="absolute -right-28 -top-28 h-[330px] w-[330px] rounded-full border border-white/10 sm:h-[480px] sm:w-[480px]" />

            <div className="absolute -bottom-32 -left-32 h-[300px] w-[300px] rounded-full border border-black/10 sm:h-[450px] sm:w-[450px]" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-6 pb-10 sm:p-10 sm:pb-12">

              <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.28em] text-white/80 sm:text-[10px]">
                AM · PM · EVERY DAY
              </p>

              <h1 className="font-serif text-[58px] leading-[0.84] tracking-[-0.055em] text-white sm:text-[90px]">

                skincare

                <br />

                <span className="italic text-[#FCE6D9]">
                  for morning
                </span>

                <br />

                &amp;{' '}

                <span className="italic text-[#FCE6D9]">
                  night.
                </span>

              </h1>

              <p className="mt-4 max-w-[650px] text-[11px] leading-[1.5] text-white/85 sm:mt-5 sm:text-[14px]">
                Science-first, no-hype skincare that actually makes sense. Discover your personalised AM &amp; PM routine.
              </p>

              <div className="mt-5 flex gap-2.5 sm:mt-6">

                <Link
                  href="/quiz"
                  className="flex min-h-[45px] items-center justify-center bg-[#1A1A1A] px-5 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3D3D3D] sm:min-h-[50px] sm:px-7"
                >
                  Take the skin quiz →
                </Link>

                <Link
                  href="/shop"
                  className="hidden min-h-[50px] items-center justify-center border border-white px-7 text-[9px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-[#1A1A1A] sm:flex"
                >
                  Shop everything
                </Link>

              </div>

            </div>

          </div>
        )}


        {/* ==================================================
            BEST SELLER HERO SLIDE
        ================================================== */}

        {slide.type === 'bestSeller' && (
          <div className="relative min-h-[570px] overflow-hidden bg-[#E8DFD3] sm:min-h-[650px]">

            <img
              src={bestSeller.image}
              alt={bestSeller.name}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent" />

            <div className="absolute left-5 top-5 z-10 bg-[#FCE6D9] px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.18em] text-[#1A1A1A] sm:left-7 sm:top-7">
              Best seller
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10">

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                BEST SELLER
              </p>

              <h2 className="mt-2 max-w-[500px] font-serif text-[40px] leading-[0.95] tracking-[-0.04em] text-white sm:text-[64px]">
                {bestSeller.name}
              </h2>

              <p className="mt-2 text-[12px] text-white/75 sm:text-[14px]">
                {bestSeller.tagline}
              </p>

              <div className="mt-4 flex items-center gap-4">

                <span className="text-[15px] text-white sm:text-[17px]">
                  ₹{bestSeller.price}
                </span>

                <Link
                  href={`/shop/${bestSeller.id}`}
                  className="flex min-h-[44px] items-center justify-center bg-[#FBF8F3] px-6 text-[9px] font-medium uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:bg-[#E85D2C] hover:text-white"
                >
                  Shop now →
                </Link>

              </div>

            </div>

          </div>
        )}


        {/* ==================================================
            SKIN SCHOOL HERO SLIDE
        ================================================== */}

        {slide.type === 'school' && (
          <div className="relative min-h-[570px] overflow-hidden bg-[#1A1A1A] sm:min-h-[650px]">

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

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/25 to-transparent" />

            <div className="absolute left-5 top-5 z-10 sm:left-7 sm:top-7">

              <span className="bg-[#FCE6D9] px-3 py-1.5 text-[8px] font-medium uppercase tracking-[0.18em] text-[#1A1A1A]">
                Free skin tips
              </span>

            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-10">

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                SKIN SCHOOL
              </p>

              <h2 className="mt-2 max-w-[560px] font-serif text-[45px] leading-[0.9] tracking-[-0.045em] text-white sm:text-[70px]">

                Your skin,

                <br />

                <span className="italic text-[#E85D2C]">
                  explained.
                </span>

              </h2>

              <Link
                href="/school"
                className="mt-5 inline-flex min-h-[44px] items-center justify-center border border-white px-6 text-[9px] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[#1A1A1A]"
              >
                Explore Skin School →
              </Link>

            </div>

          </div>
        )}


        {/* ==================================================
            HERO ARROWS
        ================================================== */}

        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous hero slide"
          className="absolute left-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#FBF8F3]/90 text-[21px] text-[#1A1A1A] shadow-sm transition-transform hover:scale-105 sm:left-5 sm:h-10 sm:w-10"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next hero slide"
          className="absolute right-3 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#FBF8F3]/90 text-[21px] text-[#1A1A1A] shadow-sm transition-transform hover:scale-105 sm:right-5 sm:h-10 sm:w-10"
        >
          ›
        </button>


        {/* ==================================================
            HERO DOTS
        ================================================== */}

        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">

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
   BEST SELLER SECTION
============================================================ */

function BestSellerSection() {

  const { addToCart } = useCart()

  const [addedId, setAddedId] = useState<string | null>(null)

  const bestSellers = products.slice(0, 4)

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
    <section className="bg-[#F7F2EB] py-6 sm:py-10">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="flex items-end justify-between px-4 sm:px-6">

          <div>

            <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#6B6B6B]">
              BEST SELLERS
            </p>

            <h2 className="mt-1 font-serif text-[32px] leading-none tracking-[-0.04em] text-[#1A1A1A] sm:text-[46px]">
              The ones to start with.
            </h2>

          </div>

          <Link
            href="/shop"
            className="hidden rounded-full border border-[#1A1A1A] px-5 py-2 text-[9px] font-medium uppercase tracking-[0.15em] text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-white sm:block"
          >
            View more
          </Link>

        </div>


        {/* ==================================================
            CAROUSEL VIEWPORT

            The viewport itself is full width.

            The inner track gets the mobile left padding.
            This makes the first card visibly inset while
            still allowing the second card to peek through.
        ================================================== */}

        <div
          className="
            mt-4
            overflow-x-auto
            pb-1
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
              gap-4
              pl-[40px]
              pr-[20vw]

              sm:grid
              sm:grid-cols-2
              sm:gap-5
              sm:px-6
              sm:pr-6

              lg:grid-cols-4
            "
          >

            {bestSellers.map((product) => (

              <article
                key={product.id}
                className="
                  min-w-[76vw]
                  snap-start
                  overflow-hidden
                  bg-[#FBF8F3]

                  sm:min-w-0
                "
              >

                {/* PRODUCT IMAGE */}

                <Link
                  href={`/shop/${product.id}`}
                  className="block"
                >

                  <div className="relative aspect-[0.94] overflow-hidden bg-[#E8DFD3]">

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

                    <div className="
                      absolute
                      left-4
                      top-4
                      bg-[#FCE6D9]
                      px-3
                      py-1.5
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-[#1A1A1A]
                    ">
                      Best seller
                    </div>

                  </div>

                </Link>


                {/* PRODUCT DETAILS */}

                <div className="px-4 pb-4 pt-3 sm:p-5">

                  <h3 className="
                    font-serif
                    text-[23px]
                    leading-[0.98]
                    tracking-[-0.035em]
                    text-[#1A1A1A]
                    sm:text-[25px]
                  ">
                    {product.name}
                  </h3>

                  <p className="
                    mt-1.5
                    text-[10px]
                    leading-relaxed
                    text-[#6B6B6B]
                  ">
                    {product.tagline}
                  </p>

                  <div className="mt-2">

                    <span className="
                      text-[15px]
                      font-medium
                      text-[#1A1A1A]
                    ">
                      ₹{product.price}
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className={`
                      mt-3
                      flex
                      min-h-[43px]
                      w-full
                      items-center
                      justify-center
                      rounded-[2px]
                      text-[9px]
                      font-medium
                      uppercase
                      tracking-[0.15em]
                      text-white
                      transition-colors
                      ${
                        addedId === product.id
                          ? 'bg-[#E85D2C]'
                          : 'bg-[#1A1A1A] hover:bg-[#E85D2C]'
                      }
                    `}
                  >
                    {addedId === product.id
                      ? '✓ Added to cart'
                      : 'Add to cart'}
                  </button>

                </div>

              </article>

            ))}

          </div>

        </div>


        {/* MOBILE CAROUSEL INDICATOR */}

        <div className="mt-2 flex justify-center gap-1.5 sm:hidden">

          <span className="h-1.5 w-6 rounded-full bg-[#1A1A1A]" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />

          <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20" />

        </div>


        {/* MOBILE VIEW ALL */}

        <div className="px-4 pt-3 sm:hidden">

          <Link
            href="/shop"
            className="
              flex
              min-h-[43px]
              items-center
              justify-center
              rounded-[2px]
              border
              border-[#1A1A1A]
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
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
    <section className="bg-white px-4 py-7 sm:px-6 sm:py-12">

      <div className="mx-auto max-w-7xl">

        <div className="mb-5">

          <p className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-[#6B6B6B]
          ">
            SHOP BY CONCERN
          </p>

          <h2 className="
            mt-1
            font-serif
            text-[35px]
            leading-none
            tracking-[-0.04em]
            text-[#1A1A1A]
            sm:text-[48px]
          ">
            What does your skin need?
          </h2>

        </div>


        <div className="
          grid
          grid-cols-2
          gap-2.5
          sm:grid-cols-4
          sm:gap-4
        ">

          {concerns.map((item) => (

            <Link
              key={item.name}
              href={`/shop?concern=${encodeURIComponent(item.name)}`}
              className="
                group
                relative
                aspect-[0.82]
                overflow-hidden
                bg-[#E8DFD3]
              "
            >

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

              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#1A1A1A]/80
                via-[#1A1A1A]/10
                to-transparent
              " />

              <div className="
                absolute
                bottom-0
                left-0
                right-0
                p-3.5
                text-white
                sm:p-5
              ">

                <h3 className="
                  font-serif
                  text-[22px]
                  leading-none
                  sm:text-[30px]
                ">
                  {item.name}
                </h3>

                <p className="
                  mt-1
                  text-[8px]
                  leading-[1.3]
                  text-white/80
                  sm:text-[11px]
                ">
                  {item.description}
                </p>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  )
}


/* ============================================================
   SKIN SCHOOL
============================================================ */

function SkinSchoolSection() {

  return (
    <section className="
      bg-[#1A1A1A]
      px-4
      py-8
      sm:px-6
      sm:py-14
    ">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-6">

          <p className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-[#A7A7A7]
          ">
            SKIN SCHOOL
          </p>

          <h2 className="
            mt-2
            font-serif
            text-[48px]
            leading-[0.82]
            tracking-[-0.055em]
            text-white
            sm:text-[72px]
          ">

            Your skin,

            <br />

            <span className="italic text-[#E85D2C]">
              explained.
            </span>

          </h2>

        </div>


        {/* VIDEO */}

        <div className="
          relative
          overflow-hidden
          bg-[#111111]
        ">

          <div className="
            relative
            aspect-[0.78]
            w-full
            sm:aspect-[1.75]
          ">

            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            >

              <source
                src="/videos/skinschool.mp4"
                type="video/mp4"
              />

            </video>


            <div className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#111111]/95
              via-[#111111]/20
              to-transparent
            " />


            {/* VIDEO CONTENT */}

            <div className="
              absolute
              bottom-0
              left-0
              right-0
              p-6
              sm:p-10
            ">

              <p className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.3em]
                text-white/75
              ">
                FREE SKIN TIPS
              </p>

              <h3 className="
                mt-3
                font-serif
                text-[34px]
                leading-[0.9]
                tracking-[-0.04em]
                text-white
                sm:text-[52px]
              ">

                Understand your skin.

                <br />

                <span className="italic text-[#E85D2C]">
                  Make better choices.
                </span>

              </h3>

              <p className="
                mt-4
                max-w-[520px]
                text-[10px]
                leading-[1.55]
                text-white/75
                sm:text-[13px]
              ">
                Simple explanations, ingredient breakdowns and practical skincare advice — without the complicated stuff.
              </p>

              <Link
                href="/school"
                className="
                  mt-5
                  inline-flex
                  min-h-[45px]
                  items-center
                  justify-center
                  border
                  border-white/80
                  px-6
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition-colors
                  hover:border-[#E85D2C]
                  hover:bg-[#E85D2C]
                "
              >
                Explore Skin School →
              </Link>

            </div>

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
    <section className="
      bg-[#F7F2EB]
      px-4
      py-9
      sm:px-6
      sm:py-16
    ">

      <div className="mx-auto max-w-7xl">

        <div className="
          grid
          items-stretch
          sm:grid-cols-[0.9fr_1.1fr]
        ">

          {/* TEXT */}

          <div className="
            flex
            flex-col
            justify-between
            bg-[#E85D2C]
            p-6
            sm:p-10
          ">

            <div>

              <p className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-white/70
              ">
                AM · PM · EVERY DAY
              </p>

              <h2 className="
                mt-6
                text-[39px]
                font-medium
                leading-[0.9]
                tracking-[-0.05em]
                text-white
                sm:text-[60px]
              ">

                effortless

                <br />

                beauty,

                <br />

                <span className="
                  font-serif
                  italic
                  text-[#FCE6D9]
                ">
                  timeless care.
                </span>

              </h2>

            </div>


            <div className="mt-10">

              <p className="
                max-w-[340px]
                font-serif
                text-[19px]
                leading-[1.25]
                text-white/85
                sm:text-[24px]
              ">
                Skincare that actually makes sense — without the noise.
              </p>

              <Link
                href="/shop"
                className="
                  mt-6
                  inline-flex
                  min-h-[45px]
                  items-center
                  justify-center
                  bg-[#1A1A1A]
                  px-6
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-white
                  transition-colors
                  hover:bg-[#3D3D3D]
                "
              >
                Shop now →
              </Link>

            </div>

          </div>


          {/* IMAGE */}

          <div className="
            relative
            min-h-[370px]
            overflow-hidden
            bg-[#E8DFD3]
            sm:min-h-[540px]
          ">

            <img
              src="/images/barrier.png"
              alt="AM:PM skincare"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#1A1A1A]/35
              to-transparent
            " />

            <div className="
              absolute
              bottom-5
              left-5
              right-5
              flex
              items-end
              justify-between
              sm:bottom-7
              sm:left-7
              sm:right-7
            ">

              <p className="
                max-w-[220px]
                font-serif
                text-[22px]
                italic
                leading-[1]
                text-white
                sm:text-[29px]
              ">
                Good skin starts with understanding.
              </p>

              <span className="
                hidden
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/80
                sm:block
              ">
                AM:PM
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}


/* ============================================================
   WHY AM:PM
============================================================ */

function TrustSection() {

  const trustItems = [
    {
      number: '01',
      title: 'Dermatologist-inspired',
      description: 'Built around real skin health, not marketing trends.',
    },
    {
      number: '02',
      title: 'Science-first',
      description: 'Every ingredient earns its place in your routine.',
    },
    {
      number: '03',
      title: 'No unnecessary hype',
      description: 'Straightforward products and honest information.',
    },
  ]

  return (
    <section className="
      bg-white
      px-4
      py-9
      sm:px-6
      sm:py-16
    ">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="
          grid
          gap-5
          sm:grid-cols-[0.9fr_1.1fr]
          sm:items-end
        ">

          <div>

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-[#6B6B6B]
            ">
              WHY AM:PM
            </p>

            <h2 className="
              mt-2
              font-serif
              text-[42px]
              leading-[0.88]
              tracking-[-0.045em]
              text-[#1A1A1A]
              sm:text-[62px]
            ">

              Less noise.

              <br />

              <span className="italic text-[#E85D2C]">
                Better skincare.
              </span>

            </h2>

          </div>


          <p className="
            max-w-[430px]
            text-[12px]
            leading-relaxed
            text-[#6B6B6B]
            sm:justify-self-end
            sm:text-[14px]
          ">
            Skincare should not feel like a second job. We keep the routine simple, the information honest, and every formula purposeful.
          </p>

        </div>


        {/* TRUST CARDS */}

        <div className="
          mt-7
          grid
          gap-2.5
          sm:grid-cols-3
          sm:gap-3
        ">

          {trustItems.map((item, index) => (

            <div
              key={item.number}
              className={`
                relative
                min-h-[190px]
                overflow-hidden
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
                  text-[9px]
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


              <div className="
                absolute
                bottom-5
                left-5
                right-5
                sm:bottom-7
                sm:left-7
                sm:right-7
              ">

                <h3
                  className={`
                    font-serif
                    text-[24px]
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
                    text-[10px]
                    leading-relaxed
                    sm:text-[11px]
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


        {/* SIGNATURE LINE */}

        <div className="
          mt-7
          flex
          items-center
          gap-3
        ">

          <span className="
            h-px
            flex-1
            bg-[#E8DFD3]
          " />

          <span className="
            font-serif
            text-[16px]
            italic
            text-[#E85D2C]
          ">
            Made with patience.
          </span>

          <span className="
            h-px
            flex-1
            bg-[#E8DFD3]
          " />

        </div>

      </div>

    </section>
  )
}


/* ============================================================
   HOMEPAGE
============================================================ */

export default function Home() {

  const bestSeller = products[0]

  return (
    <main className="
      min-h-screen
      overflow-x-hidden
      bg-[#F7F2EB]
      text-[#1A1A1A]
    ">

      {/* ======================================================
          01 — HERO
      ====================================================== */}

      <HeroCarousel
        bestSeller={bestSeller}
      />


      {/* ======================================================
          02 — BEST SELLERS
      ====================================================== */}

      <BestSellerSection />


      {/* ======================================================
          03 — SHOP BY CONCERN
      ====================================================== */}

      <ConcernSection />


      {/* ======================================================
          04 — SKIN SCHOOL
      ====================================================== */}

      <SkinSchoolSection />


      {/* ======================================================
          05 — EFFORTLESS BEAUTY
      ====================================================== */}

      <EditorialPromo />


      {/* ======================================================
          06 — WHY AM:PM
      ====================================================== */}

      <TrustSection />


      {/* ======================================================
          07 — UNIFIED FOOTER
      ====================================================== */}

      <Footer />

    </main>
  )
}