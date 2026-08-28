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
          FLOATING NAVBAR
      ===================================================== */}

      {!isOpen && (
        <nav
          className="
            fixed
            top-[24px]
            sm:top-[30px]
            left-1/2
            -translate-x-1/2
            w-[calc(100%-56px)]
            sm:w-[calc(100%-80px)]
            max-w-[1400px]
            z-50
          "
        >
          <div
            className="
              bg-[#FBF8F3]
              rounded-full
              border
              border-[#E8DFD3]
              shadow-[0_8px_30px_rgba(26,26,26,0.10),0_2px_8px_rgba(26,26,26,0.06)]
              overflow-hidden
            "
          >
            {/* =================================================
                MAIN NAVBAR
            ================================================= */}

            <div
              className="
                h-[54px]
                sm:h-[58px]
                px-4
                sm:px-5
                flex
                items-center
                justify-between
              "
            >
              {/* =================================================
                  LOGO
              ================================================= */}

              <Link
                href="/"
                aria-label="AM:PM Home"
                className="
                  flex
                  items-center
                  shrink-0
                  transition-opacity
                  hover:opacity-80
                "
              >
                <Image
                  src="/images/logo.png"
                  alt="AM:PM"
                  width={88}
                  height={28}
                  priority
                  className="
                    h-auto
                    w-[70px]
                    sm:w-[70px]
                    object-contain
                  "
                />
              </Link>

              {/* =================================================
                  RIGHT ACTIONS
              ================================================= */}

              <div className="flex items-center">

                {/* =================================================
                    CART
                ================================================= */}

                <Link
                  href="/cart"
                  aria-label="Cart"
                  className="
                    relative
                    w-[36px]
                    h-[36px]
                    flex
                    items-center
                    justify-center
                    text-[#1A1A1A]
                    hover:text-[#E85D2C]
                    transition-colors
                  "
                >
                  <BagIcon />

                  {totalItems > 0 && (
                    <span
                      className="
                        absolute
                        top-[3px]
                        right-[1px]
                        w-[17px]
                        h-[17px]
                        rounded-full
                        bg-[#E85D2C]
                        text-white
                        text-[9px]
                        flex
                        items-center
                        justify-center
                        leading-none
                      "
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>

                {/* =================================================
                    MENU
                ================================================= */}

                <button
                  onClick={() => setIsOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={isOpen}
                  className="
                    w-[36px]
                    h-[36px]
                    flex
                    items-center
                    justify-center
                    text-[#1A1A1A]
                    hover:text-[#E85D2C]
                    transition-colors
                  "
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* =====================================================
          FULL SCREEN MENU
      ===================================================== */}

      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-[#FBF8F3]
            text-[#1A1A1A]
            overflow-hidden
          "
        >
          {/* =================================================
              MENU HEADER
          ================================================= */}

          <div
            className="
              h-[76px]
              sm:h-[88px]
              px-6
              sm:px-10
              flex
              items-center
              justify-between
              shrink-0
            "
          >
            {/* LOGO */}

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              aria-label="AM:PM Home"
              className="
                flex
                items-center
                transition-opacity
                hover:opacity-80
              "
            >
              <Image
                src="/images/logo.png"
                alt="AM:PM"
                width={105}
                height={34}
                priority
                className="
                  h-auto
                  w-[84px]
                  sm:w-[72px]
                  object-contain
                "
              />
            </Link>

            {/* CLOSE */}

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="
                w-[42px]
                h-[42px]
                flex
                items-center
                justify-center
                text-[#1A1A1A]
                hover:text-[#E85D2C]
                transition-colors
                shrink-0
              "
            >
              <CloseIcon />
            </button>
          </div>

          {/* =================================================
              MENU CONTENT

              Mobile:
              Same open layout/behaviour as before.

              Desktop:
              Navigation gets its own scroll area so the
              complete list can never run outside the screen.
          ================================================= */}

          <div
            className="
              px-8
              sm:px-14
              pt-20
              sm:pt-24

              lg:absolute
              lg:top-[88px]
              lg:bottom-[112px]
              lg:left-0
              lg:right-0
              lg:overflow-y-auto
              lg:overscroll-contain
            "
          >
            <nav className="flex flex-col pb-6 lg:min-h-full">
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
                href="/cart"
                onClick={() => setIsOpen(false)}
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </MenuItem>

              {/* =================================================
                  AUTH LINKS
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
                    onClick={() => {
                      signOut({
                        callbackUrl: '/',
                      })
                      setIsOpen(false)
                    }}
                    className="
                      block
                      w-fit
                      py-[7px]
                      sm:py-[9px]
                      text-[30px]
                      sm:text-[42px]
                      leading-[1.05]
                      tracking-[-0.035em]
                      text-[#1A1A1A]
                      hover:text-[#E85D2C]
                      transition-colors
                      text-left
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
          </div>

          {/* =================================================
              MENU FOOTER

              This stays pinned to the bottom on desktop,
              while the navigation above it remains scrollable.
          ================================================= */}

          <div
            className="
              absolute
              bottom-8
              left-8
              right-8
              sm:left-14
              sm:right-14
              flex
              items-end
              justify-between
              bg-[#FBF8F3]
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  tracking-[0.22em]
                  uppercase
                  text-[#6B6B6B]
                "
              >
                AM · PM · EVERY DAY
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#6B6B6B]
                "
              >
                Science-first skincare.
              </p>
            </div>

            <div
              className="
                hidden
                sm:block
                text-[10px]
                tracking-[0.2em]
                uppercase
                text-[#6B6B6B]
              "
            >
              No hype. Just care.
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* =========================================================
   FULL SCREEN MENU ITEM
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
        py-[7px]
        sm:py-[9px]
        text-[30px]
        sm:text-[42px]
        leading-[1.05]
        tracking-[-0.035em]
        transition-colors
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
      width="21"
      height="21"
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
      width="24"
      height="24"
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
      width="27"
      height="27"
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