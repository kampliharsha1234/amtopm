// app/data/products.ts

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  priceExcludingGst: number

  sku: string
  weight: string

  dimensions: {
    length: string
    width: string
    height: string
  }

  description: string

  category: 'am' | 'pm' | 'both'

  concern: string[]

  skinType: string[]

  keyBenefits: string[]

  ingredients: string[]

  howToUse: string

  image: string

  imagePlaceholder?: boolean

  inStock: boolean
}

export const products: Product[] = [

  /* ==========================================================
     01 — COTTON MOISTURIZER
  ========================================================== */

  {
    id: 'cotton-moisturizer',

    name: 'Cotton Moisturizer',

    tagline:
      'Hydrate deeply. Reinforce your barrier.',

    price: 595,

    priceExcludingGst: 488,

    sku: '500',

    weight: '50 ml',

    dimensions: {
      length: '5.5 cm',
      width: '4 cm',
      height: '16 cm',
    },

    description:
      'A daily barrier-support moisturizer designed to hydrate, soften and reinforce the skin barrier while maintaining a lightweight, non-greasy feel.',

    category: 'both',

    concern: [
      'Barrier',
      'Dryness',
      'Dehydration',
      'Sensitivity',
      'Tightness',
      'Irritation',
      'Daily Hydration',
    ],

    skinType: [
      'Dry',
      'Normal',
      'Combination',
      'Oily',
      'Sensitive',
      'Acne-Prone',
    ],

    keyBenefits: [
      'Helps strengthen the skin moisture barrier',
      'Provides long-lasting hydration',
      'Helps reduce the feeling of dryness and tightness',
      'Supports moisture retention',
      'Helps soothe and improve skin comfort',
      'Leaves skin soft and smooth',
      'Lightweight, non-greasy moisturization',
    ],

    ingredients: [
      'Ceramide Complex NP/AP/EOP 0.5%',
      'Niacinamide 3%',
      'Panthenol 1%',
      'Glycerin 4%',
      'Sodium Hyaluronate 0.1%',
      'Squalane 2%',
      'Caprylic/Capric Triglyceride 3%',
      'Allantoin 0.3%',
    ],

    howToUse:
      'Apply an appropriate amount to clean skin after cleansing. Gently massage until absorbed. Use morning and evening, or whenever your skin needs hydration and barrier support.',

    image:
      '/images/products/cotton-moisturizer.png',

    imagePlaceholder: true,

    inStock: true,
  },


  /* ==========================================================
     02 — THINSHIELD SUNSCREEN
  ========================================================== */

  {
    id: 'thinshield-sunscreen',

    name: 'Thinshield Sunscreen',

    tagline:
      'Advanced daily UV protection.',

    price: 718,

    priceExcludingGst: 589,

    sku: '500',

    weight: '50 gm',

    dimensions: {
      length: '5.5 cm',
      width: '4 cm',
      height: '16 cm',
    },

    description:
      'A lightweight daily sunscreen formulated with three advanced photostable UV filters for broad-spectrum UVA and UVB protection, supported by ingredients for hydration, skin comfort and antioxidant defence.',

    category: 'am',

    concern: [
      'UV Exposure',
      'Sunburn',
      'Photoaging',
      'Hyperpigmentation',
      'Uneven Skin Tone',
      'Daily Environmental Exposure',
    ],

    skinType: [
      'Oily',
      'Combination',
      'Dry',
      'Normal',
      'Sensitive',
    ],

    keyBenefits: [
      'Broad-spectrum UVA and UVB protection',
      'Supports daily sun protection',
      'Helps protect against UV-induced pigmentation',
      'Supports skin barrier function',
      'Provides hydration support',
      'Helps soothe and maintain skin comfort',
      'Provides antioxidant support',
      'Designed for daily wear',
    ],

    ingredients: [
      'Uvinul A Plus 5–7%',
      'Uvinul T150 2–4%',
      'Tinosorb S 5%',
      'Niacinamide 2%',
      'Panthenol 1%',
      'Allantoin 0.2%',
      'Vitamin E 0.5%',
    ],

    howToUse:
      'Apply generously and evenly to the face and exposed areas as the final step of your morning skincare routine. Apply before sun exposure and reapply as needed during prolonged sun exposure.',

    image:
      '/images/products/thinshield-sunscreen.png',

    inStock: true,
  },


  /* ==========================================================
     03 — MILD CLEANSER
  ========================================================== */

  {
    id: 'mild-cleanser',

    name: 'Mild Cleanser',

    tagline:
      'Cleanse gently. Protect your barrier.',

    price: 462,

    priceExcludingGst: 379,

    sku: '500',

    weight: '100 ml',

    dimensions: {
      length: '5.5 cm',
      width: '4 cm',
      height: '16 cm',
    },

    description:
      'A gentle daily cleanser built around a triple-surfactant syndet system with hydration, barrier-support and soothing ingredients to remove daily impurities without leaving skin feeling stripped.',

    category: 'both',

    concern: [
      'Daily Cleansing',
      'Barrier',
      'Dryness',
      'Sensitivity',
      'Dehydration',
      'Excess Oil',
    ],

    skinType: [
      'Dry',
      'Oily',
      'Combination',
      'Sensitive',
      'Normal',
      'Acne-Prone',
    ],

    keyBenefits: [
      'Gentle daily cleansing',
      'Helps remove dirt, excess oil and sunscreen residue',
      'Supports the skin barrier',
      'Helps maintain skin hydration',
      'Helps reduce post-cleanse tightness',
      'Supports balanced-looking skin',
      'Leaves skin feeling clean, soft and comfortable',
    ],

    ingredients: [
      'Disodium Laureth Sulfosuccinate 4.5–5%',
      'Cocamidopropyl Betaine 3.5–4%',
      'Sodium Cocoyl Isethionate 1.5–2%',
      'Glycerin 3%',
      'Niacinamide 2.5–3%',
      'Panthenol 1%',
      'Allantoin 0.2%',
      'Zinc PCA 0.2–0.3%',
    ],

    howToUse:
      'Wet your face with water. Take a small amount of cleanser and gently massage over the face. Rinse thoroughly and pat dry. Use daily as part of your morning and evening routine.',

    image:
      '/images/products/mild-cleanser.png',

    inStock: true,
  },


  /* ==========================================================
     04 — ACNOWELL FACEWASH
  ========================================================== */

  {
    id: 'acnowell-facewash',

    name: 'Acnowell Facewash',

    tagline:
      'Clear pores. Balance oil. Support your skin.',

    price: 462,

    priceExcludingGst: 373,

    sku: '500',

    weight: '100 ml',

    dimensions: {
      length: '5.5 cm',
      width: '4 cm',
      height: '16 cm',
    },

    description:
      'A multi-functional acne cleansing system combining pore-focused Salicylic Acid, surface-exfoliating Mandelic Acid, oil-balancing ingredients, antioxidant support and soothing botanicals.',

    category: 'both',

    concern: [
      'Acne',
      'Oily Skin',
      'Blackheads',
      'Whiteheads',
      'Post-Acne Marks',
      'Excess Sebum',
      'Enlarged Pores',
    ],

    skinType: [
      'Oily',
      'Combination',
      'Acne-Prone',
    ],

    keyBenefits: [
      'Helps remove excess oil',
      'Helps keep pores clear',
      'Helps reduce the appearance of blackheads and whiteheads',
      'Supports smoother-looking skin',
      'Helps improve the appearance of post-acne marks',
      'Supports balanced-looking skin',
      'Provides antioxidant and soothing support',
    ],

    ingredients: [
      'Salicylic Acid 2%',
      'Mandelic Acid 1%',
      'Niacinamide 3%',
      'Zinc PCA 0.5%',
      'Green Tea Extract 2%',
      'Licorice Root Extract 0.5%',
    ],

    howToUse:
      'Wet your face with water. Apply a small amount of cleanser and gently massage over the face, avoiding the eye area. Rinse thoroughly and pat dry. Use as part of your daily cleansing routine. If irritation occurs, reduce frequency.',

    image:
      '/images/products/acnowell-facewash.png',

    inStock: true,
  },


  /* ==========================================================
     05 — ACNOWELL CREAM
  ========================================================== */

  {
    id: 'acnowell-cream',

    name: 'Acnowell Cream',

    tagline:
      'Clarify. Balance. Support your barrier.',

    price: 729,

    priceExcludingGst: 598,

    sku: '500',

    weight: '30 gm',

    dimensions: {
      length: '5.5 cm',
      width: '4 cm',
      height: '12 cm',
    },

    description:
      'A multi-pathway acne-care cream combining exfoliation, oil balance, skin-conditioning and barrier-support ingredients for clearer-looking, healthier-looking skin.',

    category: 'pm',

    concern: [
      'Acne',
      'Oily Skin',
      'Excess Sebum',
      'Post-Acne Marks',
      'Redness',
      'Skin Texture',
      'Barrier',
    ],

    skinType: [
      'Oily',
      'Combination',
      'Acne-Prone',
      'Normal',
    ],

    keyBenefits: [
      'Helps reduce the appearance of acne',
      'Helps unclog pores',
      'Helps balance excess oil',
      'Helps improve the appearance of post-acne marks',
      'Supports smoother-looking skin',
      'Supports skin barrier function',
      'Supports hydration and skin comfort',
    ],

    ingredients: [
      'Azelaic Acid 10%',
      'Salicylic Acid 1%',
      'Bakuchiol 1%',
      'Niacinamide 2.5%',
      'Zinc PCA 0.5%',
      'Panthenol 1.5%',
      'Ceramide Complex 0.5%',
      'Allantoin 0.3%',
    ],

    howToUse:
      'Apply an appropriate amount to clean, dry skin after cleansing. Gently spread over the face, avoiding the eye area. Begin gradually and increase frequency as tolerated.',

    image:
      '/images/products/acnowell-cream.png',

    imagePlaceholder: true,

    inStock: true,
  },


  /* ==========================================================
     06 — FAEDEN CREAM
  ========================================================== */

  {
    id: 'faeden-cream',

    name: 'Faeden Cream',

    tagline:
      'Even tone. Refine texture. Restore radiance.',

    price: 785,

    priceExcludingGst: 644,

    sku: '500',

    weight: '30 gm',

    dimensions: {
      length: '5.5 cm',
      width: '4 cm',
      height: '12 cm',
    },

    description:
      'A multi-pathway pigmentation care cream combining Tranexamic Acid, Alpha Arbutin, Niacinamide, Potassium Azeloyl Diglycinate and Bakuchiol to support a brighter, more even-looking complexion.',

    category: 'pm',

    concern: [
      'Pigmentation',
      'Dark Spots',
      'Uneven Skin Tone',
      'Post-Acne Marks',
      'Dullness',
      'Skin Texture',
      'Radiance',
    ],

    skinType: [
      'Oily',
      'Combination',
      'Normal',
      'Dry',
      'Pigmentation-Prone',
    ],

    keyBenefits: [
      'Helps improve the appearance of dark spots',
      'Supports a more even-looking skin tone',
      'Helps improve the appearance of post-acne marks',
      'Supports brighter-looking skin',
      'Supports smoother-looking skin',
      'Helps improve skin texture',
      'Supports overall radiance',
    ],

    ingredients: [
      'Tranexamic Acid 3%',
      'Niacinamide 5%',
      'Alpha Arbutin 2%',
      'Potassium Azeloyl Diglycinate 3%',
      'Bakuchiol 1%',
    ],

    howToUse:
      'Apply an appropriate amount to clean, dry skin in the evening. Gently spread over the face, avoiding the eye area. Introduce gradually and use consistently as tolerated.',

    image:
      '/images/products/faeden-cream.png',

    imagePlaceholder: true,

    inStock: true,
  },
]


/* ============================================================
   HELPERS
============================================================ */

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id)
}

export const getProductsByConcern = (concern: string) => {
  return products.filter((product) =>
    product.concern.includes(concern)
  )
}

export const getProductsBySkinType = (skinType: string) => {
  return products.filter(
    (product) =>
      product.skinType.includes('All') ||
      product.skinType.includes(skinType)
  )
}