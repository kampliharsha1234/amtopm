import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions | amtopm',
  description:
    'Read the Terms & Conditions governing access to and use of the amtopm website, online store, products and services.',
}

type TermSection = {
  number: string
  title: string
  content: string[]
  note?: string
}

const terms: TermSection[] = [
  {
    number: '01',
    title: 'Introduction',
    content: [
      'These Terms and Conditions (“Terms”) govern access to and use of the AM TO PM website, online store, content, products and services. By accessing the website, creating an account, placing an order, or otherwise using the website, you agree to these Terms.',
      '“am to pm”, “we”, “us” and “our” refer to the business/entity operating the website. “You”, “your” and “customer” refer to the person accessing the website or purchasing products.',
    ],
  },
  {
    number: '02',
    title: 'Business Information',
    content: [
      'Brand: AM TO PM',
      'Owner/Proprietor: Veetarag Kasar',
      'Legal entity: Veetarag Kasar',
      'Business address: Kalpadrum Arcade, 4th floor, CTS 1966, Kore Galli, Shahapur, Belgavi - 590003',
      'Email: amtopmformulation@gmail.com',
      'Phone/WhatsApp: 7795995110',
      'GSTIN: 29KTZPK4478J2Z9',
      'Website: www.amtopm.net',
    ],
  },
  {
    number: '03',
    title: 'Eligibility',
    content: [
      'You must be legally capable of entering into a binding contract under applicable law to place an order. Minors should use the website and purchase products with parental/legal-guardian involvement. You agree to provide accurate and current information.',
    ],
  },
  {
    number: '04',
    title: 'Website Use',
    content: [
      'Use the website only for lawful purposes. Do not interfere with security, servers, payment systems or databases; introduce malicious code; scrape or reproduce content commercially without permission; or misuse the website.',
      'We may restrict access for security, fraud prevention, legal compliance or misuse.',
    ],
  },
  {
    number: '05',
    title: 'Product Information',
    content: [
      'We make reasonable efforts to keep product descriptions, ingredient information, images, sizes, prices and other details accurate. Minor visual or batch variations may occur.',
      'Products must be used according to their labels. Website information is cosmetic/product information and is not medical diagnosis, advice or treatment.',
      'Do not use a product if you are allergic or sensitive to a listed ingredient. Consider patch testing where appropriate. Stop use and seek professional advice if significant irritation or adverse reaction occurs. Persistent or severe skin conditions should be assessed by a qualified healthcare professional.',
    ],
  },
  {
    number: '06',
    title: 'Cosmetic Claims and Results',
    content: [
      'Individual results vary. We do not guarantee a particular cosmetic result or permanent removal of acne, pigmentation or other concerns.',
      'SPF, clinical, dermatological, efficacy, tested, free-from, non-comedogenic or similar claims should be used only where supported by the final product and appropriate evidence.',
    ],
  },
  {
    number: '07',
    title: 'Prices and Taxes',
    content: [
      'Prices are in Indian Rupees unless stated otherwise. Applicable taxes, shipping charges and discounts will be shown at checkout where applicable.',
      'Prices and offers may change prospectively. Obvious pricing/listing errors may be corrected; affected prepaid orders may be cancelled with an appropriate refund where required.',
    ],
  },
  {
    number: '08',
    title: 'Orders and Acceptance',
    content: [
      'Placing an order is an offer to purchase. An acknowledgement does not necessarily mean acceptance.',
      'Acceptance occurs when we confirm fulfilment, subject to availability and payment verification. We may refuse or cancel orders for legitimate reasons such as fraud, stock unavailability, payment failure, incorrect pricing, delivery restrictions or legal requirements.',
    ],
  },
  {
    number: '09',
    title: 'Payments',
    content: [
      'Payments may be processed by third-party gateways. You authorize valid transactions and agree to provide accurate payment information.',
      'Third-party gateway terms may also apply. We are not responsible for failures solely caused by a banking network or payment processor, subject to statutory rights.',
    ],
  },
  {
    number: '10',
    title: 'Shipping and Delivery',
    content: [
      'Orders are shipped to the address supplied by you, subject to availability and serviceability.',
      'Delivery estimates are indicative unless expressly guaranteed. Delays may arise from courier disruption, weather, strikes, public events, remote-area restrictions, incorrect addresses or force majeure.',
      'You are responsible for accurate delivery details.',
    ],
  },
  {
    number: '11',
    title: 'Damaged, Wrong or Missing Orders',
    content: [
      'Contact support promptly with the order number and relevant evidence such as photographs and, where available, an unboxing video.',
      'We will investigate and provide an appropriate remedy in accordance with applicable law and our published policy.',
    ],
  },
  {
    number: '12',
    title: 'Returns, Refunds and Cancellations',
    content: [
      'Because skincare products are hygiene-sensitive, returns may not be possible where a product has been opened, used and is unsafe to restock.',
      'Refunds and cancellations are subject to our published policy and applicable law.For more details, please refer to our Returns & Refunds Policy.',
    ],
  },
  {
    number: '13',
    title: 'Promotions and Offers',
    content: [
      'Coupons and offers may have validity periods, eligibility criteria, minimum order values, exclusions and usage limits.',
      'Offers cannot be combined unless stated.',
      'Dermatologist, medical-professional, retailer and distributor programmes are subject to their communicated eligibility and terms.',
    ],
  },
  {
    number: '14',
    title: 'Intellectual Property',
    content: [
      'The “am to pm” brand, logos, product names, packaging artwork, photographs, graphics, website design, text, videos and educational materials are owned by or licensed to us.',
      'No ownership is transferred. Reproduction, modification, distribution or commercial use requires permission unless permitted by law.',
    ],
  },
  {
    number: '15',
    title: 'Reviews and User Content',
    content: [
      'You confirm that reviews, photographs, testimonials and comments submitted by you are lawful and do not infringe third-party rights.',
      'You grant “am to pm” a non-exclusive, worldwide, royalty-free licence to use submitted content for legitimate website, marketing and educational purposes, subject to applicable law and privacy rights.',
      'We may moderate unlawful or violating content.',
    ],
  },
  {
    number: '16',
    title: 'Privacy and Personal Data',
    content: [
      'Personal information may be processed to operate the website, fulfil orders, provide support, prevent fraud and comply with law.',
      'Our separate Privacy Policy should explain collection, purposes, sharing, retention, security and user rights.',
      'Service providers such as payment, logistics, hosting, analytics and customer-support providers may process information as necessary and lawfully.',
    ],
  },
  {
    number: '17',
    title: 'Cookies and Analytics',
    content: [
      'We may use cookies, pixels and similar technologies for essential functionality, security, preferences, analytics and marketing.',
      'Where consent is legally required, appropriate notice and controls will be provided.',
    ],
  },
  {
    number: '18',
    title: 'Third-Party Services and Links',
    content: [
      'Third-party payment, logistics, social-media and other services may have their own terms and privacy policies.',
      'We are not responsible for third-party services except to the extent required by law.',
    ],
  },
  {
    number: '19',
    title: 'Disclaimers',
    content: [
      'To the maximum extent permitted by law, the website and content are provided on an available basis.',
      'We do not guarantee uninterrupted or error-free availability. Nothing excludes liability or consumer rights that cannot legally be excluded.',
    ],
  },
  {
    number: '20',
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, “am to pm” will not be liable for indirect, incidental, special or consequential losses arising from website use or products.',
      'This does not limit mandatory statutory rights or liability that cannot lawfully be limited.',
    ],
  },
  {
    number: '21',
    title: 'Indemnity',
    content: [
      'To the extent permitted by law, you agree to indemnify “am to pm” against claims, losses and reasonable expenses arising from unlawful website use, violation of these Terms, infringement of third-party rights or fraudulent information supplied by you, except where caused by our own unlawful conduct or non-excludable liability.',
    ],
  },
  {
    number: '22',
    title: 'Fraud and Abuse',
    content: [
      'We may investigate suspicious transactions, repeated chargebacks, coupon abuse, false claims, identity misuse and other fraud.',
      'Where lawful, affected orders/accounts may be restricted or cancelled and appropriate legal action may be taken.',
    ],
  },
  {
    number: '23',
    title: 'Product Safety and Adverse Reactions',
    content: [
      'For suspected adverse reactions, stop use and contact us with product name, batch number, order details and a description of the issue.',
      'For severe or urgent symptoms, seek medical attention.',
      'Complaint information may be used for quality, safety, regulatory and corrective-action purposes subject to privacy law.',
    ],
  },
  {
    number: '24',
    title: 'Recalls and Regulatory Action',
    content: [
      'If a product is subject to a recall, withdrawal, safety notice or regulatory corrective action, we may contact affected customers and provide instructions or remedies required by applicable law.',
    ],
  },
  {
    number: '25',
    title: 'Cosmetic Regulatory Compliance',
    content: [
      'AM TO PM products are intended to comply with applicable Indian cosmetic requirements for manufacture, labelling, quality and safety.',
      'The Cosmetics Rules, 2020 regulate cosmetics in India and prohibit false or misleading cosmetic claims.',
      'Final labels, claims, manufacturing arrangements and regulatory permissions should be verified before sale.',
    ],
  },
  {
    number: '26',
    title: 'Consumer Rights',
    content: [
      'These Terms do not remove rights available under mandatory Indian consumer law.',
      'If a term conflicts with a mandatory legal requirement, the legal requirement prevails to the extent of the conflict.',
    ],
  },
  {
    number: '27',
    title: 'Governing Law and Jurisdiction',
    content: [
      'These Terms are governed by the laws of India.',
      'Subject to applicable mandatory consumer-forum and jurisdiction rules, disputes shall be subject to the competent courts at Belagavi, Karnataka, India.',
    ],
    note: 'The supplied document recommends obtaining legal review of this clause for the actual business structure and place of business.',
  },
  {
    number: '28',
    title: 'Dispute Resolution',
    content: [
      'Customers should first contact AM TO PM through the published support/grievance contact so the issue can be investigated and resolved.',
      'Nothing prevents a consumer from using a statutory forum, authority or other legal remedy available under applicable law.',
    ],
  },
  {
    number: '29',
    title: 'Changes to Terms',
    content: [
      'We may update these Terms to reflect changes in products, business practices, technology or law.',
      'The updated version will be posted with a revised effective date.',
    ],
  },
  {
    number: '30',
    title: 'Severability',
    content: [
      'If any provision is invalid or unenforceable, it will be modified or severed only to the extent necessary and the remaining provisions will continue to apply.',
    ],
  },
  {
    number: '31',
    title: 'Waiver',
    content: [
      'Failure to enforce a provision on one occasion does not waive the right to enforce it later.',
    ],
  },
  {
    number: '32',
    title: 'Entire Agreement',
    content: [
      'These Terms, together with the Privacy Policy, Shipping Policy, Return/Refund/Cancellation Policy and other expressly incorporated policies, govern website use subject to applicable law.',
    ],
  },
]

export default function TermsPage() {
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
                amtopm · legal
              </p>

              <h1
                className="
                  mt-4
                  max-w-[900px]
                  font-sans
                  text-[48px]
                  font-bold
                  leading-[0.9]
                  tracking-[-0.045em]
                  sm:text-[70px]
                  lg:text-[88px]
                "
              >
                Terms &
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  Conditions.
                </span>
              </h1>

            </div>

            <div className="max-w-[420px] lg:justify-self-end">

              <p className="font-fahkwang text-[21px] leading-[1.3] text-[#1A1A1A] sm:text-[25px]">
                The terms that govern your use of our website, store, products and services.
              </p>

              <p className="mt-4 text-[11px] font-light leading-[1.7] text-[#6B6B6B]">
                Please read these terms carefully before using the website or placing an order.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          QUICK INFO
      ===================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-px overflow-hidden rounded-[22px] border border-[#E8DFD3] bg-[#E8DFD3] sm:grid-cols-3">

            <div className="bg-[#FBF8F3] p-5 sm:p-6">

              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                BUSINESS
              </p>

              <p className="mt-3 font-fahkwang text-[19px] leading-[1.2]">
                AM TO PM
              </p>

              <p className="mt-1 text-[11px] font-light text-[#6B6B6B]">
                Veetarag Kasar
              </p>

            </div>

            <div className="bg-[#FBF8F3] p-5 sm:p-6">

              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                GOVERNING LAW
              </p>

              <p className="mt-3 font-fahkwang text-[19px] leading-[1.2]">
                India
              </p>

              <p className="mt-1 text-[11px] font-light text-[#6B6B6B]">
                Subject to applicable consumer law
              </p>

            </div>

            <div className="bg-[#1A1A1A] p-5 text-white sm:p-6">

              <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-[#E85D2C]">
                LAST WORD
              </p>

              <p className="mt-3 font-fahkwang text-[19px] leading-[1.2] text-white">
                Transparency matters.
              </p>

              <p className="mt-1 text-[11px] font-light text-white/60">
                Your statutory rights remain protected.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          TERMS
      ===================================================== */}

      <section className="px-5 py-10 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">

          <div className="space-y-3">

            {terms.map((term) => (
              <article
                key={term.number}
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

                  {/* NUMBER */}

                  <div>

                    <span className="font-fahkwang text-[18px] italic text-[#E85D2C]">
                      {term.number}
                    </span>

                  </div>


                  {/* CONTENT */}

                  <div>

                    <h2 className="font-sans text-[22px] font-semibold leading-[1.05] tracking-[-0.025em] sm:text-[27px]">
                      {term.title}
                    </h2>

                    <div className="mt-4 space-y-3">

                      {term.content.map((paragraph, index) => (
                        <p
                          key={`${term.number}-${index}`}
                          className="text-[13px] font-light leading-[1.75] text-[#5F5A54] sm:text-[14px]"
                        >
                          {paragraph}
                        </p>
                      ))}

                    </div>

                    {term.note && (
                      <div className="mt-5 border-l-2 border-[#E85D2C] bg-[#FCE6D9] px-4 py-3">

                        <p className="text-[11px] font-light leading-[1.6] text-[#6B3E2C]">
                          {term.note}
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
          CONTACT
      ===================================================== */}

      <section className="bg-[#1A1A1A] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">

            <div>

              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E85D2C]">
                33 · CONTACT
              </p>

              <h2 className="mt-3 font-sans text-[42px] font-bold leading-[0.9] tracking-[-0.04em] sm:text-[58px]">
                Need to reach
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  amtopm?
                </span>
              </h2>

            </div>

            <div className="border-l border-white/15 pl-5 sm:pl-8">

              <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                Owner / Proprietor
              </p>

              <p className="mt-2 font-fahkwang text-[23px] text-white">
                Veetarag Kasar
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                    Email
                  </p>

                  <a
                    href="mailto:veetaragkasar26@gmail.com"
                    className="mt-1 block text-[12px] text-white/75 transition-colors hover:text-[#E85D2C]"
                  >
                    veetaragkasar26@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                    Phone / WhatsApp
                  </p>

                  <a
                    href="tel:9480281108"
                    className="mt-1 block text-[12px] text-white/75 transition-colors hover:text-[#E85D2C]"
                  >
                    9480281108
                  </a>
                </div>

              </div>

              <div className="mt-5">

                <p className="text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Business Address
                </p>

                <p className="mt-1 max-w-[500px] text-[12px] font-light leading-[1.6] text-white/70">
                  Kalpadrum Arcade, 4th floor, CTS 1966, Kore Galli,
                  Shahapur, Belgavi - 590003
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          RELATED POLICIES
      ===================================================== */}

      <section className="bg-[#F7F2EB] px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E85D2C]">
                RELATED INFORMATION
              </p>

              <h2 className="mt-3 font-sans text-[34px] font-bold leading-none tracking-[-0.035em] sm:text-[46px]">
                More policies.
              </h2>

            </div>

            <Link
              href="/support"
              className="
                inline-flex
                min-h-[44px]
                w-fit
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
              Visit support →
            </Link>

          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">

            <div className="rounded-[20px] border border-[#E8DFD3] bg-[#FBF8F3] p-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#E85D2C]">
                PRIVACY
              </p>

              <p className="mt-3 font-fahkwang text-[20px]">
                Privacy Policy
              </p>

              <p className="mt-2 text-[11px] font-light leading-[1.6] text-[#6B6B6B]">
                How personal information may be handled.
              </p>
            </div>

            <div className="rounded-[20px] border border-[#E8DFD3] bg-[#FBF8F3] p-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#E85D2C]">
                ORDERS
              </p>

              <p className="mt-3 font-fahkwang text-[20px]">
                Shipping &amp; Delivery
              </p>

              <p className="mt-2 text-[11px] font-light leading-[1.6] text-[#6B6B6B]">
                Delivery information and service expectations.
              </p>
            </div>

            <div className="rounded-[20px] border border-[#E8DFD3] bg-[#FBF8F3] p-5">
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#E85D2C]">
                RETURNS
              </p>

              <p className="mt-3 font-fahkwang text-[20px]">
                Returns &amp; Refunds
              </p>

              <p className="mt-2 text-[11px] font-light leading-[1.6] text-[#6B6B6B]">
                Eligibility, exclusions and refund information.
              </p>
            </div>

          </div>

        </div>
      </section>


   
    </main>
  )
}