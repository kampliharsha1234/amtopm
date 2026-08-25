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
  priority: string
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
]

const priorities = [
  'Hydration',
  'Brightening',
  'Anti-aging',
  'Acne Control',
  'Barrier Repair',
  'Sun Protection',
]

export default function QuizPage() {
  const router = useRouter()

  const {
    addProductsToCart,
    hydrated,
  } = useCart()

  const [step, setStep] = useState<QuizStep>('intro')

  const [answers, setAnswers] = useState<Answers>({
    skinType: '',
    concerns: [],
    priority: '',
  })

  const [addingRoutine, setAddingRoutine] = useState(false)


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
    const scored = products.map(product => {
      let score = 0

      answers.concerns.forEach(concern => {
        if (product.concern.includes(concern)) {
          score += 3
        }
      })

      if (
        answers.skinType &&
        (
          product.skinType.includes('All') ||
          product.skinType.includes(answers.skinType)
        )
      ) {
        score += 2
      }

      if (
        answers.priority === 'Acne Control' &&
        product.concern.includes('Acne')
      ) {
        score += 2
      }

      if (
        answers.priority === 'Barrier Repair' &&
        product.concern.includes('Barrier')
      ) {
        score += 2
      }

      if (
        answers.priority === 'Brightening' &&
        product.concern.includes('Dark Spots')
      ) {
        score += 2
      }

      if (
        answers.priority === 'Sun Protection' &&
        product.concern.includes('SPF')
      ) {
        score += 3
      }

      if (
        answers.priority === 'Hydration' &&
        product.concern.includes('Barrier')
      ) {
        score += 1
      }

      return {
        product,
        score,
      }
    })

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(item => item.product)
  }, [answers])


  const amProducts = recommendedProducts
    .filter(
      product =>
        product.category === 'am' ||
        product.category === 'both'
    )
    .slice(0, 2)


  const pmProducts = recommendedProducts
    .filter(
      product =>
        product.category === 'pm' ||
        product.category === 'both'
    )
    .slice(0, 2)


  const routineProducts = useMemo(() => {
    return [
      ...amProducts,
      ...pmProducts,
    ].filter(
      (product, index, array) =>
        array.findIndex(
          item => item.id === product.id
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

    /*
     * Add the entire routine in a single CartContext update.
     */
    addProductsToCart(routineProducts)

    /*
     * Next.js client navigation.
     *
     * This does NOT reload the entire application like
     * window.location.href does.
     */
    router.push('/cart')
  }


  /* ============================================================
     CONCERN TOGGLE
  ============================================================ */

  const handleConcernToggle = (
    concern: string
  ) => {
    setAnswers(prev => ({
      ...prev,
      concerns: prev.concerns.includes(concern)
        ? prev.concerns.filter(c => c !== concern)
        : [...prev.concerns, concern],
    }))
  }


  /* ============================================================
     RESET
  ============================================================ */

  const resetQuiz = () => {
    setAnswers({
      skinType: '',
      concerns: [],
      priority: '',
    })

    setStep('intro')
  }


  /* ============================================================
     INTRO
  ============================================================ */

  const renderIntro = () => (
    <section className="
      flex
      min-h-[72vh]
      items-center
      px-1
      py-10
      sm:py-16
    ">

      <div className="
        mx-auto
        w-full
        max-w-4xl
        text-center
      ">

        <p className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.3em]
          text-[#E85D2C]
        ">
          AM:PM SKIN QUIZ
        </p>

        <h1 className="
          mx-auto
          mt-5
          max-w-[750px]
          font-serif
          text-[64px]
          leading-[0.8]
          tracking-[-0.065em]
          text-[#1A1A1A]
          sm:text-[100px]
        ">
          Meet your
          <br />
          <span className="
            italic
            text-[#E85D2C]
          ">
            routine.
          </span>
        </h1>

        <p className="
          mx-auto
          mt-6
          max-w-[420px]
          text-[11px]
          leading-[1.55]
          text-[#6B6B6B]
          sm:text-[13px]
        ">
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
            bg-[#E85D2C]
            px-8
            text-[9px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-white
            transition-colors
            hover:bg-[#D14E20]
          "
        >
          Start quiz →
        </button>

        <p className="
          mt-4
          text-[8px]
          uppercase
          tracking-[0.15em]
          text-[#8A837B]
        ">
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
      Boolean(answers.priority)

    return (
      <section className="
        px-1
        py-8
        pb-14
        sm:py-12
        sm:pb-20
      ">

        <div className="
          mx-auto
          max-w-3xl
        ">

          <div className="
            mb-9
            flex
            items-center
            justify-between
          ">

            <button
              type="button"
              onClick={() => setStep('intro')}
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.15em]
                text-[#6B6B6B]
                hover:text-[#E85D2C]
              "
            >
              ← Back
            </button>

            <span className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-[#6B6B6B]
            ">
              Build your routine
            </span>

          </div>

          <div className="
            mb-12
            h-[2px]
            w-full
            bg-[#E8DFD3]
          ">
            <div className="
              h-full
              w-full
              bg-[#E85D2C]
            " />
          </div>


          {/* SKIN TYPE */}

          <div className="mb-12">

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#E85D2C]
            ">
              01 / 03
            </p>

            <h2 className="
              mt-2
              font-serif
              text-[40px]
              leading-[0.9]
              tracking-[-0.045em]
              sm:text-[54px]
            ">
              What's your skin type?
            </h2>

            <p className="
              mt-2
              text-[10px]
              text-[#6B6B6B]
            ">
              Pick the closest match.
            </p>

            <div className="
              mt-5
              grid
              grid-cols-2
              gap-2
              sm:grid-cols-4
              sm:gap-3
            ">

              {skinTypes.map(type => {
                const selected =
                  answers.skinType === type.name

                return (
                  <button
                    key={type.name}
                    type="button"
                    onClick={() =>
                      setAnswers(prev => ({
                        ...prev,
                        skinType: type.name,
                      }))
                    }
                    className={`
                      min-h-[110px]
                      border
                      p-4
                      text-left
                      transition-all
                      sm:min-h-[135px]
                      sm:p-5
                      ${
                        selected
                          ? 'border-[#E85D2C] bg-[#FCE6D9]'
                          : 'border-[#E8DFD3] bg-[#FBF8F3] hover:border-[#E85D2C]'
                      }
                    `}
                  >

                    <span className="
                      block
                      font-serif
                      text-[22px]
                      leading-none
                    ">
                      {type.name}
                    </span>

                    <span className="
                      mt-3
                      block
                      text-[8px]
                      leading-[1.5]
                      text-[#6B6B6B]
                    ">
                      {type.description}
                    </span>

                    {selected && (
                      <span className="
                        mt-3
                        block
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[#E85D2C]
                      ">
                        Selected
                      </span>
                    )}

                  </button>
                )
              })}

            </div>

          </div>


          {/* CONCERNS */}

          <div className="mb-12">

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#E85D2C]
            ">
              02 / 03
            </p>

            <h2 className="
              mt-2
              font-serif
              text-[40px]
              leading-[0.9]
              tracking-[-0.045em]
              sm:text-[54px]
            ">
              What are you working on?
            </h2>

            <p className="
              mt-2
              text-[10px]
              text-[#6B6B6B]
            ">
              Select all that apply.
            </p>

            <div className="
              mt-5
              grid
              grid-cols-2
              gap-2
              sm:grid-cols-3
              sm:gap-3
            ">

              {concerns.map(concern => {

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
                      min-h-[64px]
                      border
                      px-4
                      text-left
                      transition-all
                      ${
                        selected
                          ? 'border-[#E85D2C] bg-[#FCE6D9] text-[#E85D2C]'
                          : 'border-[#E8DFD3] bg-[#FBF8F3] hover:border-[#E85D2C]'
                      }
                    `}
                  >

                    <span className="
                      text-[11px]
                      font-medium
                    ">
                      {concern}
                    </span>

                    {selected && (
                      <span className="
                        float-right
                        text-[10px]
                      ">
                        ✓
                      </span>
                    )}

                  </button>
                )
              })}

            </div>

          </div>


          {/* PRIORITY */}

          <div>

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-[#E85D2C]
            ">
              03 / 03
            </p>

            <h2 className="
              mt-2
              font-serif
              text-[40px]
              leading-[0.9]
              tracking-[-0.045em]
              sm:text-[54px]
            ">
              What's your priority?
            </h2>

            <p className="
              mt-2
              text-[10px]
              text-[#6B6B6B]
            ">
              Pick the result you care about most.
            </p>

            <div className="
              mt-5
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              sm:gap-3
            ">

              {priorities.map(priority => {

                const selected =
                  answers.priority === priority

                return (
                  <button
                    key={priority}
                    type="button"
                    onClick={() =>
                      setAnswers(prev => ({
                        ...prev,
                        priority,
                      }))
                    }
                    className={`
                      min-h-[58px]
                      border
                      px-4
                      text-left
                      transition-all
                      ${
                        selected
                          ? 'border-[#E85D2C] bg-[#FCE6D9] text-[#E85D2C]'
                          : 'border-[#E8DFD3] bg-[#FBF8F3] hover:border-[#E85D2C]'
                      }
                    `}
                  >

                    <span className="
                      text-[11px]
                      font-medium
                    ">
                      {priority}
                    </span>

                    {selected && (
                      <span className="
                        float-right
                        text-[10px]
                      ">
                        ✓
                      </span>
                    )}

                  </button>
                )
              })}

            </div>

            <div className="
              mt-7
              flex
              justify-end
            ">

              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep('result')}
                className={`
                  min-h-[48px]
                  px-7
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  transition-all
                  ${
                    canContinue
                      ? 'bg-[#E85D2C] text-white hover:bg-[#D14E20]'
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
     PRODUCT ROW
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

      <div className="
        h-[72px]
        w-[64px]
        shrink-0
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
            duration-500
            group-hover:scale-105
          "
        />

      </div>

      <div className="
        min-w-0
        flex-1
      ">

        <div className="
          flex
          gap-2
        ">

          <span className="
            text-[8px]
            font-medium
            text-[#E85D2C]
          ">
            0{index + 1}
          </span>

          <h3 className="
            font-serif
            text-[18px]
            leading-[0.95]
            tracking-[-0.025em]
          ">
            {product.name}
          </h3>

        </div>

        <p className="
          mt-2
          text-[8px]
          leading-[1.4]
          text-[#6B6B6B]
        ">
          {product.tagline}
        </p>

        <p className="
          mt-2
          text-[10px]
          font-medium
        ">
          ₹{product.price}
        </p>

      </div>

    </Link>
  )


  /* ============================================================
     RESULTS
  ============================================================ */

  const renderResult = () => (

    <section className="
      px-1
      py-8
      pb-16
      sm:py-12
      sm:pb-20
    ">

      <div className="
        mx-auto
        max-w-5xl
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <button
            type="button"
            onClick={() => setStep('questions')}
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#6B6B6B]
              hover:text-[#E85D2C]
            "
          >
            ← Adjust answers
          </button>

          <button
            type="button"
            onClick={resetQuiz}
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#6B6B6B]
              hover:text-[#E85D2C]
            "
          >
            Retake
          </button>

        </div>


        <div className="
          mt-8
          border-b
          border-[#E8DFD3]
          pb-7
        ">

          <p className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.28em]
            text-[#E85D2C]
          ">
            YOUR ROUTINE
          </p>

          <h1 className="
            mt-3
            font-serif
            text-[55px]
            leading-[0.82]
            tracking-[-0.055em]
            sm:text-[76px]
          ">
            Made for
            <br />
            <span className="
              italic
              text-[#E85D2C]
            ">
              your skin.
            </span>
          </h1>

          <p className="
            mt-4
            text-[10px]
            text-[#6B6B6B]
          ">
            {answers.skinType} · {answers.priority}
          </p>

        </div>


        <div className="
          mt-6
          grid
          gap-3
          sm:grid-cols-2
        ">


          {/* AM */}

          <div className="
            border
            border-[#E8DFD3]
            bg-[#FBF8F3]
          ">

            <div className="
              flex
              items-end
              justify-between
              border-b
              border-[#E8DFD3]
              p-5
            ">

              <div>

                <p className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#E85D2C]
                ">
                  MORNING
                </p>

                <h2 className="
                  mt-1
                  font-serif
                  text-[31px]
                  leading-none
                ">
                  AM
                </h2>

              </div>

              <span className="
                text-[18px]
                text-[#E85D2C]
              ">
                ☼
              </span>

            </div>

            <div className="p-1">

              {amProducts.map((product, index) => (
                <RoutineProduct
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}

            </div>

          </div>


          {/* PM */}

          <div className="
            border
            border-[#E8DFD3]
            bg-[#FBF8F3]
          ">

            <div className="
              flex
              items-end
              justify-between
              border-b
              border-[#E8DFD3]
              p-5
            ">

              <div>

                <p className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[#E85D2C]
                ">
                  EVENING
                </p>

                <h2 className="
                  mt-1
                  font-serif
                  text-[31px]
                  leading-none
                ">
                  PM
                </h2>

              </div>

              <span className="
                text-[18px]
                text-[#E85D2C]
              ">
                ◐
              </span>

            </div>

            <div className="p-1">

              {pmProducts.map((product, index) => (
                <RoutineProduct
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}

            </div>

          </div>

        </div>


        <div className="
          mt-5
          flex
          items-center
          justify-between
          border-y
          border-[#E8DFD3]
          py-4
        ">

          <span className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#6B6B6B]
          ">
            Your routine
          </span>

          <span className="
            font-serif
            text-[20px]
          ">
            {routineProducts.length} products
          </span>

        </div>


        <div className="
          mt-5
          grid
          gap-2
          sm:grid-cols-2
        ">

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
              px-6
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-white
              transition-colors
              ${
                addingRoutine
                  ? 'cursor-wait bg-[#D14E20]'
                  : 'bg-[#E85D2C] hover:bg-[#D14E20]'
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
              border
              border-[#1A1A1A]
              px-6
              text-[9px]
              font-medium
              uppercase
              tracking-[0.18em]
              text-[#1A1A1A]
              hover:bg-[#1A1A1A]
              hover:text-white
            "
          >
            Retake quiz
          </button>

        </div>

      </div>

    </section>
  )


  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="
      min-h-screen
      overflow-x-hidden
      bg-[#F7F2EB]
      text-[#1A1A1A]
    ">

      <div className="
        h-24
        sm:h-32
      " />

      <div className="
        mx-auto
        w-full
        max-w-7xl
        px-4
        sm:px-6
      ">

        {step === 'intro' && renderIntro()}

        {step === 'questions' && renderQuestions()}

        {step === 'result' && renderResult()}

      </div>

      <Footer />

    </main>
  )
}