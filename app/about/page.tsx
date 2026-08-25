import { Metadata } from 'next'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'About AM:PM | Science-First Skincare',
  description:
    'Dermatologist-inspired, science-first skincare that makes sense. No hype, just honest skincare for your AM and PM routine.',
}

const beliefs = [
  {
    title: 'Honesty',
    description: 'No hype. No exaggerated claims.',
  },
  {
    title: 'Education',
    description: 'Understand your skin and what it needs.',
  },
  {
    title: 'Consistency',
    description: 'Simple routines you can actually follow.',
  },
  {
    title: 'Trust',
    description: 'Responsible formulation and honest communication.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* =====================================================
          HERO / WHO WE ARE
      ===================================================== */}

      <section className="px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-7xl">

          <p className="text-[8px] font-medium uppercase tracking-[0.28em] text-[#E85D2C]">
            ABOUT · AM:PM
          </p>

          <h1 className="mt-3 max-w-[760px] font-serif text-[48px] leading-[0.88] tracking-[-0.055em] sm:text-[70px] lg:text-[82px]">
            Skincare that
            <br />
            <span className="italic text-[#E85D2C]">
              makes sense.
            </span>
          </h1>

        </div>
      </section>


      {/* =====================================================
          WHO WE ARE
      ===================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">

          <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:gap-10">

            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
              WHO WE ARE
            </p>

            <div>

              <h2 className="font-serif text-[32px] leading-[0.95] tracking-[-0.04em] sm:text-[44px]">
                Dermatologist-inspired.
                <br />
                <span className="italic">
                  Science-first skincare.
                </span>
              </h2>

              <p className="mt-3 max-w-[570px] text-[10px] leading-[1.7] text-[#6B6B6B] sm:text-[11px]">
                Purposeful ingredients, clear routines, and products
                designed around what your skin actually needs.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHY WE EXIST
      ===================================================== */}

      <section className="px-5 py-9 sm:px-8 sm:py-11">
        <div className="mx-auto max-w-5xl">

          <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr] sm:items-center sm:gap-10">

            <div>

              <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                WHY WE EXIST
              </p>

              <h2 className="mt-2 font-serif text-[38px] leading-[0.9] tracking-[-0.045em] sm:text-[52px]">
                To make skincare
                <br />
                <span className="italic text-[#E85D2C]">
                  make sense.
                </span>
              </h2>

            </div>

            <div className="border-l border-[#E8DFD3] pl-5 sm:pl-7">

              <p className="text-[10px] leading-[1.75] text-[#6B6B6B] sm:text-[11px]">
                No hype. No confusing marketing.
                No unnecessary complexity.
              </p>

              <p className="mt-2 text-[10px] leading-[1.75] text-[#6B6B6B] sm:text-[11px]">
                Just honest, effective skincare built around
                simple AM and PM routines.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          WHAT WE BELIEVE
      ===================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">

          <div className="mb-5">

            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
              WHAT WE BELIEVE
            </p>

            <h2 className="mt-2 font-serif text-[34px] leading-none tracking-[-0.04em] sm:text-[46px]">
              Four simple principles.
            </h2>

          </div>


          <div className="grid grid-cols-2 gap-px border border-[#E8DFD3] bg-[#E8DFD3]">

            {beliefs.map((belief) => (
              <div
                key={belief.title}
                className="bg-[#FBF8F3] p-4 sm:p-6"
              >

                <h3 className="font-serif text-[23px] leading-none tracking-[-0.03em] sm:text-[28px]">
                  {belief.title}
                </h3>

                <p className="mt-2 max-w-[220px] text-[9px] leading-[1.6] text-[#6B6B6B] sm:text-[10px]">
                  {belief.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          OUR PROMISE
      ===================================================== */}

      <section className="px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-5xl">

          <div className="bg-[#1A1A1A] px-5 py-7 text-white sm:px-8 sm:py-9">

            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
              OUR PROMISE
            </p>

            <div className="mt-4 grid gap-5 sm:grid-cols-[1.1fr_0.9fr] sm:items-end">

              <h2 className="font-serif text-[36px] leading-[0.9] tracking-[-0.045em] sm:text-[50px]">
                Formulate responsibly.
                <br />
                <span className="italic text-[#E85D2C]">
                  Communicate honestly.
                </span>
              </h2>

              <p className="text-[9px] leading-[1.7] text-white/55 sm:text-[10px]">
                Every ingredient has a purpose.
                Every product has a job.
                And every claim should be communicated honestly.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

    </main>
  )
}