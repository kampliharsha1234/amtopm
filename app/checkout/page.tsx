'use client'

import {
  useEffect,
  useState,
} from 'react'

import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

import {
  useSession,
} from 'next-auth/react'

import {
  useCart,
} from '../context/CartContext'


declare global {
  interface Window {
    Razorpay: any
  }
}


type ShippingRate = {
  shippingCharge: number

  courier?: {
    name?: string
    etd?: string | null
    estimatedDeliveryDays?: string | null
  } | null
}


export default function CheckoutPage() {
  const {
    data: session,
    status,
  } = useSession()


  const {
    items,
    subtotal,
    hydrated,
    clearCart,
  } = useCart()


  /* ==========================================================
     FORM
  ========================================================== */

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    })


  /* ==========================================================
     SHIPPING
  ========================================================== */

  const [
    shippingRate,
    setShippingRate,
  ] = useState<ShippingRate | null>(
    null
  )


  const [
    shippingLoading,
    setShippingLoading,
  ] = useState(false)


  const [
    shippingError,
    setShippingError,
  ] = useState('')


  /* ==========================================================
     PAYMENT
  ========================================================== */

  const [
    isProcessing,
    setIsProcessing,
  ] = useState(false)


  const [
    error,
    setError,
  ] = useState('')


  const [
    paymentSuccess,
    setPaymentSuccess,
  ] = useState(false)


  /* ==========================================================
     FIELD UPDATE
  ========================================================== */

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData(
      previous => ({
        ...previous,
        [field]: value,
      })
    )


    /*
      If pincode changes, invalidate the
      old shipping quote until we calculate
      the new one.
    */

    if (field === 'pincode') {
      setShippingRate(null)
      setShippingError('')
    }
  }


  /* ==========================================================
     TOTAL
  ========================================================== */

  const shippingCharge =
    shippingRate?.shippingCharge ||
    0


  const total =
    subtotal +
    shippingCharge


  /* ==========================================================
     CALCULATE SHIPPING
  ========================================================== */

  useEffect(() => {
    if (
      !hydrated ||
      items.length === 0
    ) {
      return
    }


    const pincode =
      formData.pincode.trim()


    if (
      !/^\d{6}$/.test(
        pincode
      )
    ) {
      setShippingRate(null)
      setShippingError('')
      return
    }


    let cancelled = false


    const timer = setTimeout(
      async () => {
        try {
          setShippingLoading(true)
          setShippingError('')


          const response =
            await fetch(
              '/api/shipping-rate',
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',
                },

                body:
                  JSON.stringify({
                    items:
                      items.map(
                        item => ({
                          id:
                            item.id,

                          quantity:
                            item.quantity,
                        })
                      ),

                    destinationPincode:
                      pincode,
                  }),
              }
            )


          const data =
            await response.json()


          if (
            !response.ok ||
            !data.success
          ) {
            throw new Error(
              data.error ||
                'Unable to calculate shipping.'
            )
          }


          if (
            !cancelled
          ) {
            setShippingRate({
              shippingCharge:
                Number(
                  data.shippingCharge
                ),

              courier:
                data.courier ||
                null,
            })
          }

        } catch (rateError) {

          if (
            !cancelled
          ) {
            setShippingRate(null)

            setShippingError(
              rateError instanceof Error
                ? rateError.message
                : 'Unable to calculate shipping.'
            )
          }

        } finally {

          if (
            !cancelled
          ) {
            setShippingLoading(false)
          }
        }
      },
      500
    )


    return () => {
      cancelled = true
      clearTimeout(timer)
    }

  }, [
    formData.pincode,
    hydrated,
    items,
  ])


  /* ==========================================================
     PAYMENT
  ========================================================== */

  const handlePayment = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()


    if (
      !session?.user?.id
    ) {
      setError(
        'Please sign in before placing your order.'
      )
      return
    }


    if (
      !hydrated ||
      items.length === 0
    ) {
      setError(
        'Your cart is empty.'
      )
      return
    }


    if (
      !window.Razorpay
    ) {
      setError(
        'Payment system is still loading. Please try again.'
      )
      return
    }


    if (
      !shippingRate
    ) {
      setError(
        shippingError ||
          'Please enter a valid delivery pincode so we can calculate shipping.'
      )
      return
    }


    if (
      shippingLoading
    ) {
      setError(
        'Please wait while we calculate shipping.'
      )
      return
    }


    setIsProcessing(true)
    setError('')


    try {

      /* ======================================================
         CREATE SERVER-SIDE ORDER
      ====================================================== */

      const response =
        await fetch(
          '/api/create-order',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body:
              JSON.stringify({
                items:
                  items.map(
                    item => ({
                      id:
                        item.id,

                      quantity:
                        item.quantity,
                    })
                  ),

                shipping:
                  formData,
              }),
          }
        )


      const orderData =
        await response.json()


      if (
        !response.ok
      ) {
        throw new Error(
          orderData.error ||
            'Unable to create payment order.'
        )
      }


      /*
        The server has recalculated
        the authoritative shipping charge.

        Razorpay therefore receives the
        server-calculated final amount.
      */


      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount:
          orderData.amount,

        currency:
          orderData.currency,

        name:
          'amtopm',

        description:
          'amtopm Skincare Order',

        order_id:
          orderData.order_id,


        prefill: {
          name:
            formData.name,

          email:
            formData.email,

          contact:
            formData.phone,
        },


        notes: {
          address:
            formData.address,

          city:
            formData.city,

          state:
            formData.state,

          pincode:
            formData.pincode,
        },


        theme: {
          color:
            '#E85D2C',
        },


        /* ==================================================
           SUCCESS
        ================================================== */

        handler:
          async function (
            paymentResponse: {
              razorpay_payment_id:
                string

              razorpay_order_id:
                string

              razorpay_signature:
                string
            }
          ) {
            try {

              const verifyResponse =
                await fetch(
                  '/api/verify-payment',
                  {
                    method: 'POST',

                    headers: {
                      'Content-Type':
                        'application/json',
                    },

                    body:
                      JSON.stringify(
                        paymentResponse
                      ),
                  }
                )


              const verification =
                await verifyResponse.json()


              if (
                !verifyResponse.ok ||
                !verification.success
              ) {
                throw new Error(
                  verification.error ||
                    'Payment verification failed.'
                )
              }


              clearCart()

              setPaymentSuccess(
                true
              )

            } catch (
              verificationError
            ) {

              console.error(
                'Payment verification error:',
                verificationError
              )


              setError(
                'Payment was received, but we could not verify it. Please contact support before trying again.'
              )

            } finally {

              setIsProcessing(false)

            }
          },


        /* ==================================================
           DISMISSED
        ================================================== */

        modal: {
          ondismiss:
            function () {
              setIsProcessing(false)

              setError(
                'Payment was cancelled. Your cart is still saved.'
              )
            },
        },
      }


      const razorpay =
        new window.Razorpay(
          options
        )


      razorpay.on(
        'payment.failed',
        function (
          paymentError: any
        ) {

          console.error(
            'Razorpay payment failed:',
            paymentError?.error
          )


          setError(
            paymentError?.error
              ?.description ||
              'Payment failed. Please try again.'
          )


          setIsProcessing(false)
        }
      )


      razorpay.open()

    } catch (
      paymentError
    ) {

      console.error(
        'Payment initialization error:',
        paymentError
      )


      setError(
        paymentError instanceof Error
          ? paymentError.message
          : 'Something went wrong. Please try again.'
      )


      setIsProcessing(false)
    }
  }


  /* ==========================================================
     LOADING
  ========================================================== */

  if (
    status === 'loading' ||
    !hydrated
  ) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-5">

        <div className="text-center">

          <div className="w-8 h-8 border-2 border-[#E85D2C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-sm text-[#6B6B6B]">
            Loading checkout...
          </p>

        </div>

      </div>
    )
  }


  /* ==========================================================
     SIGN IN REQUIRED
  ========================================================== */

  if (
    !session?.user
  ) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-5 py-12 pt-28">

        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-10 text-center shadow-sm">

          <div className="w-14 h-14 rounded-full bg-[#FCE6D9] flex items-center justify-center mx-auto mb-5">
            <span className="text-xl">
              🔐
            </span>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-[#E85D2C] mb-3">
            Account required
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717]">
            Sign in to continue
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
            Please sign in to your amtopm account before placing your order.
            Your orders will be saved to your account.
          </p>

          <Link
            href="/auth/signin"
            className="btn-primary inline-flex justify-center w-full mt-7"
          >
            Sign In
          </Link>

          <p className="text-sm text-[#6B6B6B] mt-5">
            Don&apos;t have an account?{' '}

            <Link
              href="/auth/signup"
              className="text-[#E85D2C] hover:underline"
            >
              Create one
            </Link>
          </p>

          <Link
            href="/cart"
            className="block mt-5 text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition"
          >
            ← Back to Cart
          </Link>

        </div>

      </div>
    )
  }


  /* ==========================================================
     PAYMENT SUCCESS
  ========================================================== */

  if (
    paymentSuccess
  ) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-5 py-12 pt-28">

        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-10 text-center shadow-sm">

          <div className="w-16 h-16 rounded-full bg-[#E8F4E8] flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">
              ✓
            </span>
          </div>

          <p className="text-xs uppercase tracking-[0.18em] text-[#E85D2C] mb-3">
            Payment successful
          </p>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#171717]">
            Thank you for your order.
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
            Your payment has been verified and your order has been saved to your account.
          </p>

          <Link
            href="/orders"
            className="btn-primary inline-flex justify-center w-full mt-7"
          >
            View My Orders
          </Link>

          <Link
            href="/shop"
            className="block mt-4 text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    )
  }


  /* ==========================================================
     EMPTY CART
  ========================================================== */

  if (
    items.length === 0
  ) {
    return (
      <div className="min-h-screen bg-[#F7F2EB] flex items-center justify-center px-5 py-12 pt-28">

        <div className="w-full max-w-md bg-white rounded-3xl p-7 sm:p-10 text-center shadow-sm">

          <div className="text-4xl mb-4">
            🛍️
          </div>

          <h1 className="text-2xl font-semibold text-[#171717]">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-[#6B6B6B]">
            Add something to your routine before checking out.
          </p>

          <Link
            href="/shop"
            className="btn-primary inline-flex justify-center w-full mt-6"
          >
            Explore Products
          </Link>

        </div>

      </div>
    )
  }


  const totalQuantity =
    items.reduce(
      (sum, item) =>
        sum +
        item.quantity,
      0
    )


  /* ==========================================================
     CHECKOUT
  ========================================================== */

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />


      <main className="min-h-screen bg-[#F7F2EB]">


        {/* ====================================================
            HEADER
        ==================================================== */}

        <section className="bg-white/70 border-b border-[#E8DFD3] pt-24 sm:pt-28">

          <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-6 sm:pb-8">

            <Link
              href="/cart"
              className="inline-flex items-center text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition"
            >
              ← Back to Cart
            </Link>

            <div className="mt-4">

              <p className="text-xs uppercase tracking-[0.18em] text-[#E85D2C]">
                amtopm
              </p>

              <h1 className="text-3xl sm:text-4xl font-semibold text-[#171717] mt-1">
                Checkout
              </h1>

            </div>

          </div>

        </section>


        {/* ====================================================
            CONTENT
        ==================================================== */}

        <section className="px-5 sm:px-8 pt-7 sm:pt-9 pb-40 sm:pb-44">

          <div className="max-w-6xl mx-auto">

            <form
              id="checkout-form"
              onSubmit={
                handlePayment
              }
              className="grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start"
            >

              {/* ==================================================
                  LEFT
              ================================================== */}

              <div className="space-y-5">


                {/* PROGRESS */}

                <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">

                  <div className="flex items-center">

                    <div className="flex items-center gap-2">

                      <div className="w-7 h-7 rounded-full bg-[#E85D2C] text-white flex items-center justify-center text-xs font-medium">
                        1
                      </div>

                      <span className="text-sm font-medium text-[#171717]">
                        Delivery
                      </span>

                    </div>

                    <div className="flex-1 h-px bg-[#E8DFD3] mx-3 sm:mx-5" />

                    <div className="flex items-center gap-2">

                      <div className="w-7 h-7 rounded-full bg-[#E85D2C] text-white flex items-center justify-center text-xs font-medium">
                        2
                      </div>

                      <span className="text-sm font-medium text-[#171717]">
                        Payment
                      </span>

                    </div>

                  </div>

                </div>


                {/* ==================================================
                    DELIVERY DETAILS
                ================================================== */}

                <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">

                  <div className="mb-5">

                    <p className="text-xs uppercase tracking-[0.15em] text-[#E85D2C]">
                      Delivery details
                    </p>

                    <h2 className="text-xl font-semibold text-[#171717] mt-1">
                      Where should we send it?
                    </h2>

                  </div>


                  <div className="space-y-4">


                    {/* NAME */}

                    <div>

                      <label className="block text-xs font-medium text-[#171717] mb-1.5">
                        Full Name
                      </label>

                      <input
                        type="text"
                        required
                        value={
                          formData.name
                        }
                        onChange={
                          e =>
                            updateField(
                              'name',
                              e.target.value
                            )
                        }
                        className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition"
                        placeholder="Your full name"
                      />

                    </div>


                    {/* EMAIL */}

                    <div>

                      <label className="block text-xs font-medium text-[#171717] mb-1.5">
                        Email
                      </label>

                      <input
                        type="email"
                        required
                        value={
                          formData.email
                        }
                        onChange={
                          e =>
                            updateField(
                              'email',
                              e.target.value
                            )
                        }
                        className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition"
                        placeholder="you@email.com"
                      />

                    </div>


                    {/* PHONE */}

                    <div>

                      <label className="block text-xs font-medium text-[#171717] mb-1.5">
                        Phone / WhatsApp
                      </label>

                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        value={
                          formData.phone
                        }
                        onChange={
                          e =>
                            updateField(
                              'phone',
                              e.target.value.replace(
                                /[^\d+]/g,
                                ''
                              )
                            )
                        }
                        className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition"
                        placeholder="10-digit mobile number"
                      />

                    </div>


                    {/* ADDRESS */}

                    <div>

                      <label className="block text-xs font-medium text-[#171717] mb-1.5">
                        Address
                      </label>

                      <textarea
                        required
                        rows={3}
                        value={
                          formData.address
                        }
                        onChange={
                          e =>
                            updateField(
                              'address',
                              e.target.value
                            )
                        }
                        className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition resize-none"
                        placeholder="House / flat number, street, area"
                      />

                    </div>


                    {/* CITY / STATE */}

                    <div className="grid grid-cols-2 gap-3">

                      <div>

                        <label className="block text-xs font-medium text-[#171717] mb-1.5">
                          City
                        </label>

                        <input
                          type="text"
                          required
                          value={
                            formData.city
                          }
                          onChange={
                            e =>
                              updateField(
                                'city',
                                e.target.value
                              )
                          }
                          className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition"
                          placeholder="City"
                        />

                      </div>


                      <div>

                        <label className="block text-xs font-medium text-[#171717] mb-1.5">
                          State
                        </label>

                        <input
                          type="text"
                          required
                          value={
                            formData.state
                          }
                          onChange={
                            e =>
                              updateField(
                                'state',
                                e.target.value
                              )
                          }
                          className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition"
                          placeholder="State"
                        />

                      </div>

                    </div>


                    {/* PINCODE */}

                    <div>

                      <label className="block text-xs font-medium text-[#171717] mb-1.5">
                        Pincode
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        required
                        value={
                          formData.pincode
                        }
                        onChange={
                          e =>
                            updateField(
                              'pincode',
                              e.target.value.replace(
                                /\D/g,
                                ''
                              )
                            )
                        }
                        className="w-full px-4 py-3 bg-[#F7F2EB] rounded-xl border border-[#E8DFD3] text-sm text-[#171717] placeholder:text-[#999] focus:outline-none focus:border-[#E85D2C] transition"
                        placeholder="6-digit PIN"
                      />

                    </div>


                    {/* SHIPPING STATUS */}

                    {shippingLoading && (
                      <div className="rounded-xl bg-[#F7F2EB] border border-[#E8DFD3] px-4 py-3 text-sm text-[#6B6B6B]">
                        Calculating delivery charge...
                      </div>
                    )}


                    {shippingError && (
                      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {shippingError}
                      </div>
                    )}


                    {shippingRate && (
                      <div className="rounded-xl border border-[#E8DFD3] bg-[#F7F2EB] px-4 py-3">

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <p className="text-xs uppercase tracking-[0.15em] text-[#E85D2C]">
                              Delivery
                            </p>

                            <p className="text-sm font-medium text-[#171717] mt-1">
                              {shippingRate.courier?.name ||
                                'Shiprocket courier'}
                            </p>

                          </div>


                          <p className="text-sm font-semibold text-[#171717]">
                            ₹
                            {shippingRate.shippingCharge.toLocaleString(
                              'en-IN'
                            )}
                          </p>

                        </div>


                        {(
                          shippingRate.courier?.etd ||
                          shippingRate.courier?.estimatedDeliveryDays
                        ) && (

                          <p className="mt-2 text-xs text-[#6B6B6B]">
                            Estimated delivery:{' '}
                            {shippingRate.courier?.etd ||
                              `${shippingRate.courier?.estimatedDeliveryDays} days`}
                          </p>

                        )}

                      </div>
                    )}

                  </div>

                </div>


                {/* ==================================================
                    PAYMENT
                ================================================== */}

                <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm">

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 rounded-xl bg-[#FCE6D9] flex items-center justify-center shrink-0">
                      <span>
                        💳
                      </span>
                    </div>

                    <div>

                      <h2 className="font-semibold text-[#171717]">
                        Secure payment
                      </h2>

                      <p className="text-sm text-[#6B6B6B] mt-1 leading-5">
                        Pay securely using UPI, cards, net banking or other methods through Razorpay.
                      </p>

                    </div>

                  </div>

                </div>


                {/* ERROR */}

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

              </div>


              {/* ==================================================
                  RIGHT — ORDER SUMMARY
              ================================================== */}

              <aside className="lg:sticky lg:top-24">

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                  <div className="p-5 sm:p-6">

                    <div className="flex items-center justify-between mb-5">

                      <h2 className="text-lg font-semibold text-[#171717]">
                        Your order
                      </h2>

                      <span className="text-xs text-[#6B6B6B]">
                        {totalQuantity}{' '}
                        item
                        {totalQuantity !== 1
                          ? 's'
                          : ''}
                      </span>

                    </div>


                    <div className="space-y-4">

                      {items.map(
                        item => (

                          <div
                            key={
                              item.id
                            }
                            className="flex gap-3"
                          >

                            <div className="relative w-16 h-16 rounded-xl bg-[#F7F2EB] overflow-hidden shrink-0">

                              <Image
                                src={
                                  item.image
                                }
                                alt={
                                  item.name
                                }
                                fill
                                sizes="64px"
                                className="object-contain p-1.5"
                              />

                            </div>


                            <div className="min-w-0 flex-1">

                              <p className="text-sm font-medium text-[#171717] leading-5">
                                {item.name}
                              </p>

                              <p className="text-xs text-[#6B6B6B] mt-1">
                                Qty{' '}
                                {item.quantity}
                              </p>

                              <p className="text-sm font-medium text-[#171717] mt-1">
                                ₹
                                {(
                                  item.price *
                                  item.quantity
                                ).toLocaleString(
                                  'en-IN'
                                )}
                              </p>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>


                  {/* TOTALS */}

                  <div className="border-t border-[#E8DFD3] p-5 sm:p-6">

                    <div className="flex justify-between text-sm text-[#6B6B6B]">

                      <span>
                        Subtotal
                      </span>

                      <span>
                        ₹
                        {subtotal.toLocaleString(
                          'en-IN'
                        )}
                      </span>

                    </div>


                    <div className="flex justify-between text-sm text-[#6B6B6B] mt-2">

                      <span>
                        Shipping
                      </span>

                      <span>

                        {shippingLoading ? (
                          'Calculating...'
                        ) : shippingRate ? (
                          `₹${shippingCharge.toLocaleString(
                            'en-IN'
                          )}`
                        ) : (
                          '—'
                        )}

                      </span>

                    </div>


                    <div className="border-t border-[#E8DFD3] my-4" />


                    <div className="flex items-center justify-between">

                      <span className="font-medium text-[#171717]">
                        Total
                      </span>

                      <span className="text-2xl font-semibold text-[#171717]">
                        ₹
                        {total.toLocaleString(
                          'en-IN'
                        )}
                      </span>

                    </div>


                    {/* DESKTOP */}

                    <button
                      type="submit"
                      disabled={
                        isProcessing ||
                        shippingLoading ||
                        !shippingRate
                      }
                      className="btn-primary w-full mt-5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                      {isProcessing
                        ? 'Processing...'
                        : shippingLoading
                          ? 'Calculating shipping...'
                          : !shippingRate
                            ? 'Enter pincode'
                            : `Pay ₹${total.toLocaleString(
                                'en-IN'
                              )}`}

                    </button>


                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#777]">

                      <span>
                        🔒
                      </span>

                      <span>
                        Secure payment powered by Razorpay
                      </span>

                    </div>

                  </div>

                </div>


                <p className="text-center text-xs text-[#777] mt-4 px-4 leading-5">
                  Your payment details are securely processed by Razorpay. amtopm never stores your card or UPI credentials.
                </p>

              </aside>

            </form>

          </div>

        </section>


        {/* ====================================================
            STICKY BOTTOM BAR
        ==================================================== */}

        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E8DFD3] bg-[#FBF8F3]/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">

          <div className="mx-auto flex max-w-6xl items-center gap-4">

            <div className="min-w-0 flex-1">

              <p className="text-[8px] font-medium uppercase tracking-[0.2em] text-[#6B6B6B]">
                Order total
              </p>

              <p className="mt-1 font-serif text-[24px] leading-none tracking-[-0.03em] sm:text-[28px]">
                ₹
                {total.toLocaleString(
                  'en-IN'
                )}
              </p>

              {shippingRate && (
                <p className="mt-1 text-[9px] text-[#6B6B6B]">
                  Shipping ₹
                  {shippingCharge.toLocaleString(
                    'en-IN'
                  )}
                </p>
              )}

            </div>


            <button
              type="submit"
              form="checkout-form"
              disabled={
                isProcessing ||
                shippingLoading ||
                !shippingRate
              }
              className="flex min-h-[46px] shrink-0 items-center justify-center bg-[#E85D2C] px-5 text-[8px] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#D14E20] disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[50px] sm:px-8"
            >

              {isProcessing
                ? 'Processing...'
                : shippingLoading
                  ? 'Calculating...'
                  : !shippingRate
                    ? 'Enter pincode'
                    : 'Proceed to payment →'}

            </button>

          </div>

        </div>

      </main>
    </>
  )
}