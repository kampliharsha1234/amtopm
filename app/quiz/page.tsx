'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

type QuizStep = 'intro' | 'questions' | 'result'

type Answers = {
  skinType: string
  concerns: string[]
  priorities: string[]
}

const skinTypes = [
  {
    name: 'Dry',
    description: 'Tight, flaky or easily dehydrated.',
  },
  {
    name: 'Oily',
    description: 'Shiny or prone to excess oil.',
  },
  {
    name: 'Combination',
    description: 'Oily in some areas, dry in others.',
  },
  {
    name: 'Sensitive',
    description: 'Easily irritated or reactive.',
  },
]

const concerns = [
  'Acne',
  'Dark Spots',
  'SPF',
  'Barrier',
  'Aging',
  'Redness',
  'Pigmentation',
  'Sunburn',
]

const priorities = [
  'Hydration',
  'Brightening',
  'Anti-aging',
  'Acne Control',
  'Barrier Repair',
  'Sun Protection',
]

/* ============================================================
   PRIORITY → PRODUCT CONCERN MAPPING

   This is intentionally kept in one place so that when the
   product database is updated later, the quiz logic can easily
   be refined around the product concern data.
============================================================ */

const priorityConcernMap: Record<string, string[]> = {
  Hydration: ['Barrier'],
  Brightening: ['Dark Spots', 'Pigmentation'],
  'Anti-aging': ['Aging'],
  'Acne Control': ['Acne'],
  'Barrier Repair': ['Barrier'],
  'Sun Protection': ['SPF', 'Sunburn'],
}

/* ============================================================
   QUIZ PAGE
============================================================ */

export default function QuizPage() {
  const router = useRouter()

  const {
    addProductsToCart,
    hydrated,
  } = useCart()

  const [step, setStep] =
    useState<QuizStep>('intro')

  const [answers, setAnswers] =
    useState<Answers>({
      skinType: '',
      concerns: [],
      priorities: [],
    })

  const [addingRoutine, setAddingRoutine] =
    useState(false)

  /* ============================================================
     SCROLL TOP WHEN MOVING BETWEEN QUIZ STEPS
  ============================================================ */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [step])

  /* ============================================================
     PRODUCT RECOMMENDATION
  ============================================================ */

  const recommendedProducts = useMemo(() => {
    const scored = products.map((product) => {
      let score = 0

      const productConcerns = Array.isArray(product.concern)
        ? product.concern
        : [product.concern]

      /* --------------------------------------------------------
         CONCERN MATCHING
         User concern = stronger match
      -------------------------------------------------------- */

      answers.concerns.forEach((concern) => {
        if (productConcerns.includes(concern)) {
          score += 4
        }
      })

      /* --------------------------------------------------------
         SKIN TYPE MATCHING
      -------------------------------------------------------- */

      if (
        answers.skinType &&
        (
          product.skinType.includes('All') ||
          product.skinType.includes(answers.skinType)
        )
      ) {
        score += 2
      }

      /* --------------------------------------------------------
         MULTIPLE PRIORITIES
      -------------------------------------------------------- */

      answers.priorities.forEach((priority) => {
        const relatedConcerns =
          priorityConcernMap[priority] || []

        if (
          relatedConcerns.some((concern) =>
            productConcerns.includes(concern)
          )
        ) {
          score += 3
        }
      })

      return {
        product,
        score,
      }
    })

    return scored
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }

        return (
          a.product.name.localeCompare(
            b.product.name
          )
        )
      })
      .filter((item) => item.score > 0)
      .slice(0, 6)
      .map((item) => item.product)
  }, [answers])

  /* ============================================================
     AM PRODUCTS
  ============================================================ */

  const amProducts = useMemo(() => {
    return recommendedProducts
      .filter(
        (product) =>
          product.category === 'am' ||
          product.category === 'both'
      )
      .slice(0, 3)
  }, [recommendedProducts])

  /* ============================================================
     PM PRODUCTS
  ============================================================ */

  const pmProducts = useMemo(() => {
    return recommendedProducts
      .filter(
        (product) =>
          product.category === 'pm' ||
          product.category === 'both'
      )
      .slice(0, 3)
  }, [recommendedProducts])

  /* ============================================================
     COMPLETE ROUTINE
  ============================================================ */

  const routineProducts = useMemo(() => {
    return [...amProducts, ...pmProducts].filter(
      (product, index, array) =>
        array.findIndex(
          (item) => item.id === product.id
        ) === index
    )
  }, [amProducts, pmProducts])

  /* ============================================================
     ADD ROUTINE + GO TO CART
  ============================================================ */

  const handleShopRoutine = () => {
    if (
      addingRoutine ||
      !hydrated ||
      routineProducts.length === 0
    ) {
      return
    }

    setAddingRoutine(true)

    addProductsToCart(routineProducts)

    router.push('/cart')
  }

  /* ============================================================
     CONCERN TOGGLE
  ============================================================ */

  const handleConcernToggle = (
    concern: string
  ) => {
    setAnswers((prev) => ({
      ...prev,

      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(
            (item) => item !== concern
          )
        : [...prev.concerns, concern],
    }))
  }

  /* ============================================================
     PRIORITY TOGGLE
  ============================================================ */

  const handlePriorityToggle = (
    priority: string
  ) => {
    setAnswers((prev) => ({
      ...prev,

      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter(
            (item) => item !== priority
          )
        : [...prev.priorities, priority],
    }))
  }

  /* ============================================================
     RESET
  ============================================================ */

  const resetQuiz = () => {
    setAnswers({
      skinType: '',
      concerns: [],
      priorities: [],
    })

    setStep('intro')
  }

  /* ============================================================
     INTRO
  ============================================================ */

  const renderIntro = () => (
    <section
      className="
        flex
        min-h-[72vh]
        items-center
        px-1
        py-10
        sm:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-4xl
          text-center
        "
      >
        <p
          className="
            text-[10px]
            font-medium
            lowercase
            tracking-[0.25em]
            text-[#E85D2C]
          "
        >
          amtopm skin test
        </p>

        <h1
          className="
            mx-auto
            mt-5
            max-w-[750px]
            font-sans
            text-[42px]
            font-bold
            leading-[0.92]
            tracking-[-0.04em]
            text-[#1A1A1A]
            sm:text-[64px]
          "
        >
          Meet your
          <br />
          <span className="font-fahkwang font-normal italic text-[#E85D2C]">
            routine.
          </span>
        </h1>

        <p
          className="
            mx-auto
            mt-6
            max-w-[420px]
            text-[14px]
            font-light
            leading-[1.55]
            text-[#6B6B6B]
          "
        >
          A few quick questions.
          A routine built around your skin.
        </p>

        <button
          type="button"
          onClick={() => setStep('questions')}
          className="
            mt-7
            inline-flex
            min-h-[50px]
            items-center
            justify-center
            rounded-full
            bg-[#E85D2C]
            px-8
            text-[14px]
            font-medium
            text-white
            transition-all
            hover:bg-[#D14E20]
            hover:-translate-y-[1px]
          "
        >
          Start skin test →
        </button>

        <p
          className="
            mt-4
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-[#8A837B]
          "
        >
          Takes about 2 minutes
        </p>
      </div>
    </section>
  )

  /* ============================================================
     QUESTIONS
  ============================================================ */

  const renderQuestions = () => {
    const canContinue =
      Boolean(answers.skinType) &&
      answers.concerns.length > 0 &&
      answers.priorities.length > 0

    return (
      <section
        className="
          px-1
          py-8
          pb-14
          sm:py-12
          sm:pb-20
        "
      >
        <div
          className="
            mx-auto
            max-w-3xl
          "
        >
          {/* TOP BAR */}

          <div
            className="
              mb-9
              flex
              items-center
              justify-between
            "
          >
            <button
              type="button"
              onClick={() => setStep('intro')}
              className="
                rounded-full
                px-3
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-[#6B6B6B]
                transition-colors
                hover:bg-[#FCE6D9]
                hover:text-[#E85D2C]
              "
            >
              ← Back
            </button>

            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[#6B6B6B]
              "
            >
              Build your routine
            </span>
          </div>

          {/* PROGRESS */}

          <div
            className="
              mb-12
              h-[2px]
              w-full
              bg-[#E8DFD3]
            "
          >
            <div
              className="
                h-full
                w-full
                bg-[#E85D2C]
              "
            />
          </div>

          {/* ==================================================
              01 — SKIN TYPE
          ================================================== */}

          <div className="mb-12">
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#E85D2C]
              "
            >
              01 / 03
            </p>

            <h2
              className="
                mt-2
                font-sans
                text-[35px]
                font-bold
                leading-[0.94]
                tracking-[-0.035em]
                sm:text-[48px]
              "
            >
              What&apos;s your skin type?
            </h2>

            <p
              className="
                mt-2
                text-[14px]
                font-light
                text-[#6B6B6B]
              "
            >
              Pick the closest match.
            </p>

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-2
                sm:grid-cols-4
                sm:gap-3
              "
            >
              {skinTypes.map((type) => {
                const selected =
                  answers.skinType === type.name

                return (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({
                        ...prev,
                        skinType: type.name,
                      }))
                    }
                    className={`
                      min-h-[120px]
                      rounded-[20px]
                      border
                      p-4
                      text-left
                      transition-all
                      sm:min-h-[145px]
                      sm:p-5
                      ${
                        selected
                          ? 'border-[#E85D2C] bg-[#FCE6D9]'
                          : 'border-[#E8DFD3] bg-[#FBF8F3] hover:border-[#E85D2C]'
                      }
                    `}
                  >
                    <span
                      className="
                        block
                        font-fahkwang
                        text-[22px]
                        font-normal
                        leading-none
                        text-[#1A1A1A]
                      "
                    >
                      {type.name}
                    </span>

                    <span
                      className="
                        mt-3
                        block
                        text-[14px]
                        font-light
                        leading-[1.45]
                        text-[#6B6B6B]
                      "
                    >
                      {type.description}
                    </span>

                    {selected && (
                      <span
                        className="
                          mt-3
                          inline-block
                          rounded-full
                          bg-[#E85D2C]
                          px-3
                          py-1
                          text-[9px]
                          font-medium
                          uppercase
                          tracking-[0.12em]
                          text-white
                        "
                      >
                        Selected
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ==================================================
              02 — CONCERNS
          ================================================== */}

          <div className="mb-12">
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#E85D2C]
              "
            >
              02 / 03
            </p>

            <h2
              className="
                mt-2
                font-sans
                text-[35px]
                font-bold
                leading-[0.94]
                tracking-[-0.035em]
                sm:text-[48px]
              "
            >
              What are you working on?
            </h2>

            <p
              className="
                mt-2
                text-[14px]
                font-light
                text-[#6B6B6B]
              "
            >
              Select all that apply.
            </p>

            <div
              className="
                mt-5
                grid
                grid-cols-2
                gap-2
                sm:grid-cols-3
                sm:gap-3
              "
            >
              {concerns.map((concern) => {
                const selected =
                  answers.concerns.includes(concern)

                return (
                  <button
                    key={concern}
                    type="button"
                    onClick={() =>
                      handleConcernToggle(concern)
                    }
                    className={`
                      flex
                      min-h-[64px]
                      items-center
                      justify-between
                      rounded-full
                      border
                      px-5
                      text-left
                      transition-all
                      ${
                        selected
                          ? 'border-[#E85D2C] bg-[#FCE6D9] text-[#E85D2C]'
                          : 'border-[#E8DFD3] bg-[#FBF8F3] hover:border-[#E85D2C]'
                      }
                    `}
                  >
                    <span
                      className="
                        text-[14px]
                        font-medium
                      "
                    >
                      {concern}
                    </span>

                    {selected && (
                      <span className="ml-2 text-[14px]">
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ==================================================
              03 — PRIORITIES
          ================================================== */}

          <div>
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-[#E85D2C]
              "
            >
              03 / 03
            </p>

            <h2
              className="
                mt-2
                font-sans
                text-[35px]
                font-bold
                leading-[0.94]
                tracking-[-0.035em]
                sm:text-[48px]
              "
            >
              What&apos;s your priority?
            </h2>

            <p
              className="
                mt-2
                text-[14px]
                font-light
                text-[#6B6B6B]
              "
            >
              Select all the results that matter to you.
            </p>

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
                sm:gap-3
              "
            >
              {priorities.map((priority) => {
                const selected =
                  answers.priorities.includes(
                    priority
                  )

                return (
                  <button
                    key={priority}
                    type="button"
                    onClick={() =>
                      handlePriorityToggle(priority)
                    }
                    className={`
                      flex
                      min-h-[60px]
                      items-center
                      justify-between
                      rounded-full
                      border
                      px-5
                      text-left
                      transition-all
                      ${
                        selected
                          ? 'border-[#E85D2C] bg-[#FCE6D9] text-[#E85D2C]'
                          : 'border-[#E8DFD3] bg-[#FBF8F3] hover:border-[#E85D2C]'
                      }
                    `}
                  >
                    <span
                      className="
                        text-[14px]
                        font-medium
                      "
                    >
                      {priority}
                    </span>

                    {selected && (
                      <span className="ml-2 text-[14px]">
                        ✓
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* CONTINUE */}

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep('result')}
                className={`
                  inline-flex
                  min-h-[48px]
                  items-center
                  justify-center
                  rounded-full
                  px-7
                  text-[14px]
                  font-medium
                  transition-all
                  ${
                    canContinue
                      ? 'bg-[#E85D2C] text-white hover:bg-[#D14E20] hover:-translate-y-[1px]'
                      : 'cursor-not-allowed bg-[#E8DFD3] text-[#9A938B]'
                  }
                `}
              >
                See my routine →
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  /* ============================================================
     ROUTINE PRODUCT
  ============================================================ */

  const RoutineProduct = ({
    product,
    index,
  }: {
    product: (typeof products)[number]
    index: number
  }) => (
    <Link
      href={`/shop/${product.id}`}
      className="
        group
        flex
        gap-3
        border-b
        border-[#E8DFD3]
        p-3
        last:border-0
        sm:p-4
      "
    >
      <div
        className="
          h-[72px]
          w-[64px]
          shrink-0
          overflow-hidden
          rounded-[14px]
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
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex gap-2">
          <span
            className="
              pt-0.5
              text-[9px]
              font-semibold
              text-[#E85D2C]
            "
          >
            0{index + 1}
          </span>

          <h3
            className="
              font-sans
              text-[17px]
              font-semibold
              leading-[1.05]
              tracking-[-0.02em]
            "
          >
            {product.name}
          </h3>
        </div>

        <p
          className="
            mt-2
            text-[14px]
            font-light
            leading-[1.4]
            text-[#6B6B6B]
          "
        >
          {product.tagline}
        </p>

        <p
          className="
            mt-2
            text-[14px]
            font-medium
          "
        >
          ₹{product.price}
        </p>
      </div>
    </Link>
  )

  /* ============================================================
     RESULTS
  ============================================================ */

  const renderResult = () => (
    <section
      className="
        px-1
        py-8
        pb-16
        sm:py-12
        sm:pb-20
      "
    >
      <div
        className="
          mx-auto
          max-w-5xl
        "
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep('questions')}
            className="
              rounded-full
              px-3
              py-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#6B6B6B]
              transition-colors
              hover:bg-[#FCE6D9]
              hover:text-[#E85D2C]
            "
          >
            ← Adjust answers
          </button>

          <button
            type="button"
            onClick={resetQuiz}
            className="
              rounded-full
              px-3
              py-2
              text-[10px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#6B6B6B]
              transition-colors
              hover:bg-[#FCE6D9]
              hover:text-[#E85D2C]
            "
          >
            Retake
          </button>
        </div>

        {/* RESULT HEADER */}

        <div
          className="
            mt-8
            border-b
            border-[#E8DFD3]
            pb-7
          "
        >
          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-[#E85D2C]
            "
          >
            YOUR ROUTINE
          </p>

          <h1
            className="
              mt-3
              font-sans
              text-[48px]
              font-bold
              leading-[0.9]
              tracking-[-0.04em]
              sm:text-[68px]
            "
          >
            Made for
            <br />
            <span className="font-fahkwang font-normal italic text-[#E85D2C]">
              your skin.
            </span>
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {answers.skinType && (
              <span
                className="
                  rounded-full
                  bg-[#FCE6D9]
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  text-[#E85D2C]
                "
              >
                {answers.skinType}
              </span>
            )}

            {answers.priorities.map((priority) => (
              <span
                key={priority}
                className="
                  rounded-full
                  border
                  border-[#E8DFD3]
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  text-[#6B6B6B]
                "
              >
                {priority}
              </span>
            ))}
          </div>
        </div>

        {/* ==================================================
            AM / PM
        ================================================== */}

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
          "
        >
          {/* AM */}

          <div
            className="
              overflow-hidden
              rounded-[22px]
              border
              border-[#E8DFD3]
              bg-[#FBF8F3]
            "
          >
            <div
              className="
                flex
                items-end
                justify-between
                border-b
                border-[#E8DFD3]
                p-5
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[#E85D2C]
                  "
                >
                  Morning
                </p>

                <h2
                  className="
                    mt-1
                    font-sans
                    text-[31px]
                    font-bold
                    leading-none
                  "
                >
                  AM
                </h2>
              </div>

              <span className="text-[18px] text-[#E85D2C]">
                ☼
              </span>
            </div>

            <div className="p-1">
              {amProducts.length > 0 ? (
                amProducts.map((product, index) => (
                  <RoutineProduct
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))
              ) : (
                <div className="p-5">
                  <p className="text-[14px] font-light leading-[1.5] text-[#6B6B6B]">
                    We&apos;re still refining your morning
                    recommendations. Check back as our
                    product range grows.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PM */}

          <div
            className="
              overflow-hidden
              rounded-[22px]
              border
              border-[#E8DFD3]
              bg-[#FBF8F3]
            "
          >
            <div
              className="
                flex
                items-end
                justify-between
                border-b
                border-[#E8DFD3]
                p-5
              "
            >
              <div>
                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[#E85D2C]
                  "
                >
                  Evening
                </p>

                <h2
                  className="
                    mt-1
                    font-sans
                    text-[31px]
                    font-bold
                    leading-none
                  "
                >
                  PM
                </h2>
              </div>

              <span className="text-[18px] text-[#E85D2C]">
                ◐
              </span>
            </div>

            <div className="p-1">
              {pmProducts.length > 0 ? (
                pmProducts.map((product, index) => (
                  <RoutineProduct
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))
              ) : (
                <div className="p-5">
                  <p className="text-[14px] font-light leading-[1.5] text-[#6B6B6B]">
                    We&apos;re still refining your evening
                    recommendations. Check back as our
                    product range grows.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            ROUTINE SUMMARY
        ================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            gap-2
            border-y
            border-[#E8DFD3]
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#6B6B6B]
            "
          >
            Your routine
          </span>

          <span
            className="
              font-fahkwang
              text-[20px]
              text-[#1A1A1A]
            "
          >
            {routineProducts.length}{' '}
            {routineProducts.length === 1
              ? 'product'
              : 'products'}
          </span>
        </div>

        {/* ==================================================
            ACTIONS
        ================================================== */}

        <div
          className="
            mt-5
            grid
            gap-2
            sm:grid-cols-2
          "
        >
          <button
            type="button"
            onClick={handleShopRoutine}
            disabled={
              addingRoutine ||
              !hydrated ||
              routineProducts.length === 0
            }
            className={`
              flex
              min-h-[52px]
              items-center
              justify-center
              rounded-full
              px-6
              text-[14px]
              font-medium
              text-white
              transition-all
              ${
                addingRoutine
                  ? 'cursor-wait bg-[#D14E20]'
                  : routineProducts.length === 0
                    ? 'cursor-not-allowed bg-[#E8DFD3] text-[#9A938B]'
                    : 'bg-[#E85D2C] hover:bg-[#D14E20] hover:-translate-y-[1px]'
              }
            `}
          >
            {addingRoutine
              ? 'Adding routine...'
              : 'Add routine to bag →'}
          </button>

          <button
            type="button"
            onClick={resetQuiz}
            className="
              flex
              min-h-[52px]
              items-center
              justify-center
              rounded-full
              border
              border-[#1A1A1A]
              px-6
              text-[14px]
              font-medium
              text-[#1A1A1A]
              transition-all
              hover:bg-[#1A1A1A]
              hover:text-white
            "
          >
            Retake skin test
          </button>
        </div>
      </div>
    </section>
  )

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
      {/* Navbar-safe spacing */}

      <div className="h-24 sm:h-32" />

      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
        "
      >
        {step === 'intro' && renderIntro()}

        {step === 'questions' && renderQuestions()}

        {step === 'result' && renderResult()}
      </div>

    </main>
  )
}