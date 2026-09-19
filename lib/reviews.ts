import crypto from 'crypto'

import { prisma } from './prisma'

export type Review = {
  id: string
  productId: string
  name: string
  rating: number
  review: string
  createdAt: string
}

function toReview(review: {
  id: string
  productId: string
  name: string
  rating: number
  review: string
  createdAt: Date
}): Review {
  return {
    id: review.id,
    productId: review.productId,
    name: review.name,
    rating: review.rating,
    review: review.review,
    createdAt: review.createdAt.toISOString(),
  }
}

export async function getReviews(): Promise<Review[]> {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return reviews.map(toReview)
}

export async function getProductReviews(
  productId: string
): Promise<Review[]> {
  const reviews = await prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: 'desc' },
  })

  return reviews.map(toReview)
}

export async function createReview(
  review: Omit<Review, 'id' | 'createdAt'>
): Promise<Review> {
  const createdReview = await prisma.review.create({
    data: {
      id: `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
      productId: review.productId,
      name: review.name,
      rating: review.rating,
      review: review.review,
    },
  })

  return toReview(createdReview)
}
