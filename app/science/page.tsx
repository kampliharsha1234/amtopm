import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Ingredients Science | AM:PM',
  description:
    'Understand the ingredients behind AM:PM skincare and why each one has a job.',
}

const acids = [
  {
    name: 'Azelaic Acid',
    description: 'Calms inflammation and helps clear breakouts.',
  },
  {
    name: 'Lactic Acid',
    description: 'Gently exfoliates for smoother, brighter skin.',
  },
  {
    name: 'Tranexamic Acid',
    description: 'Helps fade hyperpigmentation and dark spots.',
  },
  {
    name: 'Salicylic Acid',
    description: 'Unclogs pores and helps treat acne.',
  },
  {
    name: 'Hyaluronic Acid',
    description: 'Attracts moisture to keep skin hydrated and plump.',
  },
  {
    name: 'Ascorbic Acid',
    description: 'Brightens skin and provides antioxidant support.',
  },
  {
    name: 'Mandelic Acid',
    description: 'Provides gentle exfoliation for more even-looking skin.',
  },
]

const ingredients = [
  {
    name: 'Tranexamic Acid',
    description:
      'Targets the appearance of dark spots and uneven skin tone.',
    number: '01',
  },
  {
    name: 'Azelaic Acid',
    description:
      'Helps calm redness and supports clearer-looking skin.',
    number: '02',
  },
  {
    name: 'Niacinamide',
    description:
      'Supports the skin barrier and helps improve overall texture.',
    number: '03',
  },
  {
    name: 'Ceramides',
    description:
      'Help restore and maintain a healthy skin barrier.',
    number: '04',
  },
]

export default function SciencePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* ========================================================
          INTRO
      ======================================================== */}

      <section className="px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#E85D2C]">
              INGREDIENTS · SCIENCE
            </p>

            <h1 className="mt-4 font-serif text-[54px] leading-[0.88] tracking-[-0.055em] sm:text-[78px]">
              Every ingredient
              <br />
              <span className="italic text-[#E85D2C]">
                has a job.
              </span>
            </h1>

            <p className="mt-5 max-w-[480px] text-[11px] leading-[1.7] text-[#6B6B6B] sm:text-[13px]">
              No mystery ingredients. No complicated jargon.
              Just a clear look at what goes into your skincare
              and why.
            </p>

          </div>
        </div>
      </section>


      {/* ========================================================
          THE 7 ACIDS
      ======================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                THE ACIDS
              </p>

              <h2 className="mt-2 font-serif text-[40px] leading-none tracking-[-0.045em] sm:text-[52px]">
                The 7 acids.
              </h2>
            </div>

            <p className="max-w-[250px] text-[10px] leading-[1.6] text-[#6B6B6B] sm:text-[11px]">
              Each one has a specific purpose.
            </p>

          </div>


          <div className="mt-8 grid grid-cols-1 border-t border-[#E8DFD3] sm:grid-cols-2 lg:grid-cols-3">

            {acids.map((acid, index) => (
              <div
                key={acid.name}
                className="flex min-h-[115px] flex-col justify-between border-b border-[#E8DFD3] py-5 sm:px-5 lg:px-6"
              >

                <div className="flex items-start justify-between gap-4">

                  <h3 className="font-serif text-[21px] leading-none tracking-[-0.025em]">
                    {acid.name}
                  </h3>

                  <span className="text-[8px] font-medium text-[#E85D2C]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                </div>

                <p className="mt-4 max-w-[280px] text-[9px] leading-[1.6] text-[#6B6B6B] sm:text-[10px]">
                  {acid.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ========================================================
          INGREDIENT LIBRARY
      ======================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-xl">

            <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
              INGREDIENT LIBRARY
            </p>

            <h2 className="mt-2 font-serif text-[40px] leading-none tracking-[-0.045em] sm:text-[52px]">
              Know what
              <br />
              your skin gets.
            </h2>

          </div>


          <div className="mt-8 grid grid-cols-1 gap-px border border-[#E8DFD3] bg-[#E8DFD3] sm:grid-cols-2">

            {ingredients.map((ingredient) => (
              <article
                key={ingredient.name}
                className="bg-[#FBF8F3] p-5 sm:p-7"
              >

                <div className="flex items-start justify-between">

                  <span className="text-[8px] font-medium tracking-[0.15em] text-[#E85D2C]">
                    {ingredient.number}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-[#E85D2C]" />

                </div>

                <h3 className="mt-8 font-serif text-[27px] leading-none tracking-[-0.035em]">
                  {ingredient.name}
                </h3>

                <p className="mt-3 max-w-[360px] text-[10px] leading-[1.65] text-[#6B6B6B] sm:text-[11px]">
                  {ingredient.description}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>


      {/* ========================================================
          TESTING & SAFETY
      ======================================================== */}

      <section className="bg-[#1A1A1A] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>

              <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                TESTING & SAFETY
              </p>

              <h2 className="mt-3 max-w-[450px] font-serif text-[42px] leading-[0.92] tracking-[-0.045em] sm:text-[54px]">
                Skin first.
                <br />
                Always.
              </h2>

            </div>


            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">

              <div className="bg-[#1A1A1A] p-5 sm:p-7">

                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#E85D2C]">
                  01
                </span>

                <h3 className="mt-5 font-serif text-[25px] leading-none">
                  Dermatologist-tested
                </h3>

                <p className="mt-3 text-[9px] leading-[1.7] text-white/60 sm:text-[10px]">
                  Formulated with skin health and everyday
                  use in mind.
                </p>

              </div>


              <div className="bg-[#1A1A1A] p-5 sm:p-7">

                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#E85D2C]">
                  02
                </span>

                <h3 className="mt-5 font-serif text-[25px] leading-none">
                  Cruelty-free
                </h3>

                <p className="mt-3 text-[9px] leading-[1.7] text-white/60 sm:text-[10px]">
                  Never tested on animals.
                  Skincare should be kind in every way.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ========================================================
          CTA
      ======================================================== */}

      <section className="px-5 py-14 sm:px-8 sm:py-20">

        <div className="mx-auto max-w-5xl bg-[#E85D2C] px-6 py-12 text-center text-white sm:px-10 sm:py-16">

          <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/70">
            NOW THAT YOU KNOW
          </p>

          <h2 className="mx-auto mt-3 max-w-[600px] font-serif text-[42px] leading-[0.9] tracking-[-0.045em] sm:text-[58px]">
            Find what your
            <br />
            skin actually needs.
          </h2>

          <p className="mx-auto mt-4 max-w-[390px] text-[10px] leading-[1.7] text-white/80 sm:text-[11px]">
            Explore our formulas or take the skin quiz
            to build your AM and PM routine.
          </p>


          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/shop"
              className="inline-flex min-h-[44px] items-center justify-center bg-white px-7 text-[8px] font-medium uppercase tracking-[0.18em] text-[#E85D2C] transition hover:bg-[#FBF8F3]"
            >
              Shop skincare →
            </Link>

            <Link
              href="/quiz"
              className="inline-flex min-h-[44px] items-center justify-center border border-white/50 px-7 text-[8px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-white/10"
            >
              Take the skin quiz
            </Link>

          </div>

        </div>

      </section>


      {/* ========================================================
          FOOTER
      ======================================================== */}

      <Footer />

    </main>
  )
}