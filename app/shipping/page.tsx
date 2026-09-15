import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shipping & Delivery | amtopm',
  description:
    'Read the amtopm Shipping & Delivery Policy for order processing, delivery timelines, charges and serviceability.',
}

type ShippingSection = {
  number: string
  title: string
  content: string[]
  note?: string
}

const shippingSections: ShippingSection[] = [
  {
    number: '01',
    title: 'Scope',
    content: [
      'This Shipping & Delivery Policy explains how orders placed through the amtopm website are processed, shipped and delivered.',
      'Orders are shipped to the address supplied at checkout, subject to product availability, payment confirmation and serviceability.',
    ],
  },
  {
    number: '02',
    title: 'Shipping Charges',
    content: [
      'Applicable shipping charges, taxes and any delivery fees will be shown at checkout before an order is placed.',
      'Promotional free-shipping offers may have eligibility conditions, minimum order values, exclusions or validity periods.',
    ],
  },
  {
    number: '03',
    title: 'Order Processing',
    content: [
      'Orders are normally prepared for dispatch after payment and order details have been verified.',
      'Processing times may vary with product availability, order volume, weekends, public holidays and other operational conditions.',
      'An order is not considered cancelled until amtopm confirms the cancellation in writing.',
    ],
  },
  {
    number: '04',
    title: 'Delivery Estimates',
    content: [
      'Delivery estimates are indicative unless a delivery date is expressly guaranteed at checkout.',
      'The available estimate may depend on the destination, courier service, serviceability and the date the order is dispatched.',
    ],
    note: 'Courier estimates are not guarantees. Please allow reasonable additional time during sales, holidays, severe weather or other service disruptions.',
  },
  {
    number: '05',
    title: 'Tracking',
    content: [
      'Where tracking is available, shipment details may be shared through the contact information supplied with the order.',
      'Tracking information is provided by the courier and may take time to update after dispatch.',
    ],
  },
  {
    number: '06',
    title: 'Address Accuracy',
    content: [
      'Customers are responsible for providing an accurate name, address, PIN code and reachable contact number.',
      'Contact amtopm immediately if an address error is noticed before dispatch. An address change cannot be guaranteed once fulfilment or shipping has begun.',
    ],
  },
  {
    number: '07',
    title: 'Failed Delivery',
    content: [
      'Repeated failed delivery attempts, an incorrect address, an unreachable recipient or refusal to accept delivery may result in the shipment being returned to the sender.',
      'Additional delivery or re-dispatch charges may apply where lawful and disclosed. A return to sender does not automatically create a refund entitlement.',
    ],
  },
  {
    number: '08',
    title: 'Delays and Force Majeure',
    content: [
      'Delays may arise from courier disruption, weather, strikes, public events, remote-area restrictions, incorrect information, technical issues or circumstances beyond reasonable control.',
      'We will provide reasonable assistance and updates where practical, but we cannot guarantee uninterrupted courier service.',
    ],
  },
  {
    number: '09',
    title: 'Damaged or Missing Shipments',
    content: [
      'Please contact support promptly with the order number and photographs of the parcel and product if an order arrives damaged, tampered with, incomplete or materially different from what was ordered.',
      'Keep the product, outer parcel and packaging until the complaint is resolved. The applicable remedy is handled under the Returns & Refunds Policy and applicable law.',
    ],
  },
  {
    number: '10',
    title: 'Contact',
    content: [
      'For shipping questions, contact amtopm through the Talk to us section on the Support page and include your order number where applicable.',
      'This Policy should be read together with the Terms & Conditions and Returns & Refunds Policy.',
    ],
  },
]

export default function ShippingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">
      <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-[9px] font-medium lowercase tracking-[0.28em] text-[#E85D2C] sm:text-[10px]">
                amtopm · orders
              </p>

              <h1 className="mt-4 max-w-[900px] font-sans text-[48px] font-bold leading-[0.9] tracking-[-0.045em] sm:text-[70px] lg:text-[88px]">
                Shipping &amp;
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Delivery.
                </span>
              </h1>
            </div>

            <div className="max-w-[420px] lg:justify-self-end">
              <p className="font-fahkwang text-[21px] leading-[1.3] sm:text-[25px]">
                Clear delivery information from checkout to your door.
              </p>

              <p className="mt-4 text-[11px] font-light leading-[1.7] text-[#6B6B6B]">
                Please review this policy before placing an order.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-px overflow-hidden rounded-[22px] border border-[#E8DFD3] bg-[#E8DFD3] sm:grid-cols-3">
            <div className="bg-[#FBF8F3] p-5 sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                ORDERS
              </p>
              <p className="mt-3 font-fahkwang text-[19px] leading-[1.2]">
                Processed with care.
              </p>
              <p className="mt-1 text-[11px] font-light text-[#6B6B6B]">
                After payment verification
              </p>
            </div>

            <div className="bg-[#FBF8F3] p-5 sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                DELIVERY
              </p>
              <p className="mt-3 font-fahkwang text-[19px] leading-[1.2]">
                Estimates vary.
              </p>
              <p className="mt-1 text-[11px] font-light text-[#6B6B6B]">
                By destination and courier
              </p>
            </div>

            <div className="bg-[#1A1A1A] p-5 text-white sm:p-6">
              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                SUPPORT
              </p>
              <p className="mt-3 font-fahkwang text-[19px] leading-[1.2] text-white">
                We&apos;re here to help.
              </p>
              <p className="mt-1 text-[11px] font-light text-white/60">
                Keep your order number ready
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="space-y-3">
            {shippingSections.map((section) => (
              <article
                key={section.number}
                className="rounded-[20px] border border-[#E8DFD3] bg-[#FBF8F3] p-5 sm:p-7"
              >
                <div className="grid gap-4 sm:grid-cols-[70px_1fr] sm:gap-7">
                  <div>
                    <span className="font-fahkwang text-[18px] italic text-[#E85D2C]">
                      {section.number}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-sans text-[22px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[27px]">
                      {section.title}
                    </h2>

                    <div className="mt-4 space-y-3">
                      {section.content.map((paragraph, index) => (
                        <p
                          key={`${section.number}-${index}`}
                          className="text-[13px] font-light leading-[1.75] text-[#5F5A54] sm:text-[14px]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.note && (
                      <div className="mt-5 border-l-2 border-[#E85D2C] bg-[#FCE6D9] px-4 py-3">
                        <p className="text-[11px] font-light leading-[1.6] text-[#6B3E2C]">
                          {section.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1A1A1A] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E85D2C]">
              RELATED POLICY
            </p>
            <h2 className="mt-3 font-sans text-[40px] font-bold leading-[0.9] tracking-[-0.04em] sm:text-[54px]">
              Need a return?
            </h2>
          </div>

          <Link
            href="/returns"
            className="inline-flex min-h-[44px] w-fit items-center justify-center rounded-full border border-white/60 px-6 text-[12px] font-medium text-white transition-all hover:border-[#E85D2C] hover:bg-[#E85D2C]"
          >
            Read Returns &amp; Refunds →
          </Link>
        </div>
      </section>
    </main>
  )
}
