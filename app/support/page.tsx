'use client'

import { FormEvent, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type FAQ = {
category: string
q: string
a: string
}

const faqs: FAQ[] = [
{
category: 'PRODUCTS',
q: 'How do I know which products are right for me?',
a: 'Take our Skin Quiz for personalised recommendations, or browse the Shop by concern to find products based on what your skin needs.',
},
{
category: 'PRODUCTS',
q: 'Are your products cruelty-free?',
a: 'Yes. We never test on animals and are committed to responsible formulation.',
},
{
category: 'INGREDIENTS',
q: 'What ingredients do you use?',
a: 'Every ingredient has a purpose. Visit our Ingredients Science page for a clear breakdown of the ingredients we use and why.',
},
{
category: 'SHIPPING',
q: 'How long does shipping take?',
a: 'Orders are shipped within 24–48 hours. Delivery typically takes 3–5 business days.',
},
{
category: 'RETURNS',
q: 'What is your return policy?',
a: "For details regarding returns, refunds and cancellations, please refer to our Returns & Refunds Policy.",
},
]

export default function SupportPage() {
const [openFAQ, setOpenFAQ] = useState<number | null>(null)

const [newsletterEmail, setNewsletterEmail] = useState('')
const [newsletterStatus, setNewsletterStatus] = useState('idle')
const [newsletterError, setNewsletterError] = useState('')

const handleNewsletterSubmit = async (
e: FormEvent<HTMLFormElement>
) => {
e.preventDefault()


if (!newsletterEmail.trim()) {
  return
}

setNewsletterStatus('submitting')
setNewsletterError('')

try {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: newsletterEmail.trim(),
    }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.error || 'Something went wrong. Please try again.'
    )
  }

  setNewsletterStatus('success')
  setNewsletterEmail('')
} catch (error) {
  setNewsletterStatus('error')

  setNewsletterError(
    error instanceof Error
      ? error.message
      : 'Something went wrong. Please try again.'
  )
}


}

return ( <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">


  {/* ========================================================
      GLOBAL NAVBAR
  ======================================================== */}

  <Navbar />

  {/* ========================================================
      HERO
  ======================================================== */}

  <section className="px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28">
    <div className="mx-auto max-w-7xl">

      <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#E85D2C]">
        SUPPORT · AM:PM
      </p>

      <h1 className="mt-3 max-w-[750px] font-serif text-[52px] leading-[0.84] tracking-[-0.06em] sm:text-[76px] lg:text-[88px]">
        We've got
        <br />
        <span className="italic text-[#E85D2C]">
          you covered.
        </span>
      </h1>

    </div>
  </section>

  {/* ========================================================
      FAQ
  ======================================================== */}

  <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-12 sm:px-8 sm:py-16">

    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h2 className="font-serif text-[40px] leading-none tracking-[-0.045em] sm:text-[52px]">
          Common questions.
        </h2>

      </div>

      <div className="border-t border-[#E8DFD3]">

        {faqs.map((faq, index) => {

          const isOpen = openFAQ === index

          return (
            <div
              key={faq.q}
              className="border-b border-[#E8DFD3]"
            >

              <button
                type="button"
                onClick={() =>
                  setOpenFAQ(isOpen ? null : index)
                }
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-5 py-5 text-left sm:py-6"
              >

                <div className="flex min-w-0 items-start gap-4">

                  <div>

                    <span className="block text-[7px] font-medium uppercase tracking-[0.18em] text-[#8A837B]">
                      {faq.category}
                    </span>

                    <h3 className="mt-2 font-serif text-[19px] leading-[1.05] tracking-[-0.025em] sm:text-[22px]">
                      {faq.q}
                    </h3>

                  </div>

                </div>

                <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#E8DFD3] text-[15px] font-light text-[#E85D2C]">
                  {isOpen ? '−' : '+'}
                </span>

              </button>

              {isOpen && (
                <div className="pb-5 pr-10 sm:pb-6">

                  <p className="max-w-[620px] text-[10px] leading-[1.75] text-[#6B6B6B] sm:text-[11px]">
                    {faq.a}
                  </p>

                </div>
              )}

            </div>
          )
        })}

      </div>

    </div>

  </section>

  {/* ========================================================
      HOW TO USE
  ======================================================== */}

  <section className="px-5 py-12 sm:px-8 sm:py-16">

    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h2 className="font-serif text-[40px] leading-none tracking-[-0.045em] sm:text-[52px]">
          Your AM + PM,
          <br />
          simplified.
        </h2>

      </div>

      <div className="grid gap-px border border-[#E8DFD3] bg-[#E8DFD3] sm:grid-cols-2">

        {/* AM */}

        <div className="bg-[#E85D2C] p-6 text-white sm:p-8">

          <div className="flex items-start justify-between">

            <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-white/70">
              MORNING
            </span>

            <span className="font-serif text-[34px] leading-none text-white/30">
              AM
            </span>

          </div>

          <div className="mt-9 space-y-5">

            <RoutineStep
              number="01"
              title="Cleanse"
              description="Start with clean skin."
            />

            <RoutineStep
              number="02"
              title="Treat"
              description="Apply your targeted serum or treatment."
            />

            <RoutineStep
              number="03"
              title="Moisturise"
              description="Lock in hydration."
            />

            <RoutineStep
              number="04"
              title="Protect"
              description="Finish with SPF before heading outside."
            />

          </div>

        </div>

        {/* PM */}

        <div className="bg-[#1A1A1A] p-6 text-white sm:p-8">

          <div className="flex items-start justify-between">

            <span className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
              EVENING
            </span>

            <span className="font-serif text-[34px] leading-none text-white/20">
              PM
            </span>

          </div>

          <div className="mt-9 space-y-5">

            <RoutineStep
              number="01"
              title="Cleanse"
              description="Remove the day and start fresh."
            />

            <RoutineStep
              number="02"
              title="Treat"
              description="Apply your evening treatment."
            />

            <RoutineStep
              number="03"
              title="Repair"
              description="Use your barrier-supporting serum."
            />

            <RoutineStep
              number="04"
              title="Moisturise"
              description="Finish with your night moisturiser."
            />

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* ========================================================
      NEED SOMETHING ELSE
  ======================================================== */}

  <section className="px-5 py-12 sm:px-8 sm:py-16">

    <div className="mx-auto max-w-5xl">

      <div className="mb-8">

        <h2 className="font-serif text-[40px] leading-none tracking-[-0.045em] sm:text-[52px]">
          Need something else?
        </h2>

      </div>

      <div className="border border-[#E8DFD3]">

        <div className="bg-[#FBF8F3] p-6 sm:p-8">

          <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#E85D2C]">
            CUSTOMER SUPPORT
          </span>

          <h3 className="mt-5 font-serif text-[27px] leading-none tracking-[-0.035em]">
            Talk to us.
          </h3>

          <p className="mt-3 max-w-[520px] text-[10px] leading-[1.7] text-[#6B6B6B]">
            Questions about products, routines, orders or anything else?
          </p>

          <a
            href="mailto:amtopmformulation@gmail.com"
            className="mt-6 inline-block break-all text-[9px] font-medium uppercase tracking-[0.15em] text-[#E85D2C]"
          >
            amtopmformulation@gmail.com →
          </a>

        </div>

      </div>

    </div>

  </section>

  {/* ========================================================
      GOOD SKIN ADVICE / NEWSLETTER
  ======================================================== */}

  <section className="px-5 pb-14 pt-2 sm:px-8 sm:pb-20">

    <div className="mx-auto max-w-5xl bg-[#E85D2C] px-6 py-12 text-white sm:px-10 sm:py-16">

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

        <div>

          <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-white/70">
            STAY IN THE LOOP
          </p>

          <h2 className="mt-3 font-serif text-[42px] leading-[0.9] tracking-[-0.045em] sm:text-[56px]">
            Good skin advice.
            <br />
            <span className="italic">
              No noise.
            </span>
          </h2>

        </div>

        <div>

          <p className="max-w-[390px] text-[10px] leading-[1.7] text-white/80 sm:text-[11px]">
            Join the AM:PM list for skincare tips,
            product updates, and early access.
          </p>

          {newsletterStatus === 'success' ? (

            <div className="mt-6 border border-white/30 bg-white/10 p-5">

              <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/70">
                YOU'RE ON THE LIST
              </p>

              <p className="mt-2 font-serif text-[22px] leading-none">
                Thanks for joining.
              </p>

              <button
                type="button"
                onClick={() => {
                  setNewsletterStatus('idle')
                  setNewsletterError('')
                }}
                className="mt-4 text-[8px] font-medium uppercase tracking-[0.16em] text-white underline underline-offset-4"
              >
                Add another email →
              </button>

            </div>

          ) : (

            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-6 flex flex-col gap-2 sm:flex-row"
            >

              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => {
                  setNewsletterEmail(e.target.value)

                  if (newsletterStatus === 'error') {
                    setNewsletterStatus('idle')
                    setNewsletterError('')
                  }
                }}
                placeholder="your@email.com"
                aria-label="Email address"
                className="min-h-[44px] flex-1 bg-white px-4 text-[10px] text-[#1A1A1A] placeholder:text-[#9A938B] focus:outline-none"
              />

              <button
                type="submit"
                disabled={newsletterStatus === 'submitting'}
                className="min-h-[44px] bg-[#1A1A1A] px-6 text-[8px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#2A2A2A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {newsletterStatus === 'submitting'
                  ? 'Joining...'
                  : 'Join →'}
              </button>

            </form>

          )}

          {newsletterStatus === 'error' && (
            <p
              role="alert"
              className="mt-3 text-[9px] leading-[1.6] text-white"
            >
              {newsletterError}
            </p>
          )}

        </div>

      </div>

    </div>

  </section>

  

</main>


)
}

/* ============================================================
ROUTINE STEP
============================================================ */

function RoutineStep({
number,
title,
description,
}: {
number: string
title: string
description: string
}) {
return ( <div className="flex items-start gap-4 border-b border-white/15 pb-4 last:border-0 last:pb-0">


  <span className="pt-0.5 text-[8px] font-medium tracking-[0.15em] text-white/50">
    {number}
  </span>

  <div>

    <h3 className="font-serif text-[20px] leading-none tracking-[-0.025em]">
      {title}
    </h3>

    <p className="mt-1.5 text-[9px] leading-[1.6] text-white/60">
      {description}
    </p>

  </div>

</div>


)
}

