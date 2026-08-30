import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Returns, Refunds & Cancellations | amtopm',
  description:
    'Read the amtopm Return, Refund & Cancellation Policy for online skincare purchases and orders.',
}

type PolicySection = {
  number: string
  title: string
  content: string[]
  highlight?: string
}

const policySections: PolicySection[] = [
  {
    number: '01',
    title: 'Purpose & Scope',
    content: [
      'This Policy governs returns, refunds and cancellations for purchases made through the amtopm website and other direct online channels operated by amtopm, where applicable.',
      'amtopm sells hygiene-sensitive skincare and cosmetic products. Accordingly, ordinary change-of-mind returns are not provided, subject to rights that cannot legally be excluded.',
    ],
  },
  {
    number: '02',
    title: 'No General Returns',
    content: [
      'AM TO PM does not accept ordinary returns after an order is placed or delivered merely because a customer changes their mind, selected the wrong product, no longer wants the product, dislikes texture or fragrance, or ordered incorrectly.',
      'Opened, used, tested or partially used products are not eligible for ordinary return. Correctly supplied products cannot ordinarily be returned for another product.',
      'Nothing in this Policy limits mandatory legal remedies.',
    ],
  },
  {
    number: '03',
    title: 'When an Exchange Is Available',
    content: [
      'An exchange may be provided where the product received is physically damaged, broken, leaking, materially tampered with, materially different from the product ordered, or a confirmed product-quality or fulfilment issue exists.',
      'The normal remedy for a verified eligible issue is replacement or exchange rather than a discretionary cash refund, subject to applicable law.',
    ],
  },
  {
    number: '04',
    title: 'Eligible Cases',
    content: [
      'Product received physically damaged, broken, crushed or leaking.',
      'Seal or packaging materially compromised or tampered with on arrival.',
      'Wrong product dispatched by am to pm.',
      'Item missing from a multi-item order where fulfilment records support the claim.',
      'Other material product-condition or fulfilment issue confirmed by am to pm.',
    ],
  },
  {
    number: '05',
    title: 'Reporting Period',
    content: [
      'Customers should report damage, leakage, breakage, tampering, wrong product or missing-item issues within [48 HOURS / 72 HOURS] of delivery.',
      'Report issues as soon as possible. Requests made later may be harder to verify and may be declined where lawful and reasonable.',
    ],
    highlight:
      'The supplied policy still contains a [48 HOURS / 72 HOURS] placeholder. Confirm the final reporting window before publishing the policy.',
  },
  {
    number: '06',
    title: 'Evidence Required',
    content: [
      'Customers should retain the product and all packaging and provide the order number plus reasonable evidence.',
      'Evidence may include photographs of the outer parcel, product box or container, damage, seal, batch number and expiry information, and an unboxing video if available.',
      'An unboxing video is strongly recommended but should not be treated as the sole condition for a statutory remedy where applicable law provides otherwise.',
    ],
  },
  {
    number: '07',
    title: 'How to Request an Exchange',
    content: [
      'Contact am to pm using the published support contact and include the order number, issue description, delivery date and requested photographs or videos.',
      'Do not discard the affected product or packaging until am to pm confirms it is no longer required.',
    ],
  },
  {
    number: '08',
    title: 'Verification',
    content: [
      'We may review the order record, dispatch information, packaging, photographs or videos, batch information and other relevant details.',
      'Additional information may be requested where reasonably necessary. Exchange approval is subject to verification.',
    ],
  },
  {
    number: '09',
    title: 'Exchange Procedure',
    content: [
      'If approved, am to pm will normally replace the same product, subject to stock availability.',
      'If unavailable, am to pm may offer an appropriate alternative or other remedy after discussion with the customer, subject to law.',
      'am to pm may arrange reverse pickup where operationally available or provide return instructions.',
      'Replacement will normally be sent to the original delivery address unless otherwise agreed.',
    ],
  },
  {
    number: '10',
    title: 'No Cash Refund for Ordinary Returns',
    content: [
      'am to pm does not provide cash refunds merely because a customer wants to return a correctly supplied product.',
      'Where an eligible damage or fulfilment issue is confirmed, exchange is the normal remedy.',
      'Where applicable law requires a refund, or am to pm cannot provide a suitable replacement for a confirmed eligible issue, the appropriate refund or remedy will be provided in accordance with law.',
    ],
  },
  {
    number: '11',
    title: 'Cancellation Before Dispatch',
    content: [
      'Cancellation requests may be considered only before the order enters dispatch or fulfilment, subject to order status and applicable law.',
      'Contact am to pm immediately after ordering.',
      'Cancellation is not complete until am to pm confirms it.',
      'If a prepaid order is validly cancelled, an eligible refund will be processed through the applicable payment method, subject to applicable timelines.',
    ],
  },
  {
    number: '12',
    title: 'Cancellation After Dispatch',
    content: [
      'After dispatch, an order generally cannot be cancelled through the normal process.',
      'Refusing delivery or sending a parcel back without authorization does not automatically create a refund entitlement.',
      'Orders returned because of incorrect address, repeated failed delivery attempts or customer refusal will be handled according to the circumstances, shipping costs and applicable law.',
    ],
  },
  {
    number: '13',
    title: 'Incorrect Address',
    content: [
      'Customers are responsible for accurate name, address, PIN code and contact details.',
      'If delivery fails because of incorrect or incomplete information, additional delivery or re-dispatch charges may apply where lawful and disclosed.',
      'Contact am to pm immediately if an error is noticed before dispatch; an address change cannot be guaranteed after fulfilment begins.',
    ],
  },
  {
    number: '14',
    title: 'Wrong Product Sent',
    content: [
      'If am to pm sends a different product from the one ordered, report it within the stated reporting period.',
      'After verification, am to pm will arrange appropriate replacement and provide instructions for the incorrectly supplied item.',
      'Do not open or use it if an exchange is requested.',
    ],
  },
  {
    number: '15',
    title: 'Damaged or Leaking Product',
    content: [
      'Do not use a damaged, leaking or broken product.',
      'Photograph the package and product and contact support promptly.',
      'am to pm may arrange replacement after verification. If product integrity is compromised, do not apply it to the skin.',
    ],
  },
  {
    number: '16',
    title: 'Quality Defects',
    content: [
      'If a customer believes a product has a manufacturing defect, seal failure, unusual contamination, significant unexplained change in appearance or odour, or another quality issue, stop use and contact am to pm with the batch number and purchase details.',
      'am to pm may request the product for quality investigation.',
      'A confirmed defect will be handled with an appropriate remedy under applicable law.',
    ],
  },
  {
    number: '17',
    title: 'Adverse Reactions',
    content: [
      'An adverse skin reaction is not automatically a return request.',
      'Stop using the product and seek medical attention for severe or urgent symptoms.',
      'Contact am to pm with product, batch and order details so the complaint can be investigated.',
      'This Policy does not replace medical advice or limit mandatory legal rights.',
    ],
  },
  {
    number: '18',
    title: 'Refund Processing',
    content: [
      'Where a refund is legally or contractually due, it will normally be processed to the original payment method or through the applicable payment mechanism.',
      'Bank, card, UPI and gateway timelines may vary.',
      'The refund will reflect the amount actually paid and applicable law. No unlawful deduction will be made.',
    ],
  },
  {
    number: '19',
    title: 'Shipping Charges',
    content: [
      'Original shipping charges are generally non-refundable for voluntary cancellation or change-of-mind requests.',
      'Where am to pm is responsible for a confirmed wrong product, eligible damage or fulfilment error, shipping-related remedies will be handled appropriately under applicable law.',
    ],
  },
  {
    number: '20',
    title: 'Discounts & Promotions',
    content: [
      'Orders using coupons, discounts, bundles or promotional pricing remain subject to this Policy.',
      'If a refund is required, it will generally reflect the amount actually paid, not the undiscounted MRP, subject to law and offer terms.',
    ],
  },
  {
    number: '21',
    title: 'Gifts & Samples',
    content: [
      'Free gifts, samples and bonus products are not independently returnable for cash.',
      'Treatment of promotional items in a cancelled or refunded order will follow the relevant offer terms and applicable law.',
    ],
  },
  {
    number: '22',
    title: 'Purchases Through Third Parties',
    content: [
      'For purchases made through an authorised marketplace, pharmacy, dermatologist, retailer or distributor, the purchase channel’s return or refund process may apply.',
      'Customers should first follow the process of the seller through whom the purchase was made.',
      'am to pm may assist with genuine product-quality or safety complaints.',
    ],
  },
  {
    number: '23',
    title: 'Unauthorised Returns',
    content: [
      'Do not send products to am to pm without prior approval or instructions.',
      'Unauthorised parcels may not be accepted or may be returned to the sender, subject to applicable law.',
    ],
  },
  {
    number: '24',
    title: 'Fraud & Abuse',
    content: [
      'am to pm may investigate repeated or suspicious exchange or refund requests, false damage claims, manipulated evidence, product substitution, chargeback abuse or other fraudulent activity.',
      'Where lawful, service may be restricted and appropriate action taken.',
    ],
  },
  {
    number: '25',
    title: 'Consumer Rights',
    content: [
      'This Policy does not remove or restrict consumer rights, guarantees or remedies that cannot lawfully be excluded.',
      'If any part conflicts with mandatory law, the mandatory legal requirement prevails to the extent of the conflict.',
    ],
  },
  {
    number: '26',
    title: 'Governing Law & Jurisdiction',
    content: [
      'This Policy is governed by the laws of India.',
      'Subject to mandatory consumer-protection and jurisdiction rules, disputes shall be subject to the competent courts at Belagavi, Karnataka, India.',
    ],
  },
  {
    number: '27',
    title: 'Changes',
    content: [
      'am to pm may update this Policy to reflect changes in products, operations, payment systems or law.',
      'The latest version will be published with an updated effective date.',
    ],
  },
]

export default function ReturnsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_0.55fr] lg:items-end lg:gap-16">

            <div>

              <p className="text-[9px] font-medium lowercase tracking-[0.28em] text-[#E85D2C] sm:text-[10px]">
                amtopm · customer policy
              </p>

              <h1
                className="
                  mt-4
                  max-w-[900px]
                  font-sans
                  text-[46px]
                  font-bold
                  leading-[0.9]
                  tracking-[-0.045em]
                  sm:text-[68px]
                  lg:text-[86px]
                "
              >
                Returns,
                <br />
                Refunds &
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Cancellations.
                </span>
              </h1>

            </div>

            <div className="max-w-[430px] lg:justify-self-end">

              <p className="font-fahkwang text-[21px] leading-[1.3] sm:text-[25px]">
                Clear guidance for damaged, incorrect, defective or cancelled orders.
              </p>

              <p className="mt-4 text-[11px] font-light leading-[1.7] text-[#6B6B6B]">
                Because skincare is hygiene-sensitive, ordinary change-of-mind returns are generally not provided.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          QUICK GUIDE
      ===================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-7 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-3 md:grid-cols-3">

            <div className="rounded-[22px] bg-[#E85D2C] p-5 text-white sm:p-6">

              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/65">
                ORDINARY RETURNS
              </p>

              <p className="mt-4 font-fahkwang text-[22px] leading-[1.1]">
                Generally not available.
              </p>

              <p className="mt-3 text-[11px] font-light leading-[1.6] text-white/75">
                Correctly supplied skincare products cannot ordinarily be returned simply because you changed your mind.
              </p>

            </div>

            <div className="rounded-[22px] bg-[#F7F2EB] p-5 sm:p-6">

              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                ELIGIBLE ISSUES
              </p>

              <p className="mt-4 font-fahkwang text-[22px] leading-[1.1]">
                Exchange may be available.
              </p>

              <p className="mt-3 text-[11px] font-light leading-[1.6] text-[#6B6B6B]">
                Damage, leakage, tampering, wrong products or confirmed fulfilment issues may qualify after verification.
              </p>

            </div>

            <div className="rounded-[22px] bg-[#1A1A1A] p-5 text-white sm:p-6">

              <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
                FIRST STEP
              </p>

              <p className="mt-4 font-fahkwang text-[22px] leading-[1.1]">
                Keep everything.
              </p>

              <p className="mt-3 text-[11px] font-light leading-[1.6] text-white/65">
                Retain the product, packaging, order number and useful evidence until the issue is resolved.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          POLICY
      ===================================================== */}

      <section className="px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">

          <div className="space-y-3">

            {policySections.map((section) => (
              <article
                key={section.number}
                className="
                  rounded-[20px]
                  border
                  border-[#E8DFD3]
                  bg-[#FBF8F3]
                  p-5
                  sm:p-7
                "
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

                    {section.highlight && (
                      <div className="mt-5 border-l-2 border-[#E85D2C] bg-[#FCE6D9] px-4 py-3">

                        <p className="text-[11px] font-light leading-[1.6] text-[#6B3E2C]">
                          {section.highlight}
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


      {/* =====================================================
          CUSTOMER QUICK GUIDE
      ===================================================== */}

      <section className="bg-[#1A1A1A] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

            <div>

              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E85D2C]">
                CUSTOMER QUICK GUIDE
              </p>

              <h2 className="mt-3 font-sans text-[42px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[58px]">
                What to do when
                <br />
                something goes
                <span className="ml-2 font-fahkwang font-normal italic text-[#E85D2C]">
                  wrong.
                </span>
              </h2>

            </div>

            <div className="border-l border-white/15 pl-5 sm:pl-8">

              <div className="space-y-4">

                <GuideItem number="01">
                  No ordinary returns for correctly supplied skincare products or change-of-mind requests.
                </GuideItem>

                <GuideItem number="02">
                  Genuine damaged, leaking, broken, tampered or wrong products may qualify for exchange after verification.
                </GuideItem>

                <GuideItem number="03">
                  Report issues within the stated reporting period and as soon as possible.
                </GuideItem>

                <GuideItem number="04">
                  Keep the product, shipping parcel and packaging until the complaint is resolved.
                </GuideItem>

                <GuideItem number="05">
                  Cancellation should be requested immediately and is generally considered only before dispatch.
                </GuideItem>

                <GuideItem number="06">
                  Mandatory consumer rights remain unaffected.
                </GuideItem>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="bg-[#F7F2EB] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">

          <div className="rounded-[26px] bg-[#FBF8F3] p-6 sm:p-10 lg:p-12">

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">

              <div>

                <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E85D2C]">
                  NEED HELP?
                </p>

                <h2 className="mt-3 font-sans text-[39px] font-bold leading-[0.92] tracking-[-0.04em] sm:text-[54px]">
                  We&apos;re here to
                  <br />
                  <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                    help.
                  </span>
                </h2>

              </div>

              <div className="border-l border-[#E8DFD3] pl-5 sm:pl-8">

                <p className="text-[11px] font-light leading-[1.7] text-[#6B6B6B] sm:text-[12px]">
                  When contacting us about an order issue, please include your order number and as much relevant evidence as possible.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  <a
                    href="mailto:amtopmformulation@gmail.com"
                    className="
                      inline-flex
                      min-h-[44px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#1A1A1A]
                      px-6
                      text-[12px]
                      font-medium
                      text-white
                      transition-all
                      hover:bg-[#E85D2C]
                    "
                  >
                    Email support
                  </a>

                  <a
                    href="tel:7795995110"
                    className="
                      inline-flex
                      min-h-[44px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#1A1A1A]
                      px-6
                      text-[12px]
                      font-medium
                      text-[#1A1A1A]
                      transition-all
                      hover:bg-[#1A1A1A]
                      hover:text-white
                    "
                  >
                    Call / WhatsApp
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>




    </main>
  )
}


/* ============================================================
   QUICK GUIDE ITEM
============================================================ */

function GuideItem({
  number,
  children,
}: {
  number: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4 border-b border-white/10 pb-4">

      <span className="shrink-0 pt-0.5 font-fahkwang text-[18px] italic text-[#E85D2C]">
        {number}
      </span>

      <p className="text-[13px] font-light leading-[1.65] text-white/75 sm:text-[14px]">
        {children}
      </p>

    </div>
  )
}