'use client'

import { FormEvent, useState } from 'react'

const problems = [
'Acne & Breakouts',
'Dark Spots & Pigmentation',
'Uneven Skin Tone',
'Dryness',
'Excess Oil',
'Sensitive Skin',
'Skin Texture',
'Fine Lines & Ageing',
'Sun Damage',
'Other',
]

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ConsultationPage() {
const [status, setStatus] = useState<FormStatus>('idle')
const [errorMessage, setErrorMessage] = useState('')

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
event.preventDefault()


const form = event.currentTarget

setStatus('loading')
setErrorMessage('')

const formData = new FormData(form)

const payload = {
  name: String(formData.get('name') ?? '').trim(),
  phone: String(formData.get('phone') ?? '').trim(),
  email: String(formData.get('email') ?? '').trim(),
  age: String(formData.get('age') ?? '').trim(),
  gender: String(formData.get('gender') ?? '').trim(),
  problem: String(formData.get('problem') ?? '').trim(),
  description: String(formData.get('description') ?? '').trim(),
}

try {
  const response = await fetch('/api/consultation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const responseText = await response.text()

  let result: {
    success?: boolean
    message?: string
    error?: string
  } = {}

  if (responseText) {
    try {
      result = JSON.parse(responseText)
    } catch {
      throw new Error(
        `Server returned an invalid response (${response.status}).`
      )
    }
  }

  if (!response.ok) {
    throw new Error(
      result.error ||
        `Unable to submit consultation request (${response.status}).`
    )
  }

  setStatus('success')
  form.reset()

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
} catch (error) {
  console.error('Consultation submission error:', error)

  setStatus('error')

  setErrorMessage(
    error instanceof Error
      ? error.message
      : 'Unable to submit your consultation request. Please try again.'
  )
}


}

const submitAnotherRequest = () => {
setStatus('idle')
setErrorMessage('')


window.scrollTo({
  top: 0,
  behavior: 'smooth',
})


}

if (status === 'success') {
return ( <main className="min-h-screen bg-[#F5F1E9]"> <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-24 sm:px-8 lg:px-12"> <div className="mx-auto w-full max-w-[900px] text-center"> <p className="font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#E85D2C]">
REQUEST RECEIVED </p>


        <h1 className="mt-6 font-sans text-[44px] font-semibold leading-[0.95] tracking-[-0.045em] text-[#171717] sm:text-[60px] lg:text-[72px]">
          We&apos;ll get back to you.
        </h1>

        <p className="mx-auto mt-7 max-w-[460px] font-sans text-[14px] font-extralight leading-[1.7] text-[#6B6B6B]">
          Thank you for reaching out to AM:PM. Your consultation request
          has been received successfully.
        </p>

        <div className="mx-auto mt-9 h-px w-12 bg-[#E85D2C]" />

        <button
          type="button"
          onClick={submitAnotherRequest}
          className="btn-primary mt-9"
        >
          Submit Another Request
        </button>
      </div>
    </section>
  </main>
)


}

return ( <main className="min-h-screen bg-[#F5F1E9]"> <section className="px-5 pb-10 pt-32 sm:px-8 sm:pb-12 sm:pt-40 lg:px-12 lg:pt-44"> <div className="mx-auto max-w-[1400px]"> <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"> <div> <p className="meta-text text-[#E85D2C]">
SKIN CONSULTATION </p>


          <h1 className="mt-4 max-w-[850px] font-sans text-[42px] font-semibold leading-[0.95] tracking-[-0.045em] text-[#171717] sm:text-[58px] lg:text-[72px]">
            Let&apos;s understand
            <br />
            your skin.
          </h1>
        </div>

        <p className="max-w-[310px] font-[var(--font-fahkwang)] text-[21px] font-normal leading-[1.2] tracking-[-0.01em] text-[#3D3D3D] sm:text-[24px] lg:mb-2">
          A few details. A more personal approach.
        </p>
      </div>
    </div>
  </section>

  <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
    <div className="mx-auto max-w-[1400px]">
      <div className="grid overflow-hidden rounded-[28px] border border-[#E8DFD3] bg-[#FBF8F3] lg:grid-cols-[0.72fr_1.28fr]">
        <div className="relative hidden overflow-hidden bg-[#E85D2C] p-8 lg:flex lg:min-h-[720px] lg:flex-col lg:justify-between lg:p-12">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
              AM · PM
            </p>

            <h2 className="mt-8 max-w-[430px] font-sans text-[50px] font-semibold leading-[0.95] tracking-[-0.04em] text-white">
              Your skin
              <br />
              deserves
              <br />
              attention.
            </h2>
          </div>

          <div>
            <div className="mb-5 h-px w-12 bg-white/70" />

            <p className="max-w-[270px] font-sans text-[13px] font-extralight leading-[1.7] text-white/80">
              Share what you&apos;re experiencing and our team will get
              back to you with the next step.
            </p>
          </div>

          <div className="pointer-events-none absolute -bottom-28 -right-28 h-[330px] w-[330px] rounded-full border border-white/15" />

          <div className="pointer-events-none absolute -bottom-14 -right-14 h-[190px] w-[190px] rounded-full border border-white/10" />
        </div>

        <div className="p-6 sm:p-9 lg:p-14">
          <div className="mb-9 flex items-end justify-between gap-5">
            <div>
              <p className="font-sans text-[20px] font-semibold tracking-[-0.02em] text-[#171717]">
                Tell us about you
              </p>

              <p className="mt-1 font-sans text-[12px] font-extralight text-[#8A8A8A]">
                * Required fields
              </p>
            </div>

            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-[#8A8A8A] sm:block">
              CONSULTATION
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label
                htmlFor="name"
                className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
              >
                Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
                className="mt-2 h-12 w-full border-b border-[#D8D0C6] bg-transparent px-0 font-sans text-[14px] font-extralight text-[#171717] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#E85D2C]"
              />
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
                >
                  Phone No. *
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91"
                  className="mt-2 h-12 w-full border-b border-[#D8D0C6] bg-transparent px-0 font-sans text-[14px] font-extralight text-[#171717] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#E85D2C]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
                >
                  Email *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  className="mt-2 h-12 w-full border-b border-[#D8D0C6] bg-transparent px-0 font-sans text-[14px] font-extralight text-[#171717] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#E85D2C]"
                />
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="age"
                  className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
                >
                  Age *
                </label>

                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  min="13"
                  max="100"
                  placeholder="Your age"
                  className="mt-2 h-12 w-full border-b border-[#D8D0C6] bg-transparent px-0 font-sans text-[14px] font-extralight text-[#171717] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#E85D2C]"
                />
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
                >
                  Gender *
                </label>

                <select
                  id="gender"
                  name="gender"
                  required
                  defaultValue=""
                  className="mt-2 h-12 w-full border-b border-[#D8D0C6] bg-transparent px-0 font-sans text-[14px] font-extralight text-[#171717] outline-none transition-colors focus:border-[#E85D2C]"
                >
                  <option value="" disabled>
                    Select gender
                  </option>

                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">
                    Prefer not to say
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="problem"
                className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
              >
                Select Your Problem *
              </label>

              <select
                id="problem"
                name="problem"
                required
                defaultValue=""
                className="mt-2 h-12 w-full border-b border-[#D8D0C6] bg-transparent px-0 font-sans text-[14px] font-extralight text-[#171717] outline-none transition-colors focus:border-[#E85D2C]"
              >
                <option value="" disabled>
                  Select your concern
                </option>

                {problems.map((problem) => (
                  <option key={problem} value={problem}>
                    {problem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block font-sans text-[20px] font-semibold tracking-[-0.025em] text-[#171717]"
              >
                Describe in Few Words *
              </label>

              <textarea
                id="description"
                name="description"
                required
                rows={5}
                maxLength={1000}
                placeholder="Tell us about your concern..."
                className="mt-3 w-full resize-none rounded-xl border border-[#D8D0C6] bg-transparent p-4 font-sans text-[14px] font-extralight leading-[1.7] text-[#171717] outline-none transition-colors placeholder:text-[#A7A7A7] focus:border-[#E85D2C]"
              />
            </div>

            {status === 'error' && (
              <div className="rounded-xl border border-[#E8B8A5] bg-[#FCE6D9] px-4 py-3">
                <p className="font-sans text-[11px] font-extralight leading-[1.5] text-[#8A321C]">
                  {errorMessage}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary min-h-[52px] w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {status === 'loading'
                  ? 'Sending...'
                  : 'Request Consultation →'}
              </button>
            </div>

            <p className="pt-1 font-sans text-[10px] font-extralight leading-[1.5] text-[#8A8A8A]">
              We&apos;ll only use these details to respond to your
              consultation request.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</main>


)
}
