import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Ingredient Science | am to pm',
  description:
    'Understand skincare ingredients, what they do, and how they work on your skin.',
}

type Ingredient = {
  name: string
  classification: string
  category: string
  short: string
  functions: string[]
  mechanism: string
}

const ingredients: Ingredient[] = [
  {
    name: 'Azelaic Acid',
    classification: 'Dicarboxylic Acid',
    category: 'Clarify',
    short:
      'A multifunctional ingredient that supports clearer-looking skin, more even tone and reduced visible redness.',
    functions: [
      'Helps reduce the appearance of acne',
      'Helps improve post-acne pigmentation',
      'Helps reduce visible redness',
      'Supports more even-looking skin tone',
    ],
    mechanism:
      'Azelaic Acid works across several pathways associated with acne-prone and uneven-looking skin. It supports more normal keratinization and processes associated with blemishes and discoloration.',
  },

  {
    name: 'Salicylic Acid',
    classification: 'Beta Hydroxy Acid · BHA',
    category: 'Exfoliate',
    short:
      'An oil-soluble exfoliating acid that works particularly well around oily pores.',
    functions: [
      'Helps unclog pores',
      'Helps reduce blackheads',
      'Helps reduce whiteheads',
      'Helps remove excess oil',
      'Supports smoother skin texture',
    ],
    mechanism:
      'Because Salicylic Acid is oil-soluble, it can work within oily pores. It helps loosen dead skin cells and excess sebum, supporting natural exfoliation and clearer-looking pores.',
  },

  {
    name: 'Mandelic Acid',
    classification: 'Alpha Hydroxy Acid · AHA',
    category: 'Renew',
    short:
      'A surface exfoliating acid chosen for its slower penetration and focus on texture.',
    functions: [
      'Supports surface exfoliation',
      'Helps improve skin texture',
      'Supports brighter-looking skin',
      'Helps improve the appearance of post-acne marks',
    ],
    mechanism:
      'Mandelic Acid works primarily at the skin surface, encouraging the shedding of dead skin cells. Its larger molecular size allows slower penetration than smaller AHAs.',
  },

  {
    name: 'Niacinamide',
    classification: 'Vitamin B3',
    category: 'Barrier',
    short:
      'A versatile ingredient supporting the barrier while helping with oil balance, tone and texture.',
    functions: [
      'Supports the skin barrier',
      'Helps regulate excess oil',
      'Helps improve uneven-looking skin tone',
      'Supports smoother-looking skin',
      'Helps improve the appearance of enlarged pores',
    ],
    mechanism:
      'Niacinamide supports natural barrier-lipid production and contributes to improved barrier function. It also supports a more even-looking complexion.',
  },

  {
    name: 'Tranexamic Acid',
    classification: 'Skin Brightening Active',
    category: 'Brighten',
    short:
      'A targeted brightening ingredient used to support the appearance of pigmentation and post-inflammatory marks.',
    functions: [
      'Helps improve the appearance of pigmentation',
      'Supports more even-looking skin tone',
      'Helps improve post-acne marks',
      'Supports overall skin radiance',
    ],
    mechanism:
      'Tranexamic Acid is understood to influence pathways involved in pigmentation by reducing signals that can stimulate excess melanin production, particularly those associated with inflammation.',
  },

  {
    name: 'Alpha Arbutin',
    classification: 'Skin Brightening Active',
    category: 'Brighten',
    short:
      'A brightening ingredient commonly used to target visible dark spots and uneven-looking skin tone.',
    functions: [
      'Helps improve the appearance of dark spots',
      'Supports a more even-looking complexion',
      'Supports brighter-looking skin',
    ],
    mechanism:
      'Alpha Arbutin is used in cosmetic brightening formulations to support a more even-looking complexion and improve the appearance of visible discoloration.',
  },

  {
    name: 'Potassium Azeloyl Diglycinate',
    classification: 'Azelaic Acid Derivative',
    category: 'Balance',
    short:
      'A water-soluble azelaic acid derivative combining brightening and oil-balancing support.',
    functions: [
      'Helps improve uneven-looking skin tone',
      'Supports brighter-looking skin',
      'Helps balance excess oil',
      'Supports skin hydration',
    ],
    mechanism:
      'Potassium Azeloyl Diglycinate combines brightening support with sebum-balancing properties and fits naturally into lightweight daily formulations.',
  },

  {
    name: 'Bakuchiol',
    classification: 'Plant-Derived Functional Ingredient',
    category: 'Renew',
    short:
      'A plant-derived ingredient used to support skin renewal, texture and antioxidant defense.',
    functions: [
      'Helps improve skin texture',
      'Supports smoother-looking skin',
      'Provides antioxidant support',
      'Helps improve the appearance of fine lines',
      'Supports skin renewal',
    ],
    mechanism:
      'Bakuchiol is believed to support skin-renewal and collagen-related pathways while providing antioxidant protection.',
  },

  {
    name: 'Zinc PCA',
    classification: 'Sebum-Regulating Ingredient',
    category: 'Balance',
    short:
      'An oil-balancing ingredient designed to support skin that tends to produce excess sebum.',
    functions: [
      'Helps reduce excess oil',
      'Supports acne-prone skin',
      'Helps maintain skin balance',
      'Complements oil-balancing ingredients',
    ],
    mechanism:
      'Zinc PCA is used to support sebum balance and overall skin equilibrium, particularly when excess oil is part of the concern.',
  },

  {
    name: 'Panthenol',
    classification: 'Provitamin B5',
    category: 'Hydrate',
    short:
      'A skin-conditioning ingredient that attracts moisture while supporting comfort and barrier function.',
    functions: [
      'Supports hydration',
      'Helps soothe skin',
      'Supports barrier recovery',
      'Helps reduce the feeling of dryness',
      'Improves skin softness',
    ],
    mechanism:
      'Panthenol acts as a humectant, helping attract water into the outer layers of the skin while supporting barrier function and comfort.',
  },

  {
    name: 'Ceramides',
    classification: 'Barrier Repair Lipids',
    category: 'Barrier',
    short:
      'Lipids naturally found in the outer skin layer that help maintain barrier integrity.',
    functions: [
      'Reinforce the skin barrier',
      'Help reduce moisture loss',
      'Support long-term hydration',
      'Improve skin resilience',
      'Support smoother-looking skin',
    ],
    mechanism:
      'Ceramides help fill spaces between skin cells in the outer layer, forming part of a protective lipid matrix that helps reduce water loss and strengthen the barrier.',
  },

  {
    name: 'Glycerin',
    classification: 'Humectant',
    category: 'Hydrate',
    short:
      'A well-studied humectant that helps attract and retain moisture in the outer layers of skin.',
    functions: [
      'Supports hydration',
      'Helps retain moisture',
      'Improves skin softness',
      'Supports a supple skin feel',
    ],
    mechanism:
      'Glycerin binds water and helps maintain hydration in the outermost skin layer, contributing to softer and more comfortable-feeling skin.',
  },

  {
    name: 'Sodium Hyaluronate',
    classification: 'Hyaluronic Acid Salt',
    category: 'Hydrate',
    short:
      'A highly water-binding form of hyaluronic acid supporting hydrated, supple-looking skin.',
    functions: [
      'Supports hydration',
      'Improves the appearance of skin plumpness',
      'Supports smoother-looking skin',
      'Helps reduce the feeling of dryness',
    ],
    mechanism:
      'Sodium Hyaluronate binds significant amounts of water, helping maintain hydration and improving the appearance of smooth, supple skin.',
  },

  {
    name: 'Squalane',
    classification: 'Skin-Identical Emollient',
    category: 'Barrier',
    short:
      'A lightweight emollient that closely resembles naturally occurring skin lipids.',
    functions: [
      'Softens the skin',
      'Supports barrier function',
      'Helps reduce moisture loss',
      'Improves skin comfort',
    ],
    mechanism:
      'Squalane forms a lightweight protective layer over the skin, helping reduce moisture loss while improving softness and comfort.',
  },

  {
    name: 'Allantoin',
    classification: 'Skin Protectant',
    category: 'Soothe',
    short:
      'A skin-comfort ingredient used to help soothe and support a more comfortable skin feel.',
    functions: [
      'Helps soothe skin',
      'Supports skin comfort',
      'Helps reduce the feeling of irritation',
      'Supports formulation tolerability',
    ],
    mechanism:
      'Allantoin is used as a skin protectant and soothing ingredient, helping improve comfort when skin is exposed to environmental stress or active skincare ingredients.',
  },

  {
    name: 'Green Tea Extract',
    classification: 'Botanical Extract',
    category: 'Protect',
    short:
      'A botanical ingredient rich in polyphenols, valued for antioxidant and soothing support.',
    functions: [
      'Provides antioxidant support',
      'Helps soothe skin',
      'Helps protect against environmental stressors',
      'Supports healthier-looking skin',
    ],
    mechanism:
      'Green Tea Extract contains naturally occurring polyphenols that provide antioxidant support and are commonly used to help the skin cope with environmental stress.',
  },

  {
    name: 'Licorice Root Extract',
    classification: 'Botanical Extract',
    category: 'Soothe',
    short:
      'A botanical ingredient commonly used in skincare focused on uneven tone and visible redness.',
    functions: [
      'Helps improve the appearance of post-acne marks',
      'Supports brighter-looking skin',
      'Helps soothe visible redness',
    ],
    mechanism:
      'Licorice Root Extract is used in cosmetic formulations to support a more even-looking complexion while providing soothing benefits.',
  },

  {
    name: 'Tocopherol',
    classification: 'Vitamin E · Antioxidant',
    category: 'Protect',
    short:
      'An antioxidant supporting skin conditioning and environmental defense.',
    functions: [
      'Provides antioxidant support',
      'Supports skin conditioning',
      'Helps maintain healthy-looking skin',
    ],
    mechanism:
      'Vitamin E provides antioxidant support and complements the skin’s defenses against oxidative stress associated with environmental exposure.',
  },

  {
    name: 'Uvinul A Plus',
    classification: 'UVA UV Filter',
    category: 'UV Protection',
    short:
      'A modern photostable UV filter used as part of a broad-spectrum protection system.',
    functions: [
      'Supports UVA protection',
      'Contributes to broad-spectrum UV protection',
      'Supports photostability',
    ],
    mechanism:
      'Uvinul A Plus contributes primarily to UVA protection and works alongside complementary UV filters to create broader ultraviolet coverage.',
  },

  {
    name: 'Uvinul T150',
    classification: 'UVB UV Filter',
    category: 'UV Protection',
    short:
      'A modern UV filter used primarily to support UVB protection within a broader filter system.',
    functions: [
      'Supports UVB protection',
      'Contributes to broad-spectrum protection',
      'Works as part of a photostable UV system',
    ],
    mechanism:
      'Uvinul T150 contributes primarily to UVB protection and works alongside other filters to provide complementary ultraviolet coverage.',
  },

  {
    name: 'Tinosorb S',
    classification: 'Broad-Spectrum UV Filter',
    category: 'UV Protection',
    short:
      'A modern photostable UV filter contributing to both UVA and UVB coverage.',
    functions: [
      'Supports UVA protection',
      'Supports UVB protection',
      'Contributes to broad-spectrum coverage',
      'Supports photostability',
    ],
    mechanism:
      'Tinosorb S contributes to both UVA and UVB protection and works with complementary filters to broaden overall ultraviolet coverage.',
  },
]

const ingredientGroups = [
  {
    title: 'Clarify',
    accent: 'acids',
    description:
      'Ingredients that help address excess oil, clogged pores and uneven texture.',
    ingredients: [
      'Azelaic Acid',
      'Salicylic Acid',
      'Mandelic Acid',
      'Zinc PCA',
    ],
  },

  {
    title: 'Even',
    accent: 'tone',
    description:
      'Ingredients that support a brighter and more even-looking complexion.',
    ingredients: [
      'Tranexamic Acid',
      'Alpha Arbutin',
      'Niacinamide',
      'Potassium Azeloyl Diglycinate',
      'Licorice Root Extract',
    ],
  },

  {
    title: 'Strengthen',
    accent: 'barrier',
    description:
      'Ingredients that support hydration, comfort and the skin barrier.',
    ingredients: [
      'Ceramides',
      'Niacinamide',
      'Panthenol',
      'Glycerin',
      'Squalane',
      'Allantoin',
    ],
  },

  {
    title: 'Protect',
    accent: 'defence',
    description:
      'Ingredients that support antioxidant defence and protection from environmental exposure.',
    ingredients: [
      'Green Tea Extract',
      'Tocopherol',
      'Uvinul A Plus',
      'Uvinul T150',
      'Tinosorb S',
    ],
  },
]

function IngredientCard({
  ingredient,
}: {
  ingredient: Ingredient
}) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#E8DFD3]
        bg-[#FBF8F3]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(26,26,26,0.08)]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#E85D2C]/[0.05]
          transition-transform
          duration-700
          group-hover:scale-125
        "
      />

      <div className="relative border-b border-[#E8DFD3] px-5 py-4">
        <span className="font-poppins text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E85D2C]">
          {ingredient.category}
        </span>
      </div>

      <div className="relative p-5 sm:p-6">

        <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8A837B]">
          {ingredient.classification}
        </p>

        <h3 className="mt-3 font-poppins text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] sm:text-[30px]">
          {ingredient.name}
        </h3>

        <p className="body-text mt-4">
          {ingredient.short}
        </p>

        <div className="mt-6 border-t border-[#E8DFD3] pt-5">

          <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E85D2C]">
            What it does
          </p>

          <div className="mt-4 space-y-2.5">

            {ingredient.functions.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5"
              >
                <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#E85D2C]" />

                <span className="body-text text-[13px]">
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div className="mt-6 rounded-[18px] bg-[#F7F2EB] p-4 sm:p-5">

          <div className="flex items-center gap-2">

            <span className="h-px w-6 bg-[#E85D2C]" />

            <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8A837B]">
              How it works
            </p>

          </div>

          <p className="body-text mt-3 text-[13px]">
            {ingredient.mechanism}
          </p>

        </div>

      </div>
    </article>
  )
}

export default function SciencePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F7F2EB] text-[#1A1A1A]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">

        <div className="pointer-events-none absolute -right-28 -top-28 h-[380px] w-[380px] rounded-full border border-[#E85D2C]/10 sm:h-[560px] sm:w-[560px]" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[430px] w-[430px] rounded-full bg-[#E85D2C]/[0.045]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">

            <div>

              <p className="meta-text text-[#E85D2C]">
                Ingredient science
              </p>

              <h1
                className="
                  mt-5
                  font-poppins
                  text-[48px]
                  font-semibold
                  leading-[0.93]
                  tracking-[-0.045em]
                  text-[#1A1A1A]
                  sm:text-[68px]
                  lg:text-[88px]
                "
              >
                Know what
                <br />
                goes on
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  your skin.
                </span>
              </h1>

            </div>

            <div className="max-w-[500px] lg:justify-self-end">

              <p className="sub-heading">
                Understand the ingredient. Understand the role. Make better
                skincare choices.
              </p>

              <p className="body-text mt-5">
                Explore the ingredients used across the amtopm formulation
                philosophy — what they do, how they work and why they matter
                to your skin.
              </p>

              <a
                href="#ingredient-library"
                className="btn-secondary mt-7"
              >
                Explore ingredients ↓
              </a>

            </div>

          </div>


          {/* HERO STATEMENT */}

          <div className="mt-12 overflow-hidden rounded-[28px] bg-[#1A1A1A] sm:mt-16">

            <div className="grid sm:grid-cols-3">

              <div className="p-6 sm:p-8">

                <p className="meta-text-white">
                  The question
                </p>

                <p className="mt-4 font-poppins text-[24px] font-semibold leading-[1] tracking-[-0.03em] text-white sm:text-[29px]">
                  What is it?
                </p>

              </div>

              <div className="bg-[#E85D2C] p-6 sm:p-8">

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  The answer
                </p>

                <p className="mt-4 font-poppins text-[24px] font-semibold leading-[1] tracking-[-0.03em] text-white sm:text-[29px]">
                  What does it do?
                </p>

              </div>

              <div className="bg-[#FBF8F3] p-6 sm:p-8">

                <p className="font-poppins text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A837B]">
                  The point
                </p>

                <p className="mt-4 font-poppins text-[24px] font-semibold leading-[1] tracking-[-0.03em] text-[#1A1A1A] sm:text-[29px]">
                  Why does it matter?
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section className="border-y border-[#E8DFD3] bg-[#FBF8F3] px-5 py-11 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>

              <p className="meta-text text-[#E85D2C]">
                The amtopm approach
              </p>

              <h2 className="mt-4 font-poppins text-[42px] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-[58px]">
                Every ingredient
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  earns its place.
                </span>
              </h2>

            </div>

            <div className="grid gap-8 md:grid-cols-2 md:gap-10">

              <div>

                <p className="sub-heading">
                  Not the longest ingredient list.
                </p>

                <p className="body-text mt-4">
                  Good skincare is about understanding what each ingredient
                  contributes to the formula.
                </p>

              </div>

              <div>

                <p className="sub-heading">
                  Not one “hero” ingredient.
                </p>

                <p className="body-text mt-4">
                  Different ingredients can support different parts of the
                  same skin goal.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INGREDIENT MAP
      ===================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">

            <div>

              <p className="meta-text text-[#E85D2C]">
                Ingredient map
              </p>

              <h2 className="mt-3 font-poppins text-[42px] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-[58px]">
                Different jobs.
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  One skin.
                </span>
              </h2>

            </div>

            <p className="body-text max-w-[620px] lg:justify-self-end lg:text-right">
              Ingredients can have more than one role. These groups simply
              highlight the functions they are most commonly selected to
              support.
            </p>

          </div>


          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {ingredientGroups.map((group, index) => (

              <div
                key={group.title}
                className={`
                  relative
                  overflow-hidden
                  rounded-[26px]
                  p-6
                  ${
                    index === 1
                      ? 'bg-[#E85D2C] text-white'
                      : index === 3
                        ? 'bg-[#1A1A1A] text-white'
                        : 'border border-[#E8DFD3] bg-[#FBF8F3]'
                  }
                `}
              >

                <h3 className="font-poppins text-[30px] font-semibold leading-none tracking-[-0.035em] sm:text-[34px]">
                  {group.title}
                </h3>

                <p
                  className={`
                    mt-3
                    min-h-[76px]
                    font-poppins
                    text-[14px]
                    font-extralight
                    leading-[1.55]
                    ${
                      index === 1 || index === 3
                        ? 'text-white/70'
                        : 'text-[#6B6B6B]'
                    }
                  `}
                >
                  {group.description}
                </p>

                <div
                  className={`
                    mt-5
                    border-t
                    pt-4
                    ${
                      index === 1 || index === 3
                        ? 'border-white/15'
                        : 'border-[#E8DFD3]'
                    }
                  `}
                >

                  {group.ingredients.map((item) => (
                    <div
                      key={item}
                      className={`
                        border-b
                        py-2.5
                        last:border-0
                        ${
                          index === 1 || index === 3
                            ? 'border-white/10'
                            : 'border-[#E8DFD3]'
                        }
                      `}
                    >
                      <p
                        className={`
                          font-poppins
                          text-[14px]
                          font-semibold
                          ${
                            index === 1 || index === 3
                              ? 'text-white'
                              : 'text-[#1A1A1A]'
                          }
                        `}
                      >
                        {item}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          LIBRARY INTRO
      ===================================================== */}

      <section
        id="ingredient-library"
        className="bg-[#1A1A1A] px-5 py-12 text-white sm:px-8 sm:py-16"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#E85D2C]">
                Ingredient library
              </p>

              <h2 className="mt-4 font-poppins text-[48px] font-semibold leading-[0.9] tracking-[-0.045em] text-white sm:text-[70px]">
                What&apos;s actually
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  happening?
                </span>
              </h2>

            </div>

            <p className="font-poppins text-[14px] font-extralight leading-[1.7] text-white/55 lg:justify-self-end lg:text-right">
              A closer look at the ingredients, their roles and the ways they
              interact with skin.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          INGREDIENT LIBRARY
      ===================================================== */}

      <section className="bg-[#1A1A1A] px-5 pb-14 sm:px-8 sm:pb-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.name}
                ingredient={ingredient}
              />
            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          SYNERGY
      ===================================================== */}

      <section className="px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[30px] bg-[#E85D2C] text-white">

            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">

              <div className="relative overflow-hidden p-7 sm:p-10">

                <div className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full border border-white/15" />

                <p className="relative text-[9px] font-semibold uppercase tracking-[0.25em] text-white/65">
                  The bigger picture
                </p>

                <h2 className="relative mt-6 font-poppins text-[42px] font-semibold leading-[0.88] tracking-[-0.05em] sm:text-[62px]">
                  Ingredients
                  <br />
                  work
                  <br />
                  <span className="font-fahkwang font-normal italic text-[#FCE6D9]">
                    together.
                  </span>
                </h2>

                <p className="relative mt-8 max-w-[390px] font-poppins text-[14px] font-extralight leading-[1.7] text-white/75">
                  Skin concerns rarely have a single cause. Thoughtful
                  skincare combines complementary ingredients rather than
                  relying on one “hero” active.
                </p>

              </div>


              <div className="bg-[#1A1A1A] p-5 sm:p-7">

                <div className="grid gap-3 sm:grid-cols-2">

                  <SynergyCard
                    title="Exfoliation"
                    heading="Two pathways."
                    text="Salicylic Acid works primarily around oily pores while Mandelic Acid works mainly at the skin surface."
                  />

                  <SynergyCard
                    title="Oil balance"
                    heading="Keep balance."
                    text="Niacinamide and Zinc PCA can complement routines focused on excess oil and skin balance."
                  />

                  <SynergyCard
                    title="Barrier"
                    heading="Support the skin."
                    text="Ceramides, Panthenol and Allantoin provide complementary support for hydration, comfort and barrier function."
                  />

                  <SynergyCard
                    title="Antioxidants"
                    heading="Defend daily."
                    text="Green Tea Extract, Bakuchiol and Vitamin E contribute antioxidant support in different formulation contexts."
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          RESPONSIBLE SCIENCE
      ===================================================== */}

      <section className="bg-[#FBF8F3] px-5 py-12 sm:px-8 sm:py-16">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">

            <div>

              <p className="meta-text text-[#E85D2C]">
                Responsible science
              </p>

              <h2 className="mt-4 font-poppins text-[42px] font-semibold leading-[0.9] tracking-[-0.045em] sm:text-[56px]">
                Science should
                <br />
                make things
                <br />
                <span className="font-fahkwang font-normal italic text-[#E85D2C]">
                  clearer.
                </span>
              </h2>

            </div>

            <div>

              <p className="body-text">
                Ingredient science can explain what an ingredient is intended
                to do, but individual skin responses vary. This information is
                provided for cosmetic and educational purposes and is not a
                medical diagnosis or treatment.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                <SciencePoint
                  title="Results vary"
                  text="Different skin can respond differently to the same ingredient."
                />

                <SciencePoint
                  title="Claims need evidence"
                  text="Performance and protection claims should be supported by appropriate final-product evidence."
                />

                <SciencePoint
                  title="Skin comfort matters"
                  text="Active skincare should be considered alongside barrier support and overall skin comfort."
                />

                <SciencePoint
                  title="Know the difference"
                  text="Cosmetic ingredient information is not a substitute for medical diagnosis or treatment."
                />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLOSING
      ===================================================== */}

      <section className="border-t border-[#E8DFD3] bg-[#F7F2EB] px-5 py-14 sm:px-8 sm:py-20">

        <div className="mx-auto max-w-5xl text-center">

          <p className="meta-text text-[#E85D2C]">
            amtopm
          </p>

          <h2 className="mt-5 font-poppins text-[42px] font-semibold leading-[0.92] tracking-[-0.045em] sm:text-[62px]">
            Understand the ingredient.
            <br />
            <span className="font-fahkwang font-normal italic text-[#E85D2C]">
              Understand your routine.
            </span>
          </h2>

          <p className="body-text mx-auto mt-5 max-w-[520px]">
            No mystery. No unnecessary noise. Just a clearer way to understand
            what skincare ingredients are designed to do.
          </p>

          <Link
            href="/shop"
            className="btn-primary mt-7"
          >
            Shop now →
          </Link>

        </div>

      </section>



    </main>
  )
}


/* ============================================================
   SYNERGY CARD
============================================================ */

function SynergyCard({
  title,
  heading,
  text,
}: {
  title: string
  heading: string
  text: string
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.035] p-5">

      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#E85D2C]">
        {title}
      </p>

      <h3 className="mt-3 font-poppins text-[22px] font-semibold leading-[1] tracking-[-0.025em] text-white">
        {heading}
      </h3>

      <p className="mt-3 font-poppins text-[13px] font-extralight leading-[1.7] text-white/55">
        {text}
      </p>

    </div>
  )
}


/* ============================================================
   SCIENCE POINT
============================================================ */

function SciencePoint({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="rounded-[22px] border border-[#E8DFD3] bg-[#F7F2EB] p-5">

      <h3 className="font-poppins text-[20px] font-semibold leading-none tracking-[-0.025em]">
        {title}
      </h3>

      <p className="body-text mt-3 text-[13px]">
        {text}
      </p>

    </div>
  )
}