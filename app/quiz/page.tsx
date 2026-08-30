'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'


/* ============================================================
   TYPES
============================================================ */

type QuizStep = 'intro' | 'questions' | 'result'

type Answers = {
  skinType: string
  concerns: string[]
  priorities: string[]
}


/* ============================================================
   SKIN TYPES
============================================================ */

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


/* ============================================================
   USER-FACING CONCERNS

   These are intentionally written in customer-friendly terms.
   They are translated into product-data concerns below.
============================================================ */

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


/* ============================================================
   PRIORITIES
============================================================ */

const priorities = [
  'Hydration',
  'Brightening',
  'Anti-aging',
  'Acne Control',
  'Barrier Repair',
  'Sun Protection',
]


/* ============================================================
   QUIZ → PRODUCT DATA MAPPING

   The quiz uses simple customer-facing terms while the actual
   product database contains more specific concern labels.

   This is the bridge between the two systems.
============================================================ */

const concernMap: Record<string, string[]> = {
  Acne: [
    'Acne',
    'Oily Skin',
    'Excess Sebum',
    'Blackheads',
    'Whiteheads',
    'Enlarged Pores',
  ],

  'Dark Spots': [
    'Dark Spots',
    'Post-Acne Marks',
    'Uneven Skin Tone',
    'Hyperpigmentation',
    'Pigmentation',
  ],

  SPF: [
    'UV Exposure',
    'Sunburn',
    'Photoaging',
    'Hyperpigmentation',
    'Daily Environmental Exposure',
  ],

  Barrier: [
    'Barrier',
    'Dryness',
    'Dehydration',
    'Sensitivity',
    'Tightness',
    'Irritation',
  ],

  Aging: [
    'Aging',
    'Photoaging',
    'Skin Texture',
    'Radiance',
  ],

  Redness: [
    'Redness',
    'Irritation',
    'Sensitivity',
  ],

  Pigmentation: [
    'Pigmentation',
    'Dark Spots',
    'Uneven Skin Tone',
    'Post-Acne Marks',
    'Hyperpigmentation',
  ],

  Sunburn: [
    'Sunburn',
    'UV Exposure',
    'Daily Environmental Exposure',
  ],
}


/* ============================================================
   PRIORITY → PRODUCT DATA MAPPING
============================================================ */

const priorityMap: Record<string, string[]> = {
  Hydration: [
    'Barrier',
    'Dryness',
    'Dehydration',
    'Daily Hydration',
    'Tightness',
  ],

  Brightening: [
    'Dark Spots',
    'Pigmentation',
    'Uneven Skin Tone',
    'Post-Acne Marks',
    'Radiance',
  ],

  'Anti-aging': [
    'Aging',
    'Photoaging',
    'Skin Texture',
    'Radiance',
  ],

  'Acne Control': [
    'Acne',
    'Oily Skin',
    'Excess Sebum',
    'Blackheads',
    'Whiteheads',
    'Enlarged Pores',
  ],

  'Barrier Repair': [
    'Barrier',
    'Dryness',
    'Dehydration',
    'Sensitivity',
    'Tightness',
    'Irritation',
  ],

  'Sun Protection': [
    'UV Exposure',
    'Sunburn',
    'Photoaging',
    'Hyperpigmentation',
    'Daily Environmental Exposure',
  ],
}


/* ============================================================
   FOUNDATION PRODUCT IDS

   These are products that can sensibly form part of a basic
   routine even when there is no aggressive concern match.
============================================================ */

const foundationProductIds = {
  cleanser: 'mild-cleanser',
  moisturizer: 'cotton-moisturizer',
  sunscreen: 'thinshield-sunscreen',
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
     SCROLL TOP BETWEEN STEPS
  ============================================================ */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [step])


  /* ============================================================
     PRODUCT RECOMMENDATION ENGINE
  ============================================================ */

  const scoredProducts = useMemo(() => {
    return products
      .map((product) => {
        let score = 0

        const productConcerns = product.concern || []


        /* ------------------------------------------------------
           DIRECT CONCERN MATCH
           Strongest signal
        ------------------------------------------------------ */

        answers.concerns.forEach((userConcern) => {
          const mappedConcerns =
            concernMap[userConcern] || []

          mappedConcerns.forEach((mappedConcern) => {
            if (
              productConcerns.includes(mappedConcern)
            ) {
              score += 5
            }
          })
        })


        /* ------------------------------------------------------
           PRIORITY MATCH
        ------------------------------------------------------ */

        answers.priorities.forEach((priority) => {
          const mappedPriorities =
            priorityMap[priority] || []

          mappedPriorities.forEach((mappedConcern) => {
            if (
              productConcerns.includes(mappedConcern)
            ) {
              score += 3
            }
          })
        })


        /* ------------------------------------------------------
           SKIN TYPE MATCH
        ------------------------------------------------------ */

        if (
          answers.skinType &&
          product.skinType.includes(
            answers.skinType
          )
        ) {
          score += 3
        }


        /* ------------------------------------------------------
           FOUNDATIONAL ROUTINE LOGIC
        ------------------------------------------------------ */

        if (
          product.id ===
            foundationProductIds.cleanser &&
          product.category === 'both'
        ) {
          score += 1
        }

        if (
          product.id ===
            foundationProductIds.moisturizer &&
          product.category === 'both'
        ) {
          score += 1
        }


        /* ------------------------------------------------------
           SUNSCREEN PRIORITY
        ------------------------------------------------------ */

        if (
          product.id ===
          foundationProductIds.sunscreen
        ) {
          const needsSunProtection =
            answers.concerns.includes('SPF') ||
            answers.concerns.includes('Sunburn') ||
            answers.priorities.includes(
              'Sun Protection'
            )

          if (needsSunProtection) {
            score += 7
          }
        }


        /* ------------------------------------------------------
           ACNE LOGIC
        ------------------------------------------------------ */

        if (
          product.id ===
            'acnowell-facewash' &&
          (
            answers.concerns.includes('Acne') ||
            answers.priorities.includes(
              'Acne Control'
            )
          )
        ) {
          score += 4
        }

        if (
          product.id ===
            'acnowell-cream' &&
          (
            answers.concerns.includes('Acne') ||
            answers.priorities.includes(
              'Acne Control'
            )
          )
        ) {
          score += 5
        }


        /* ------------------------------------------------------
           PIGMENTATION LOGIC
        ------------------------------------------------------ */

        if (
          product.id === 'faeden-cream' &&
          (
            answers.concerns.includes(
              'Pigmentation'
            ) ||
            answers.concerns.includes(
              'Dark Spots'
            ) ||
            answers.priorities.includes(
              'Brightening'
            )
          )
        ) {
          score += 5
        }


        return {
          product,
          score,
        }
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }

        return a.product.name.localeCompare(
          b.product.name
        )
      })
  }, [answers])


  /* ============================================================
     FINAL RECOMMENDED PRODUCTS

     We don't blindly take all six. We select products that
     actually have meaningful scores.
  ============================================================ */

  const recommendedProducts = useMemo(() => {
    const matched = scoredProducts
      .filter((item) => item.score > 0)
      .map((item) => item.product)

    const ensureProduct = (
      id: string
    ) => {
      const product = products.find(
        (item) => item.id === id
      )

      if (
        product &&
        !matched.some(
          (item) => item.id === product.id
        )
      ) {
        matched.push(product)
      }
    }


    /* ----------------------------------------------------------
       Always ensure a basic cleanser and moisturizer exist
       when there are no stronger matches.
    ---------------------------------------------------------- */

    if (matched.length === 0) {
      ensureProduct(
        foundationProductIds.cleanser
      )

      ensureProduct(
        foundationProductIds.moisturizer
      )
    }


    /* ----------------------------------------------------------
       Sunscreen is a useful AM foundation and becomes a strong
       recommendation when sun protection is relevant.
    ---------------------------------------------------------- */

    const sunRelevant =
      answers.concerns.includes('SPF') ||
      answers.concerns.includes('Sunburn') ||
      answers.priorities.includes(
        'Sun Protection'
      )

    if (sunRelevant) {
      ensureProduct(
        foundationProductIds.sunscreen
      )
    }


    return matched
  }, [scoredProducts, answers])


  /* ============================================================
     AM PRODUCTS
  ============================================================ */

  const amProducts = useMemo(() => {
    const candidates =
      scoredProducts
        .filter((item) =>
          recommendedProducts.some(
            (product) =>
              product.id ===
              item.product.id
          )
        )
        .filter(
          (item) =>
            item.product.category ===
              'am' ||
            item.product.category ===
              'both'
        )
        .sort(
          (a, b) =>
            b.score - a.score
        )
        .map((item) => item.product)


    const result: typeof candidates = []


    /* ----------------------------------------------------------
       Foundational cleanser
    ---------------------------------------------------------- */

    const cleanser = products.find(
      (product) =>
        product.id ===
        foundationProductIds.cleanser
    )

    if (
      cleanser &&
      cleanser.category === 'both'
    ) {
      result.push(cleanser)
    }


    /* ----------------------------------------------------------
       Other scored AM products
    ---------------------------------------------------------- */

    candidates.forEach((product) => {
      if (
        !result.some(
          (item) =>
            item.id === product.id
        )
      ) {
        result.push(product)
      }
    })


    /* ----------------------------------------------------------
       Maximum of 3 AM products
    ---------------------------------------------------------- */

    return result.slice(0, 3)
  }, [scoredProducts, recommendedProducts])


  /* ============================================================
     PM PRODUCTS
  ============================================================ */

  const pmProducts = useMemo(() => {
    const candidates =
      scoredProducts
        .filter((item) =>
          recommendedProducts.some(
            (product) =>
              product.id ===
              item.product.id
          )
        )
        .filter(
          (item) =>
            item.product.category ===
              'pm' ||
            item.product.category ===
              'both'
        )
        .sort(
          (a, b) =>
            b.score - a.score
        )
        .map((item) => item.product)


    const result: typeof candidates = []


    /* ----------------------------------------------------------
       Add strongest matches first
    ---------------------------------------------------------- */

    candidates.forEach((product) => {
      if (
        !result.some(
          (item) =>
            item.id === product.id
        )
      ) {
        result.push(product)
      }
    })


    /* ----------------------------------------------------------
       Make sure moisturizer is available to PM routine
    ---------------------------------------------------------- */

    const moisturizer = products.find(
      (product) =>
        product.id ===
        foundationProductIds.moisturizer
    )

    if (
      moisturizer &&
      !result.some(
        (item) =>
          item.id ===
          moisturizer.id
      )
    ) {
      result.push(moisturizer)
    }


    /* ----------------------------------------------------------
       Maximum of 3 PM products
    ---------------------------------------------------------- */

    return result.slice(0, 3)
  }, [scoredProducts, recommendedProducts])


  /* ============================================================
     COMPLETE ROUTINE
  ============================================================ */

  const routineProducts = useMemo(() => {
    return [
      ...amProducts,
      ...pmProducts,
    ].filter(
      (product, index, array) =>
        array.findIndex(
          (item) =>
            item.id === product.id
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

    addProductsToCart(
      routineProducts
    )

    router.push('/cart')
  }


  /* ============================================================
     CONCERN TOGGLE
  ============================================================ */

  const handleConcernToggle = (
    concern: string
  ) => {
    setAnswers((previous) => ({
      ...previous,

      concerns:
        previous.concerns.includes(
          concern
        )
          ? previous.concerns.filter(
              (item) =>
                item !== concern
            )
          : [
              ...previous.concerns,
              concern,
            ],
    }))
  }


  /* ============================================================
     PRIORITY TOGGLE
  ============================================================ */

  const handlePriorityToggle = (
    priority: string
  ) => {
    setAnswers((previous) => ({
      ...previous,

      priorities:
        previous.priorities.includes(
          priority
        )
          ? previous.priorities.filter(
              (item) =>
                item !== priority
            )
          : [
              ...previous.priorities,
              priority,
            ],
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
          onClick={() =>
            setStep('questions')
          }
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
            hover:-translate-y-[1px]
            hover:bg-[#D14E20]
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
              onClick={() =>
                setStep('intro')
              }
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
              SKIN TYPE
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
                  answers.skinType ===
                  type.name

                return (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() =>
                      setAnswers(
                        (previous) => ({
                          ...previous,
                          skinType:
                            type.name,
                        })
                      )
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
              CONCERNS
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
                  answers.concerns.includes(
                    concern
                  )

                return (
                  <button
                    key={concern}
                    type="button"
                    onClick={() =>
                      handleConcernToggle(
                        concern
                      )
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

                    <span className="text-[14px] font-medium">
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
              PRIORITIES
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
                      handlePriorityToggle(
                        priority
                      )
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

                    <span className="text-[14px] font-medium">
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
                onClick={() =>
                  setStep('result')
                }
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
                      ? 'bg-[#E85D2C] text-white hover:-translate-y-[1px] hover:bg-[#D14E20]'
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
        {product.imagePlaceholder ? (

          <div className="flex h-full w-full items-center justify-center">

            <span className="font-fahkwang text-[10px] italic text-[#E85D2C]">
              am · pm
            </span>

          </div>

        ) : (

          <img
            src={product.image}
            alt={product.name}
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

        )}
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

        {/* TOP ACTIONS */}

        <div className="flex items-center justify-between">

          <button
            type="button"
            onClick={() =>
              setStep('questions')
            }
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


            {answers.concerns.map(
              (concern) => (
                <span
                  key={concern}
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
                  {concern}
                </span>
              )
            )}

          </div>

        </div>


        {/* ==================================================
            AM / PM ROUTINES
        ================================================== */}

        <div
          className="
            mt-6
            grid
            gap-3
            sm:grid-cols-2
          "
        >

          {/* ==================================================
              MORNING
          ================================================== */}

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

                amProducts.map(
                  (product, index) => (
                    <RoutineProduct
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  )
                )

              ) : (

                <div className="p-5">

                  <p className="text-[14px] font-light leading-[1.5] text-[#6B6B6B]">
                    We&apos;re still refining your morning
                    recommendations.
                  </p>

                </div>

              )}

            </div>

          </div>


          {/* ==================================================
              EVENING
          ================================================== */}

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

                pmProducts.map(
                  (product, index) => (
                    <RoutineProduct
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  )
                )

              ) : (

                <div className="p-5">

                  <p className="text-[14px] font-light leading-[1.5] text-[#6B6B6B]">
                    We&apos;re still refining your evening
                    recommendations.
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
            Recommended routine
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
              transition-all
              ${
                addingRoutine
                  ? 'cursor-wait bg-[#D14E20] text-white'
                  : routineProducts.length === 0
                    ? 'cursor-not-allowed bg-[#E8DFD3] text-[#9A938B]'
                    : 'bg-[#E85D2C] text-white hover:-translate-y-[1px] hover:bg-[#D14E20]'
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


        {/* NOTE */}

        <p
          className="
            mx-auto
            mt-5
            max-w-[620px]
            text-center
            text-[10px]
            font-light
            leading-[1.6]
            text-[#8A837B]
          "
        >
          Your recommendations are based on the answers you provided.
          Individual skin responses can vary.
        </p>

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

      {/* Space for floating navbar */}

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

        {step === 'intro' &&
          renderIntro()}

        {step === 'questions' &&
          renderQuestions()}

        {step === 'result' &&
          renderResult()}

      </div>


      <Footer />

    </main>
  )
}