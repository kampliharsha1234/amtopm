import fs from 'fs/promises'
import path from 'path'

export type Review = {
  id: string
  productId: string
  name: string
  rating: number
  review: string
  createdAt: string
}

const dataDirectory = path.join(
  process.cwd(),
  'data'
)

const reviewsFile = path.join(
  dataDirectory,
  'reviews.json'
)


/* ============================================================
   ENSURE REVIEW FILE EXISTS
============================================================ */

async function ensureReviewsFile() {
  try {
    await fs.access(reviewsFile)
  } catch {
    await fs.mkdir(dataDirectory, {
      recursive: true,
    })

    await fs.writeFile(
      reviewsFile,
      '[]',
      'utf8'
    )
  }
}


/* ============================================================
   READ REVIEWS
============================================================ */

export async function getReviews(): Promise<Review[]> {
  await ensureReviewsFile()

  try {
    const raw = await fs.readFile(
      reviewsFile,
      'utf8'
    )

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed as Review[]
  } catch {
    return []
  }
}


/* ============================================================
   GET REVIEWS FOR PRODUCT
============================================================ */

export async function getProductReviews(
  productId: string
): Promise<Review[]> {
  const reviews = await getReviews()

  return reviews
    .filter(
      (review) =>
        review.productId === productId
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
}


/* ============================================================
   CREATE REVIEW
============================================================ */

export async function createReview(
  review: Omit<Review, 'id' | 'createdAt'>
): Promise<Review> {
  const reviews = await getReviews()

  const newReview: Review = {
    ...review,

    id: `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 10)}`,

    createdAt:
      new Date().toISOString(),
  }

  reviews.push(newReview)

  await fs.writeFile(
    reviewsFile,
    JSON.stringify(
      reviews,
      null,
      2
    ),
    'utf8'
  )

  return newReview
}