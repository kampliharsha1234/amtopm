import { NextResponse } from 'next/server'
import {
  createReview,
  getProductReviews,
} from '../../../lib/reviews'
import { getProductById } from '../../../app/data/products'


/* ============================================================
   GET REVIEWS
   /api/reviews?productId=...
============================================================ */

export async function GET(
  request: Request
) {
  try {
    const url = new URL(request.url)

    const productId =
      url.searchParams.get(
        'productId'
      )?.trim() || ''


    if (!productId) {
      return NextResponse.json(
        {
          error:
            'Product ID is required.',
        },
        {
          status: 400,
        }
      )
    }


    const product =
      getProductById(productId)


    if (!product) {
      return NextResponse.json(
        {
          error:
            'Product not found.',
        },
        {
          status: 404,
        }
      )
    }


    const reviews =
      await getProductReviews(
        productId
      )


    return NextResponse.json({
      reviews,
    })

  } catch (error) {
    console.error(
      'Review GET error:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Unable to load reviews.',
      },
      {
        status: 500,
      }
    )
  }
}


/* ============================================================
   POST REVIEW
============================================================ */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json()


    const productId =
      typeof body.productId ===
      'string'
        ? body.productId.trim()
        : ''


    const name =
      typeof body.name ===
      'string'
        ? body.name.trim()
        : ''


    const reviewText =
      typeof body.review ===
      'string'
        ? body.review.trim()
        : ''


    const rating =
      Number(body.rating)


    /* --------------------------------------------------------
       PRODUCT
    -------------------------------------------------------- */

    const product =
      getProductById(productId)


    if (!product) {
      return NextResponse.json(
        {
          error:
            'Product not found.',
        },
        {
          status: 404,
        }
      )
    }


    /* --------------------------------------------------------
       VALIDATION
    -------------------------------------------------------- */

    if (
      !name ||
      !reviewText ||
      !Number.isInteger(
        rating
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Please complete all review fields.',
        },
        {
          status: 400,
        }
      )
    }


    if (
      name.length < 2 ||
      name.length > 60
    ) {
      return NextResponse.json(
        {
          error:
            'Name must be between 2 and 60 characters.',
        },
        {
          status: 400,
        }
      )
    }


    if (
      reviewText.length < 10 ||
      reviewText.length > 1000
    ) {
      return NextResponse.json(
        {
          error:
            'Review must be between 10 and 1000 characters.',
        },
        {
          status: 400,
        }
      )
    }


    if (
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          error:
            'Rating must be between 1 and 5.',
        },
        {
          status: 400,
        }
      )
    }


    /* --------------------------------------------------------
       CREATE
    -------------------------------------------------------- */

    const newReview =
      await createReview({
        productId,
        name,
        rating,
        review: reviewText,
      })


    return NextResponse.json(
      {
        success: true,
        review: newReview,
      },
      {
        status: 201,
      }
    )

  } catch (error) {
    console.error(
      'Review POST error:',
      error
    )

    return NextResponse.json(
      {
        error:
          'Unable to submit your review right now.',
      },
      {
        status: 500,
      }
    )
  }
}