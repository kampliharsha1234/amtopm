'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
const [email, setEmail] = useState('')
const [subscribed, setSubscribed] = useState(false)
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()


if (!email.trim()) return

setLoading(true)
setError('')

try {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim(),
    }),
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
        `Unable to subscribe to the newsletter (${response.status}).`
    )
  }

  setSubscribed(true)
  setEmail('')
} catch (error) {
  console.error('Newsletter subscription error:', error)

  setError(
    error instanceof Error
      ? error.message
      : 'Unable to subscribe right now. Please try again.'
  )
} finally {
  setLoading(false)
}


}

return ( <footer className="bg-[#1A1A1A] text-[#FBF8F3]"> <div
     className="
       mx-auto
       max-w-7xl
       px-5
       pt-12
       sm:px-8
       sm:pt-16
     "
   > <div
       className="
         grid
         grid-cols-2
         gap-x-8
         gap-y-10
         sm:grid-cols-4
       "
     > <div className="col-span-2 sm:col-span-1"> <Link
           href="/"
           className="
             inline-flex
             items-center
             transition-opacity
             hover:opacity-80
           "
         > <img
             src="/images/logo.png"
             alt="amtopm"
             className="
               block
               h-auto
               w-[82px]
               object-contain
               sm:w-[92px]
             "
           /> </Link>


        <p
          className="
            mt-3
            max-w-[220px]
            text-[10px]
            leading-[1.65]
            text-[#A7A7A7]
          "
        >
          Skincare for morning &amp; night.
          <br />
          Made with patience.
        </p>

        <div
          className="
            mt-7
            h-px
            w-12
            bg-[#E85D2C]
          "
        />
      </div>

      <div>
        <h4
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#6B6B6B]
          "
        >
          Shop
        </h4>

        <ul
          className="
            mt-4
            space-y-2.5
            text-[11px]
            text-[#D6D0C9]
          "
        >
          <li>
            <Link
              href="/shop"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              All Products
            </Link>
          </li>

          <li>
            <Link
              href="/shop?concern=Acne"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Acne
            </Link>
          </li>

          <li>
            <Link
              href="/shop?concern=Dark%20Spots"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Dark Spots
            </Link>
          </li>

          <li>
            <Link
              href="/shop?concern=SPF"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              SPF
            </Link>
          </li>

          <li>
            <Link
              href="/shop?concern=Barrier"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Barrier
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#6B6B6B]
          "
        >
          Learn
        </h4>

        <ul
          className="
            mt-4
            space-y-2.5
            text-[11px]
            text-[#D6D0C9]
          "
        >
          <li>
            <Link
              href="/science"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              The Science
            </Link>
          </li>

          <li>
            <Link
              href="/consultation"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Free Consultation
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Our Story
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4
          className="
            text-[8px]
            font-medium
            uppercase
            tracking-[0.3em]
            text-[#6B6B6B]
          "
        >
          Support
        </h4>

        <ul
          className="
            mt-4
            space-y-2.5
            text-[11px]
            text-[#D6D0C9]
          "
        >
          
          
          <li>
            <Link
              href="/support"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Contact
            </Link>
          </li>

          <li>
            <Link
              href="/terms"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Terms & Conditions
            </Link>
          </li>

          <li>
            <Link
              href="/returns"
              className="
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              Returns & Refunds
            </Link>
          </li>

        </ul>
      </div>
    </div>

    <div
      className="
        mt-12
        border-t
        border-[#3D3D3D]
        py-10
        sm:mt-16
        sm:py-14
      "
    >
      <div
        className="
          grid
          gap-8
          sm:grid-cols-[0.9fr_1.1fr]
          sm:items-center
          sm:gap-14
        "
      >
        <div>
          <p
            className="
              text-[8px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#E85D2C]
            "
          >
            STAY IN THE LOOP
          </p>

          <h2
            className="
              mt-2
              font-serif
              text-[38px]
              leading-[0.9]
              tracking-[-0.045em]
              text-[#FBF8F3]
              sm:text-[50px]
            "
          >
            Learn your skin.
          </h2>

          <p
            className="
              mt-3
              max-w-[390px]
              font-serif
              text-[18px]
              leading-[1.25]
              text-[#A7A7A7]
              sm:text-[21px]
            "
          >
            Short, honest emails. No hype.
          </p>
        </div>

        <div>
          {subscribed ? (
            <div
              className="
                border
                border-[#3D3D3D]
                bg-[#242424]
                px-5
                py-6
                sm:px-6
                sm:py-7
              "
            >
              <p
                className="
                  font-serif
                  text-[23px]
                  leading-none
                  text-[#FBF8F3]
                "
              >
                You&apos;re on the list.
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  leading-relaxed
                  text-[#A7A7A7]
                "
              >
                We&apos;ll keep the emails useful. Promise.
              </p>

              <div
                className="
                  mt-5
                  h-px
                  w-10
                  bg-[#E85D2C]
                "
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="footer-newsletter-email"
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-[#6B6B6B]
                "
              >
                Email *
              </label>

              <div
                className="
                  mt-2
                  flex
                  h-[52px]
                  border
                  border-[#555555]
                  bg-[#242424]
                  transition-colors
                  focus-within:border-[#E85D2C]
                "
              >
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                  className="
                    min-w-0
                    flex-1
                    bg-transparent
                    px-4
                    text-[11px]
                    text-[#FBF8F3]
                    outline-none
                    placeholder:text-[#B8B2AA]
                    disabled:opacity-60
                  "
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    shrink-0
                    bg-[#E85D2C]
                    px-5
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-white
                    transition-colors
                    hover:bg-[#D14E20]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    sm:px-7
                  "
                >
                  {loading ? 'Sending...' : 'Join →'}
                </button>
              </div>

              <label
                className="
                  mt-3
                  flex
                  items-start
                  gap-2.5
                "
              >
                <input
                  type="checkbox"
                  required
                  className="
                    mt-[2px]
                    h-3.5
                    w-3.5
                    accent-[#E85D2C]
                  "
                />

                <span
                  className="
                    text-[9px]
                    leading-[1.4]
                    text-[#6B6B6B]
                  "
                >
                  Yes, subscribe me to your newsletter. *
                </span>
              </label>

              {error && (
                <p className="mt-3 text-[9px] leading-[1.4] text-[#E85D2C]">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>

    <div
      className="
        flex
        flex-col
        gap-2
        border-t
        border-[#3D3D3D]
        py-5
        text-[8px]
        uppercase
        tracking-[0.18em]
        text-[#6B6B6B]
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <span>
        © 2026 amtopm Skincare
      </span>

      <span>
        Dermatologist-inspired · Science-first
      </span>
    </div>
  </div>
</footer>


)
}
