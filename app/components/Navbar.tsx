'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const { totalItems } = useCart()
  const { data: session } = useSession()

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
          className="
            fixed
            inset-0
            z-[50]
            h-full
            w-full
            cursor-default
            bg-[#1A1A1A]/10
            backdrop-blur-[5px]
          "
        />
      )}

      {/* =====================================================
          UNIFIED NAVBAR + MENU
      ===================================================== */}

      <div
        className={`
          fixed
          left-1/2
          top-[18px]
          z-[60]
          -translate-x-1/2

          w-[calc(100%-56px)]

          sm:top-[24px]
          sm:w-[calc(100%-48px)]
          sm:max-w-[1400px]

          rounded-[24px]
          border
          border-[#E8DFD3]
          bg-[#FBF8F3]
          shadow-[0_20px_60px_rgba(26,26,26,0.14),0_6px_20px_rgba(26,26,26,0.06)]

          overflow-hidden
        `}
      >

        {/* =================================================
            TOP NAVBAR BAR
        ================================================= */}

        <div
          className="
            flex
            h-[52px]
            items-center
            justify-between
            px-4
            sm:h-[58px]
            sm:px-5
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            href="/"
            aria-label="am:pm Home"
            onClick={() => setIsOpen(false)}
            className="
              flex
              shrink-0
              items-center
              transition-opacity
              hover:opacity-80
            "
          >
            <Image
              src="/images/logo.png"
              alt="am:pm"
              width={88}
              height={28}
              priority
              className="
                h-auto
                w-[62px]
                object-contain
                sm:w-[68px]
              "
            />
          </Link>


          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="flex items-center">

            {/* CART */}

            <Link
              href="/cart"
              aria-label="Cart"
              onClick={() => setIsOpen(false)}
              className="
                relative
                flex
                h-[34px]
                w-[34px]
                items-center
                justify-center
                text-[#1A1A1A]
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              <BagIcon />

              {totalItems > 0 && (
                <span
                  className="
                    absolute
                    right-0
                    top-[2px]
                    flex
                    h-[16px]
                    w-[16px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#E85D2C]
                    text-[8px]
                    leading-none
                    text-white
                  "
                >
                  {totalItems}
                </span>
              )}
            </Link>


            {/* MENU TOGGLE */}

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="
                flex
                h-[34px]
                w-[34px]
                items-center
                justify-center
                text-[#1A1A1A]
                transition-colors
                hover:text-[#E85D2C]
              "
            >
              {isOpen ? (
                <CloseIcon />
              ) : (
                <MenuIcon />
              )}
            </button>

          </div>

        </div>


        {/* =================================================
            EXPANDED MENU

            Same navbar container.
            No separate popup.
            No scrolling.
        ================================================= */}

        {isOpen && (
          <div className="border-t border-[#E8DFD3]">

            {/* =================================================
                MENU LINKS
            ================================================= */}

            <nav
              className="
                flex
                flex-col
                px-5
                py-3
                sm:px-7
                sm:py-4
              "
            >

              <MenuItem
                href="/"
                onClick={() => setIsOpen(false)}
                accent
              >
                Home
              </MenuItem>

              <MenuItem
                href="/shop"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </MenuItem>

              <MenuItem
                href="/consultation"
                onClick={() => setIsOpen(false)}
              >
                Free Consultation
              </MenuItem>

              <MenuItem
                href="/quiz"
                onClick={() => setIsOpen(false)}
              >
                Skin Test
              </MenuItem>

              <MenuItem
                href="/science"
                onClick={() => setIsOpen(false)}
              >
                Ingredient Science
              </MenuItem>

              <MenuItem
                href="/about"
                onClick={() => setIsOpen(false)}
              >
                Our Story
              </MenuItem>

              <MenuItem
                href="/support"
                onClick={() => setIsOpen(false)}
              >
                Support
              </MenuItem>

              <MenuItem
                href="/terms"
                onClick={() => setIsOpen(false)}
              >
                Terms &amp; Conditions
              </MenuItem>

              <MenuItem
                href="/returns"
                onClick={() => setIsOpen(false)}
              >
                Returns &amp; Refunds
              </MenuItem>

              <MenuItem
                href="/cart"
                onClick={() => setIsOpen(false)}
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </MenuItem>


              {/* =================================================
                  AUTH
              ================================================= */}

              {session ? (
                <>
                  <MenuItem
                    href="/account"
                    onClick={() => setIsOpen(false)}
                  >
                    Account
                  </MenuItem>

                  <button
                    type="button"
                    onClick={() => {
                      signOut({
                        callbackUrl: '/',
                      })

                      setIsOpen(false)
                    }}
                    className="
                      w-fit
                      py-[6px]
                      text-left
                      font-sans
                      text-[18px]
                      font-semibold
                      leading-[1]
                      tracking-[-0.02em]
                      text-[#1A1A1A]
                      transition-colors
                      hover:text-[#E85D2C]
                      sm:text-[20px]
                    "
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <MenuItem
                  href="/auth/signin"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </MenuItem>
              )}

            </nav>


            {/* =================================================
                TAGLINE
            ================================================= */}

            <div
              className="
                border-t
                border-[#E8DFD3]
                px-5
                py-3.5
                sm:px-7
                sm:py-4
              "
            >

              <div className="flex items-center justify-between gap-4">

                <div className="min-w-0">

                  <p
                    className="
                      text-[8px]
                      font-medium
                      lowercase
                      tracking-[0.2em]
                      text-[#6B6B6B]
                      sm:text-[9px]
                    "
                  >
                    amtopm · every day
                  </p>

                  <p
                    className="
                      mt-1
                      font-fahkwang
                      text-[16px]
                      italic
                      leading-none
                      text-[#E85D2C]
                      sm:text-[18px]
                    "
                  >
                    Science-first skincare.
                  </p>

                </div>


                <p
                  className="
                    hidden
                    shrink-0
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.16em]
                    text-[#8A837B]
                    sm:block
                  "
                >
                  No hype. Just care.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  )
}


/* =========================================================
   MENU ITEM
========================================================= */

function MenuItem({
  href,
  onClick,
  children,
  accent = false,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        block
        w-fit
        py-[9px]
        font-sans
        text-[18px]
        font-semibold
        leading-[1]
        tracking-[-0.02em]
        transition-colors
        sm:py-[7px]
        sm:text-[20px]
        ${
          accent
            ? 'text-[#E85D2C]'
            : 'text-[#1A1A1A] hover:text-[#E85D2C]'
        }
      `}
    >
      {children}
    </Link>
  )
}


/* =========================================================
   CART / BAG ICON
========================================================= */

function BagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8.5h12l1 12H5l1-12Z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  )
}


/* =========================================================
   MENU ICON
========================================================= */

function MenuIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}


/* =========================================================
   CLOSE ICON
========================================================= */

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </svg>
  )
}