import type { Metadata } from 'next'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Our Story | amtopm',
  description:
    'Science-backed skincare, honest guidance, and consistent care. Discover the story and philosophy behind amtopm.',
}

/* ============================================================
   CORE VALUES
============================================================ */

const values = [
  {
    number: '01',
    title: 'Science Before Hype',
    description:
      'We rely on evidence-supported ingredients rather than temporary trends.',
  },
  {
    number: '02',
    title: 'Purposeful Formulation',
    description:
      'Every active ingredient should contribute meaningfully to the formula.',
  },
  {
    number: '03',
    title: 'Radical Transparency',
    description:
      'We explain what our products contain, why they are included, and how they should be used.',
  },
  {
    number: '04',
    title: 'Everyday Consistency',
    description:
      'Healthy skin is built through daily habits, not miracle claims.',
  },
  {
    number: '05',
    title: 'Trust',
    description:
      'Trust is our most valuable asset. We aim to earn it with every product and interaction.',
  },
]

/* ============================================================
   BELIEFS
============================================================ */

const beliefs = [
  'Skincare should never rely on confusion.',
  'Every ingredient should serve a purpose.',
  'Education creates better skincare decisions.',
  'Consistency matters more than shortcuts.',
  'Trust is earned through transparency.',
  'Healthier skin helps people feel more confident.',
]

/* ============================================================
   PROMISE
============================================================ */

const promises = [
  'Formulate responsibly.',
  'Communicate honestly.',
  'Prioritize quality over trends.',
  'Continuously improve through science and feedback.',
  'Treat every customer with respect and transparency.',
]

/* ============================================================
   ABOUT PAGE
============================================================ */

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="px-5 pb-12 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-7xl">

          <p className="text-[10px] font-medium lowercase tracking-[0.25em] text-[#E85D2C]">
            amtopm
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">

            <h1
              className="
                max-w-[900px]
                font-sans
                text-[46px]
                font-bold
                leading-[0.92]
                tracking-[-0.045em]
                sm:text-[68px]
                lg:text-[88px]
              "
            >
              Skincare is not about
              <br />
              <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                chasing perfection.
              </span>
            </h1>

            <p className="max-w-[430px] text-[14px] font-light leading-[1.7] text-[#6B6B6B] lg:pb-2">
              It is about understanding your skin, making informed choices, and building healthier skin through consistent care.
            </p>

          </div>

        </div>
      </section>


      {/* ======================================================
          WHO WE ARE
      ====================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.25fr_0.75fr] lg:gap-16">

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                WHO WE ARE
              </p>
            </div>

            <div>

              <h2
                className="
                  max-w-[850px]
                  font-sans
                  text-[34px]
                  font-bold
                  leading-[0.96]
                  tracking-[-0.035em]
                  sm:text-[52px]
                "
              >
                More than a skincare company.
              </h2>

              <p
                className="
                  mt-5
                  max-w-[760px]
                  text-[14px]
                  font-light
                  leading-[1.75]
                  text-[#6B6B6B]
                "
              >
                amtopm believes in helping people tackle skin problems and build healthier skin through consistent care, scientifically recognized ingredients, and honest guidance.
              </p>

              <p
                className="
                  mt-4
                  max-w-[760px]
                  text-[14px]
                  font-light
                  leading-[1.75]
                  text-[#6B6B6B]
                "
              >
                Every formulation is created with purpose. Every ingredient is selected for a reason. We are a science-backed skin-solution brand, not simply another daily routine.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          WHY WE EXIST
      ====================================================== */}

      <section className="bg-[#F7F2EB] px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

            <div>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                WHY WE EXIST
              </p>

              <h2
                className="
                  mt-4
                  font-sans
                  text-[44px]
                  font-bold
                  leading-[0.92]
                  tracking-[-0.045em]
                  sm:text-[64px]
                "
              >
                Skin problems are real.
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Confusion shouldn&apos;t be.
                </span>
              </h2>

            </div>

            <div className="border-l border-[#E8DFD3] pl-5 sm:pl-8">

              <p className="max-w-[620px] text-[14px] font-light leading-[1.8] text-[#6B6B6B]">
                Millions of people live with acne, pigmentation, sun damage, sensitivity, and damaged skin barriers.
              </p>

              <p className="mt-5 max-w-[620px] text-[14px] font-light leading-[1.8] text-[#6B6B6B]">
                Many are overwhelmed by conflicting advice, viral trends, and unrealistic promises.
              </p>

              <p className="mt-5 max-w-[620px] font-fahkwang text-[21px] leading-[1.35] text-[#1A1A1A] sm:text-[25px]">
                They deserve skincare that is understandable, evidence-informed, and made with care.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
    OUR PURPOSE
===================================================== */}

<section className="bg-[#F7F2EB] px-5 py-9 sm:px-8 sm:py-14">
  <div className="mx-auto max-w-7xl">

    <div className="overflow-hidden rounded-[28px] bg-[#E85D2C] text-white">

      <div className="grid gap-8 p-6 sm:grid-cols-[1fr_0.75fr] sm:gap-12 sm:p-10 lg:p-14">

        {/* LEFT */}
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/65 sm:text-[10px]">
            OUR PURPOSE
          </p>

          <h2 className="mt-4 max-w-[720px] font-serif text-[42px] leading-[0.9] tracking-[-0.05em] sm:text-[58px] lg:text-[68px]">
            Making skincare
            <br />
            <span className="font-fahkwang font-normal italic text-[#FCE6D9]">
              easier to understand.
            </span>
          </h2>
        </div>

        {/* RIGHT */}
        <div className="flex items-end">
          <div className="w-full border-l border-white/20 pl-5 sm:pl-7">
            <p className="max-w-[420px] text-[11px] leading-[1.7] text-white/80 sm:text-[12px]">
              We believe skincare should be easier to understand,
              easier to follow, and built around what your skin
              actually needs.
            </p>

            <p className="mt-4 max-w-[420px] text-[11px] leading-[1.7] text-white/80 sm:text-[12px]">
              Our purpose is to bring clarity to skincare through
              purposeful formulations, honest information, and
              simple routines.
            </p>
          </div>
        </div>

      </div>

      {/* BOTTOM LINE */}
      <div className="border-t border-white/15 px-6 py-4 sm:px-10 sm:py-5 lg:px-14">
        <div className="flex items-center justify-between gap-4">
          <span className="font-fahkwang text-[18px] italic text-[#FCE6D9] sm:text-[21px]">
            Science. Clarity. Care.
          </span>

          <span className="text-[8px] uppercase tracking-[0.2em] text-white/50 sm:text-[9px]">
            AM · PM · EVERY DAY
          </span>
        </div>
      </div>

    </div>

  </div>
</section>

      {/* ======================================================
          VISION + MISSION
      ====================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-px overflow-hidden rounded-[24px] border border-[#E8DFD3] bg-[#E8DFD3] lg:grid-cols-2">

            {/* VISION */}

            <div className="bg-[#FBF8F3] p-7 sm:p-10 lg:p-12">

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                OUR VISION
              </p>

              <h2 className="mt-4 font-fahkwang text-[31px] leading-[1.05] sm:text-[40px]">
                To become one of India&apos;s most trusted dermatologist-inspired skincare brands.
              </h2>

              <p className="mt-5 text-[14px] font-light leading-[1.75] text-[#6B6B6B]">
                A brand recognised for scientific formulations, transparent communication, and consistent product quality.
              </p>

            </div>


            {/* MISSION */}

            <div className="bg-[#1A1A1A] p-7 text-white sm:p-10 lg:p-12">

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                OUR MISSION
              </p>

              <h2 className="mt-4 font-fahkwang text-[31px] leading-[1.05] sm:text-[40px]">
                Build better skin through thoughtful formulation and honest education.
              </h2>

              <p className="mt-5 text-[14px] font-light leading-[1.75] text-white/60">
                We develop skincare using scientifically recognised ingredients, educate consumers through honest communication, and support long-term skin health with solutions that fit everyday life.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          WHAT WE BELIEVE
      ====================================================== */}

      <section className="bg-[#F7F2EB] px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">

            <div>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                WHAT WE BELIEVE
              </p>

              <h2 className="mt-4 font-sans text-[42px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[58px]">
                Simple principles.
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Serious intent.
                </span>
              </h2>

            </div>

            <div className="grid gap-px overflow-hidden rounded-[22px] border border-[#E8DFD3] bg-[#E8DFD3] sm:grid-cols-2">

              {beliefs.map((belief, index) => (
                <div
                  key={belief}
                  className="bg-[#FBF8F3] p-6 sm:p-7"
                >

                  <span className="text-[10px] font-medium tracking-[0.15em] text-[#E85D2C]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <p className="mt-4 font-fahkwang text-[21px] leading-[1.25] text-[#1A1A1A]">
                    {belief}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          CORE VALUES
      ====================================================== */}

      <section className="bg-white px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
              OUR CORE VALUES
            </p>

            <h2 className="mt-4 font-sans text-[42px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[58px]">
              How we show up.
            </h2>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            {values.map((value, index) => (
              <div
                key={value.number}
                className={`
                  rounded-[22px]
                  p-6
                  ${
                    index === 0
                      ? 'bg-[#E85D2C] text-white'
                      : 'bg-[#F7F2EB] text-[#1A1A1A]'
                  }
                `}
              >

                <p
                  className={`
                    text-[10px]
                    font-medium
                    tracking-[0.2em]
                    ${
                      index === 0
                        ? 'text-white/65'
                        : 'text-[#E85D2C]'
                    }
                  `}
                >
                  {value.number}
                </p>

                <h3
                  className={`
                    mt-7
                    font-sans
                    text-[21px]
                    font-semibold
                    leading-[1.05]
                    tracking-[-0.02em]
                    ${
                      index === 0
                        ? 'text-white'
                        : 'text-[#1A1A1A]'
                    }
                  `}
                >
                  {value.title}
                </h3>

                <p
                  className={`
                    mt-4
                    text-[13px]
                    font-light
                    leading-[1.55]
                    ${
                      index === 0
                        ? 'text-white/75'
                        : 'text-[#6B6B6B]'
                    }
                  `}
                >
                  {value.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* ======================================================
          BRAND PERSONALITY
      ====================================================== */}

      <section className="bg-[#1A1A1A] px-5 py-12 text-white sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>

              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                HOW WE SPEAK
              </p>

              <h2 className="mt-4 font-sans text-[42px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[58px]">
                Calm.
                <br />
                Knowledgeable.
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Reassuring.
                </span>
              </h2>

            </div>

            <div className="border-l border-white/15 pl-6 sm:pl-10">

              <p className="max-w-[620px] font-fahkwang text-[24px] leading-[1.35] text-white/85 sm:text-[30px]">
                Practical skincare information should feel like a trusted resource, not another sales pitch.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {[
                  'Honest',
                  'Professional',
                  'Practical',
                  'No hype',
                  'No fear',
                  'No confusion',
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/15 px-4 py-3 text-center text-[12px] font-light text-white/70"
                  >
                    {item}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          OUR PROMISE
      ====================================================== */}

      <section className="bg-[#F7F2EB] px-5 py-12 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[28px] bg-[#FBF8F3] p-7 sm:p-12 lg:p-16">

            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

              <div>

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                  OUR PROMISE
                </p>

                <h2 className="mt-4 font-sans text-[42px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[58px]">
                  Earn trust.
                  <br />
                  <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                    Every day.
                  </span>
                </h2>

              </div>

              <div>

                <div className="space-y-3">

                  {promises.map((promise, index) => (
                    <div
                      key={promise}
                      className="flex items-start gap-4 border-b border-[#E8DFD3] pb-4"
                    >

                      <span className="pt-1 text-[10px] font-medium text-[#E85D2C]">
                        0{index + 1}
                      </span>

                      <p className="font-fahkwang text-[20px] leading-[1.25] text-[#1A1A1A]">
                        {promise}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ======================================================
          CLOSING STATEMENT
      ====================================================== */}

      <section className="px-5 pb-12 pt-2 sm:px-8 sm:pb-20">
        <div className="mx-auto max-w-7xl">

          <div className="py-8 text-center sm:py-12">

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6B6B6B]">
              THE AMTOPM DIFFERENCE
            </p>

            <h2
              className="
                mx-auto
                mt-5
                max-w-[900px]
                font-fahkwang
                text-[34px]
                leading-[1.12]
                sm:text-[50px]
              "
            >
              We are not here to sell another product.
              <br />
              <span className="italic text-[#E85D2C]">
                We are here to help people improve their skin.
              </span>
            </h2>

          </div>

        </div>
      </section>



    </main>
  )
}