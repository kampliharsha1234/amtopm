// app/data/products.ts

export interface Product {
  id: string
  name: string
  tagline: string
  price: number
  description: string
  category: 'am' | 'pm' | 'both'
  concern: string[]
  skinType: string[]
  keyBenefits: string[]
  ingredients: string[]
  howToUse: string
  image: string
  inStock: boolean
}

export const products: Product[] = [
  {
    id: 'gentle-daily-cleanser',
    name: 'Gentle Daily Cleanser',
    tagline: 'Cleanse gently. Protect your barrier.',
    price: 499,
    description:
      'A dermatologist-inspired daily cleanser built with a sulfate-free syndet cleansing system, humectants, barrier-support ingredients, and soothing actives. It cleanses away dirt, excess oil, sunscreen residue, and daily impurities without leaving skin feeling stripped.',
    category: 'both',
    concern: [
      'Daily Cleansing',
      'Barrier',
      'Dryness',
      'Sensitivity',
      'Dehydration',
      'Excess Oil'
    ],
    skinType: [
      'Dry',
      'Oily',
      'Combination',
      'Sensitive',
      'Normal',
      'Acne-Prone'
    ],
    keyBenefits: [
      'Gentle daily cleansing',
      'Helps remove dirt, excess oil and sunscreen residue',
      'Supports the skin barrier',
      'Helps maintain skin hydration',
      'Helps reduce post-cleanse tightness',
      'Supports balanced-looking skin',
      'Leaves skin feeling clean, soft and comfortable'
    ],
    ingredients: [
      'Disodium Laureth Sulfosuccinate',
      'Cocamidopropyl Betaine',
      'Sodium Cocoyl Isethionate',
      'Glycerin 3%',
      'Niacinamide 2.5–3%',
      'Panthenol 1%',
      'Allantoin 0.2%',
      'Zinc PCA 0.2–0.3%'
    ],
    howToUse:
      'Wet your face with water. Take a small amount of cleanser and gently massage over the face. Rinse thoroughly and pat dry. Use daily as part of your morning and evening routine.',
    image: '/images/products/gentle-daily-cleanser.png',
    inStock: true
  },

  {
    id: 'anti-acne-facewash',
    name: 'Anti Acne Face Wash',
    tagline: 'Clear pores. Balance oil. Support your skin.',
    price: 499,
    description:
      'A dermatologist-inspired daily acne cleanser combining pore-cleansing Salicylic Acid, surface-exfoliating Mandelic Acid, oil-balancing ingredients, antioxidant support, and soothing botanicals for oily and acne-prone skin.',
    category: 'both',
    concern: [
      'Acne',
      'Oily Skin',
      'Blackheads',
      'Whiteheads',
      'Post-Acne Marks',
      'Excess Sebum',
      'Enlarged Pores'
    ],
    skinType: [
      'Oily',
      'Combination',
      'Acne-Prone'
    ],
    keyBenefits: [
      'Helps remove excess oil',
      'Helps keep pores clear',
      'Helps reduce the appearance of blackheads and whiteheads',
      'Supports smoother-looking skin',
      'Helps improve the appearance of post-acne marks',
      'Supports balanced-looking skin',
      'Provides antioxidant and soothing support'
    ],
    ingredients: [
      'Salicylic Acid 2%',
      'Mandelic Acid 1%',
      'Niacinamide 3%',
      'Zinc PCA 0.5%',
      'Green Tea Extract 2%',
      'Licorice Root Extract 0.5%'
    ],
    howToUse:
      'Wet your face with water. Apply a small amount of cleanser and gently massage over the face, avoiding the eye area. Rinse thoroughly and pat dry. Use as part of your daily cleansing routine. If irritation occurs, reduce frequency.',
    image: '/images/products/anti-acne-facewash.png',
    inStock: true
  },

  {
    id: 'barrier-repair-moisturizer',
    name: 'Barrier Repair Moisturizer',
    tagline: 'Replenish. Repair. Strengthen.',
    price: 499,
    description:
      'A dermatologist-inspired daily moisturizer designed to support the skin barrier with Triple Ceramides, Niacinamide, Panthenol, Glycerin, Sodium Hyaluronate, Squalane, and Allantoin while maintaining a lightweight, non-greasy feel.',
    category: 'both',
    concern: [
      'Barrier',
      'Dryness',
      'Dehydration',
      'Sensitivity',
      'Tightness',
      'Post-Acne Treatment Dryness',
      'Irritation'
    ],
    skinType: [
      'Dry',
      'Normal',
      'Combination',
      'Oily',
      'Sensitive',
      'Acne-Prone'
    ],
    keyBenefits: [
      'Helps strengthen the skin moisture barrier',
      'Provides long-lasting hydration',
      'Helps reduce the feeling of dryness and tightness',
      'Supports moisture retention',
      'Helps soothe and improve skin comfort',
      'Leaves skin soft and smooth',
      'Lightweight, non-greasy moisturization'
    ],
    ingredients: [
      'Ceramide Complex NP/AP/EOP 0.5%',
      'Niacinamide 3%',
      'Panthenol 1%',
      'Glycerin 4%',
      'Sodium Hyaluronate 0.1%',
      'Squalane 2%',
      'Caprylic/Capric Triglyceride 3%',
      'Allantoin 0.3%'
    ],
    howToUse:
      'Apply an appropriate amount to clean skin after cleansing. Gently massage until absorbed. Use morning and evening, or whenever your skin needs hydration and barrier support.',
    image: '/images/products/barrier_repair_moisturizer.png',
    inStock: true
  },

  {
    id: 'sunscreen',
    name: 'Broad Spectrum Sunscreen SPF 50 PA++++',
    tagline: 'Advanced daily UV protection.',
    price: 499,
    description:
      'A dermatologist-inspired daily sunscreen formulated with three advanced photostable UV filters for broad-spectrum UVA and UVB protection, supported by Niacinamide, Panthenol, Allantoin, and Vitamin E for hydration, comfort, and antioxidant support.',
    category: 'am',
    concern: [
      'UV Exposure',
      'Sunburn',
      'Photoaging',
      'Hyperpigmentation',
      'Uneven Skin Tone',
      'Daily Environmental Exposure'
    ],
    skinType: [
      'Oily',
      'Combination',
      'Dry',
      'Normal',
      'Sensitive'
    ],
    keyBenefits: [
      'Broad-spectrum UVA and UVB protection',
      'Supports daily sun protection',
      'Helps protect against UV-induced pigmentation',
      'Supports skin barrier function',
      'Provides hydration support',
      'Helps soothe and maintain skin comfort',
      'Provides antioxidant support',
      'Designed for daily wear'
    ],
    ingredients: [
      'Uvinul A Plus 5–7%',
      'Uvinul T150 2–4%',
      'Tinosorb S 5%',
      'Niacinamide 2%',
      'Panthenol 1%',
      'Allantoin 0.2%',
      'Vitamin E 0.5%'
    ],
    howToUse:
      'Apply generously and evenly to the face and exposed areas as the final step of your morning skincare routine. Apply before sun exposure and reapply as needed during prolonged sun exposure.',
    image: '/images/products/sunscreen.png',
    inStock: true
  }
]

export const getProductById = (id: string) => {
  return products.find(product => product.id === id)
}

export const getProductsByConcern = (concern: string) => {
  return products.filter(product =>
    product.concern.includes(concern)
  )
}

export const getProductsBySkinType = (skinType: string) => {
  return products.filter(
    product =>
      product.skinType.includes('All') ||
      product.skinType.includes(skinType)
  )
}