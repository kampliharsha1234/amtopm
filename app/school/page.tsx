import { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Skin School | AM:PM',
  description:
    'Simple, science-backed skincare education. Learn about acne, SPF, barrier health, and more.',
}

/* ============================================================
   ARTICLES
============================================================ */

const articles = [
  {
    title: 'Understanding Your Skin Barrier',
    excerpt:
      'Learn why a healthy skin barrier is essential and how to protect it.',
    category: 'Barrier',
    readTime: '4 min read',
    number: '01',
  },
  {
    title: 'How to Treat Acne Without Irritation',
    excerpt:
      'Gentle approaches to clear breakouts while keeping your skin calm.',
    category: 'Acne',
    readTime: '5 min read',
    number: '02',
  },
  {
    title: 'The Ultimate Guide to SPF',
    excerpt:
      'Everything you need to know about sun protection in your routine.',
    category: 'SPF',
    readTime: '6 min read',
    number: '03',
  },
  {
    title: 'Fading Dark Spots: What Works',
    excerpt:
      'The science behind hyperpigmentation and the ingredients that help.',
    category: 'Dark Spots',
    readTime: '4 min read',
    number: '04',
  },
]


/* ============================================================
   PAGE
============================================================ */

export default function SkinSchoolPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* ======================================================
          NAVBAR SPACER
          Gives the floating navbar room
      ====================================================== */}

      <div className="h-24 sm:h-32" />


      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="bg-[#1A1A1A] px-4 pb-5 sm:px-6 sm:pb-8">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden bg-[#111111]">

            {/* VIDEO */}

            <div className="relative aspect-[0.78] w-full sm:aspect-[1.65]">

              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              >
                <source
                  src="/videos/skinschool.mp4"
                  type="video/mp4"
                />
              </video>


              {/* DARK OVERLAY */}

              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#111111]/95
                via-[#111111]/25
                to-[#111111]/5
              " />


              {/* TOP LABEL */}

              <div className="
                absolute
                left-5
                top-5
                sm:left-8
                sm:top-8
              ">

                <p className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-white/70
                  sm:text-[10px]
                ">
                  SKIN SCHOOL
                </p>

              </div>


              {/* HERO TEXT */}

              <div className="
                absolute
                bottom-0
                left-0
                right-0
                p-5
                sm:p-10
              ">

                <h1 className="
                  max-w-[650px]
                  font-serif
                  text-[55px]
                  leading-[0.82]
                  tracking-[-0.055em]
                  text-white
                  sm:text-[82px]
                ">

                  Your skin,

                  <br />

                  <span className="italic text-[#E85D2C]">
                    explained.
                  </span>

                </h1>


                <p className="
                  mt-5
                  max-w-[480px]
                  text-[10px]
                  leading-[1.5]
                  text-white/75
                  sm:text-[13px]
                ">
                  Simple explanations, ingredient breakdowns and
                  practical skincare advice — without the complicated stuff.
                </p>


                <div className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  sm:mt-6
                ">

                  <span className="
                    border
                    border-white/70
                    px-4
                    py-2
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-white
                    sm:px-6
                    sm:py-3
                    sm:text-[9px]
                  ">
                    Free skin tips
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ======================================================
          INTRO
      ====================================================== */}

      <section className="
        bg-[#F7F2EB]
        px-4
        py-10
        sm:px-6
        sm:py-16
      ">

        <div className="
          mx-auto
          grid
          max-w-7xl
          gap-5
          sm:grid-cols-[0.8fr_1.2fr]
          sm:items-end
        ">

          <div>

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-[#6B6B6B]
            ">
              START HERE
            </p>

            <h2 className="
              mt-2
              font-serif
              text-[40px]
              leading-[0.88]
              tracking-[-0.045em]
              text-[#1A1A1A]
              sm:text-[58px]
            ">
              Skin knowledge,
              <br />
              without the noise.
            </h2>

          </div>


          <p className="
            max-w-[480px]
            text-[12px]
            leading-[1.6]
            text-[#6B6B6B]
            sm:justify-self-end
            sm:text-[14px]
          ">
            Skincare becomes easier when you understand what your skin
            actually needs. Start with the fundamentals and build from
            there.
          </p>

        </div>

      </section>


      {/* ======================================================
          ARTICLES
      ====================================================== */}

      <section className="
        bg-[#F7F2EB]
        px-4
        pb-10
        sm:px-6
        sm:pb-16
      ">

        <div className="mx-auto max-w-7xl">

          <div className="
            grid
            gap-px
            overflow-hidden
            border
            border-[#E8DFD3]
            bg-[#E8DFD3]
            sm:grid-cols-2
          ">

            {articles.map((article, index) => (

              <article
                key={article.title}
                className="
                  group
                  relative
                  min-h-[250px]
                  bg-[#FBF8F3]
                  p-5
                  transition-colors
                  hover:bg-white
                  sm:min-h-[300px]
                  sm:p-7
                "
              >

                {/* NUMBER */}

                <div className="
                  flex
                  items-start
                  justify-between
                ">

                  <span className="
                    font-serif
                    text-[18px]
                    italic
                    text-[#E85D2C]
                  ">
                    {article.number}
                  </span>


                  <span className="
                    bg-[#FCE6D9]
                    px-2.5
                    py-1
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[0.12em]
                    text-[#E85D2C]
                  ">
                    {article.category}
                  </span>

                </div>


                {/* CONTENT */}

                <div className="
                  absolute
                  bottom-5
                  left-5
                  right-5
                  sm:bottom-7
                  sm:left-7
                  sm:right-7
                ">

                  <h3 className="
                    max-w-[420px]
                    font-serif
                    text-[27px]
                    leading-[0.95]
                    tracking-[-0.035em]
                    text-[#1A1A1A]
                    sm:text-[34px]
                  ">
                    {article.title}
                  </h3>


                  <p className="
                    mt-3
                    max-w-[420px]
                    text-[10px]
                    leading-[1.55]
                    text-[#6B6B6B]
                    sm:text-[11px]
                  ">
                    {article.excerpt}
                  </p>


                  <div className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-[#E8DFD3]
                    pt-3
                  ">

                    <span className="
                      text-[8px]
                      uppercase
                      tracking-[0.15em]
                      text-[#6B6B6B]
                    ">
                      {article.readTime}
                    </span>


                    <Link
                      href="#"
                      className="
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.15em]
                        text-[#1A1A1A]
                        transition-colors
                        group-hover:text-[#E85D2C]
                      "
                    >
                      Read article →
                    </Link>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          LEARN YOUR SKIN CTA
      ====================================================== */}

      <section className="
        bg-[#E85D2C]
        px-4
        py-10
        sm:px-6
        sm:py-16
      ">

        <div className="
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-7
          sm:flex-row
          sm:items-end
          sm:justify-between
        ">

          <div>

            <p className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-white/70
            ">
              KEEP LEARNING
            </p>

            <h2 className="
              mt-2
              max-w-[650px]
              font-serif
              text-[43px]
              leading-[0.88]
              tracking-[-0.05em]
              text-white
              sm:text-[65px]
            ">
              Better skin starts
              <br />
              with understanding.
            </h2>

          </div>


          <Link
            href="/shop"
            className="
              inline-flex
              min-h-[45px]
              items-center
              justify-center
              self-start
              bg-[#1A1A1A]
              px-6
              text-[9px]
              font-medium
              uppercase
              tracking-[0.16em]
              text-white
              transition-colors
              hover:bg-[#3D3D3D]
              sm:self-auto
            "
          >
            Build your routine →
          </Link>

        </div>

      </section>


      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </main>
  )
}