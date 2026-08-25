'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8DFD3] p-4 sm:p-5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="body-text-sm text-[#6B6B6B] text-center sm:text-left">
          We use cookies to improve your experience. By continuing, you accept our{' '}
          <a href="#" className="text-[#E85D2C] hover:underline">Privacy Policy</a>.
        </p>
        <div className="flex gap-3">
          <button onClick={acceptCookies} className="btn-primary text-sm py-2 px-6">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}