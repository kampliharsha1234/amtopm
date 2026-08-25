'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    a: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, get in touch with our support team.",
  },
]

export default function SupportPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSubmitted(true)

    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

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
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
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
          CONTACT
      ======================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

          <div>

            <h2 className="font-serif text-[42px] leading-[0.9] tracking-[-0.045em] sm:text-[54px]">
              Need a little
              <br />
              <span className="italic">
                help?
              </span>
            </h2>

            <p className="mt-5 max-w-[320px] text-[10px] leading-[1.7] text-[#6B6B6B]">
              Can't find what you're looking for?
              Send us a message and our team will get back
              to you within 24 hours.
            </p>

          </div>


          <div>

            {submitted ? (

              <div className="border border-[#E8DFD3] bg-[#F7F2EB] p-6 sm:p-8">

                <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                  MESSAGE SENT
                </p>

                <h3 className="mt-4 font-serif text-[32px] leading-none">
                  We've got it.
                </h3>

                <p className="mt-3 max-w-[380px] text-[10px] leading-[1.7] text-[#6B6B6B]">
                  Thanks for reaching out. We'll get back to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[8px] font-medium uppercase tracking-[0.18em] text-[#E85D2C]"
                >
                  Send another message →
                </button>

              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                <SupportInput
                  id="support-name"
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: value,
                    }))
                  }
                />

                <SupportInput
                  id="support-email"
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: value,
                    }))
                  }
                />

                <div>

                  <label
                    htmlFor="support-message"
                    className="mb-2 block text-[8px] font-medium uppercase tracking-[0.18em] text-[#6B6B6B]"
                  >
                    Message
                  </label>

                  <textarea
                    id="support-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    placeholder="How can we help?"
                    className="w-full resize-none border-b border-[#D8D0C6] bg-transparent px-0 py-3 text-[11px] text-[#1A1A1A] placeholder:text-[#9A938B] focus:border-[#E85D2C] focus:outline-none"
                  />

                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex min-h-[44px] items-center justify-center bg-[#E85D2C] px-7 text-[8px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#D14E20]"
                >
                  Send message →
                </button>

              </form>

            )}

          </div>

        </div>

      </section>


      {/* ========================================================
          SUPPORT + TRACK ORDER
      ======================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-5xl">

          <div className="mb-8">

            <h2 className="font-serif text-[40px] leading-none tracking-[-0.045em] sm:text-[52px]">
              Need something else?
            </h2>

          </div>


          <div className="grid gap-px border border-[#E8DFD3] bg-[#E8DFD3] sm:grid-cols-2">

            <div className="bg-[#FBF8F3] p-6 sm:p-8">

              <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#E85D2C]">
                CUSTOMER SUPPORT
              </span>

              <h3 className="mt-5 font-serif text-[27px] leading-none tracking-[-0.035em]">
                Talk to us.
              </h3>

              <p className="mt-3 text-[10px] leading-[1.7] text-[#6B6B6B]">
                Questions about products, routines, orders or anything else?
              </p>

              <a
                href="mailto:support@ampm.com"
                className="mt-6 inline-block text-[9px] font-medium uppercase tracking-[0.15em] text-[#E85D2C]"
              >
                support@ampm.com →
              </a>

            </div>


            <Link
              href="/track-order"
              className="group bg-[#1A1A1A] p-6 text-white transition-colors hover:bg-[#2A2A2A] sm:p-8"
            >

              <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#E85D2C]">
                ORDERS
              </span>

              <h3 className="mt-5 font-serif text-[27px] leading-none tracking-[-0.035em]">
                Track your order.
              </h3>

              <p className="mt-3 max-w-[320px] text-[10px] leading-[1.7] text-white/60">
                Check where your AM:PM order is and keep an eye on its delivery.
              </p>

              <span className="mt-6 block text-[9px] font-medium uppercase tracking-[0.15em] text-white">
                Track order →
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* ========================================================
          NEWSLETTER / WAITLIST
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

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-6 flex flex-col gap-2 sm:flex-row"
              >

                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="min-h-[44px] flex-1 bg-white px-4 text-[10px] text-[#1A1A1A] placeholder:text-[#9A938B] focus:outline-none"
                />

                <button
                  type="submit"
                  className="min-h-[44px] bg-[#1A1A1A] px-6 text-[8px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#2A2A2A]"
                >
                  Join →
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      <Footer />

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
  return (
    <div className="flex items-start gap-4 border-b border-white/15 pb-4 last:border-0 last:pb-0">

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


/* ============================================================
   SUPPORT INPUT
============================================================ */

function SupportInput({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}: {
  id: string
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>

      <label
        htmlFor={id}
        className="mb-2 block text-[8px] font-medium uppercase tracking-[0.18em] text-[#6B6B6B]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-[#D8D0C6] bg-transparent px-0 py-3 text-[11px] text-[#1A1A1A] placeholder:text-[#9A938B] focus:border-[#E85D2C] focus:outline-none"
      />

    </div>
  )
}