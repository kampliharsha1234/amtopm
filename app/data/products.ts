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
    id: 'sports-spf',
    name: 'Sports SPF 70+',
    tagline: 'Sweat-proof sun protection',
    price: 899,
    description:
      'High-performance sunscreen that stays on through sweat and movement. Perfect for active lifestyles.',
    category: 'am',
    concern: ['SPF', 'Barrier'],
    skinType: ['All'],
    keyBenefits: [
      'SPF 70+ broad spectrum protection',
      'Sweat-proof and water-resistant',
      'No white cast',
      'Non-comedogenic'
    ],
    ingredients: [
      'Zinc Oxide',
      'Titanium Dioxide',
      'Niacinamide',
      'Vitamin E'
    ],
    howToUse:
      'Apply generously 15 minutes before sun exposure. Reapply every 2 hours or after swimming/sweating.',
    image: '/images/products/sports-spf.png',
    inStock: true
  },

  {
    id: 'barrier-serum',
    name: 'Barrier Repair Serum',
    tagline: 'Restore and strengthen your skin barrier',
    price: 1199,
    description:
      'A powerhouse serum that repairs and strengthens your skin barrier with ceramides and peptides.',
    category: 'pm',
    concern: ['Barrier', 'Acne'],
    skinType: ['Dry', 'Sensitive', 'Combination'],
    keyBenefits: [
      'Strengthens skin barrier',
      'Reduces redness and irritation',
      'Improves skin texture',
      'Hydrates deeply'
    ],
    ingredients: [
      'Ceramides',
      'Peptides',
      'Niacinamide',
      'Squalane'
    ],
    howToUse:
      'Apply 2-3 drops to clean skin in the evening. Follow with moisturizer.',
    image: '/images/products/barrier-serum.png',
    inStock: true
  },

  {
    id: 'dark-spot-corrector',
    name: 'Dark Spot Corrector',
    tagline: 'Fade hyperpigmentation effectively',
    price: 999,
    description:
      'Targets dark spots and uneven skin tone with a blend of brightening ingredients.',
    category: 'both',
    concern: ['Dark Spots', 'Acne'],
    skinType: ['All'],
    keyBenefits: [
      'Fades dark spots and hyperpigmentation',
      'Brightens skin tone',
      'Reduces acne marks',
      'Gentle enough for daily use'
    ],
    ingredients: [
      'Tranexamic Acid',
      'Azelaic Acid',
      'Niacinamide',
      'Vitamin C'
    ],
    howToUse:
      'Apply to clean, dry skin on affected areas. Use AM and PM for best results.',
    image: '/images/products/dark-spot-corrector.png',
    inStock: true
  },

  {
    id: 'acne-treatment',
    name: 'Acne Treatment Gel',
    tagline: 'Clear breakouts without irritation',
    price: 749,
    description:
      'A gentle yet effective acne treatment that clears breakouts while soothing the skin.',
    category: 'pm',
    concern: ['Acne'],
    skinType: ['Oily', 'Combination', 'Sensitive'],
    keyBenefits: [
      'Clears existing breakouts',
      'Prevents future acne',
      'Reduces redness and inflammation',
      'Does not strip the skin'
    ],
    ingredients: [
      'Azelaic Acid',
      'Niacinamide',
      'Zinc PCA',
      'Salicylic Acid'
    ],
    howToUse:
      'Apply a thin layer to affected areas in the evening. Start with every other night.',
    image: '/images/products/acne-treatment.png',
    inStock: true
  },

  {
    id: 'morning-dew-moisturizer',
    name: 'Morning Dew Moisturizer',
    tagline: 'Lightweight hydration for daytime',
    price: 849,
    description:
      'A refreshing, lightweight moisturizer that hydrates without feeling heavy or greasy.',
    category: 'am',
    concern: ['Barrier'],
    skinType: ['All'],
    keyBenefits: [
      'Lightweight hydration',
      'Non-greasy finish',
      'Prepares skin for makeup',
      'Contains antioxidants'
    ],
    ingredients: [
      'Hyaluronic Acid',
      'Niacinamide',
      'Green Tea Extract',
      'Vitamin E'
    ],
    howToUse:
      'Apply to clean skin in the morning. Follow with SPF if going outdoors.',
    image: '/images/products/morning-dew-moisturizer.png',
    inStock: true
  },

  {
    id: 'night-repair-cream',
    name: 'Night Repair Cream',
    tagline: 'Deep overnight restoration',
    price: 1099,
    description:
      'A rich night cream that works while you sleep to repair and rejuvenate your skin.',
    category: 'pm',
    concern: ['Barrier'],
    skinType: ['Dry', 'Combination', 'Normal'],
    keyBenefits: [
      'Deep overnight hydration',
      'Repairs while you sleep',
      'Improves skin elasticity',
      'Wake up with plump, glowing skin'
    ],
    ingredients: [
      'Peptides',
      'Ceramides',
      'Squalane',
      'Shea Butter'
    ],
    howToUse:
      'Apply as the last step of your evening routine. Massage gently into skin.',
    image: '/images/products/night-repair-cream.png',
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