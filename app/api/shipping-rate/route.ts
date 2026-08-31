import { NextRequest, NextResponse } from 'next/server'

import {
  getShiprocketShippingRate,
} from '../../../lib/shiprocket'

import { products } from '../../data/products'


/* ============================================================
   SHIPPING CONFIGURATION
============================================================ */

/*
  Temporary but deliberately conservative packaging allowance.

  This accounts for:
  - shipping box
  - tape
  - protective material
  - invoice pouch
  - packing material

  Change this ONE number when you eventually know
  the actual average packaging weight.
*/

const PACKAGING_WEIGHT_G = 100


/*
  Small dimensional safety allowance added to a
  multi-product outer package.

  Single-product shipments use the exact supplied
  dimensions from products.ts.

  Multi-product shipments are packed algorithmically.
*/

const MULTI_ITEM_MARGIN_CM = 2


/* ============================================================
   PARSE WEIGHT
============================================================ */

function parseWeightToGrams(
  weight: string
): number {
  const normalized =
    weight
      .trim()
      .toLowerCase()
      .replace(',', '.')


  const match =
    normalized.match(
      /[\d.]+/
    )


  if (!match) {
    return 0
  }


  const value =
    Number(match[0])


  if (
    !Number.isFinite(
      value
    ) ||
    value <= 0
  ) {
    return 0
  }


  if (
    normalized.includes('kg') ||
    normalized.includes('kgs')
  ) {
    return value * 1000
  }


  /*
    Your current data contains:

    50 ml
    50 gm
    100 ml
    30 gm

    For shipping estimation we treat the numerical
    quantity as approximately the same number of grams.
  */

  return value
}


/* ============================================================
   PARSE DIMENSION
============================================================ */

function parseDimension(
  value: string
): number {
  const match =
    value
      .trim()
      .replace(',', '.')
      .match(
        /[\d.]+/
      )


  if (!match) {
    return 0
  }


  const number =
    Number(match[0])


  if (
    !Number.isFinite(
      number
    ) ||
    number <= 0
  ) {
    return 0
  }


  return number
}


/* ============================================================
   PACKAGE DIMENSIONS
============================================================ */

/*
  For one product:
    use the exact dimensions supplied to us.

  For multiple products:
    arrange packages into a simple grid.

  Example:

    2 products
    ┌──────┬──────┐
    │      │      │
    └──────┴──────┘

    4 products
    ┌──────┬──────┐
    │      │      │
    ├──────┼──────┤
    │      │      │
    └──────┴──────┘

  This is an estimate for shipping-rate calculation.
*/

function calculatePackageDimensions(
  items: Array<{
    id: string
    quantity: number
  }>
) {
  const packageProducts: Array<{
    length: number
    width: number
    height: number
  }> = []


  for (
    const item of items
  ) {
    const product =
      products.find(
        product =>
          product.id === item.id
      )


    if (!product) {
      throw new Error(
        `Product ${item.id} was not found.`
      )
    }


    const length =
      parseDimension(
        product.dimensions.length
      )

    const width =
      parseDimension(
        product.dimensions.width
      )

    const height =
      parseDimension(
        product.dimensions.height
      )


    if (
      length <= 0 ||
      width <= 0 ||
      height <= 0
    ) {
      throw new Error(
        `Invalid package dimensions for ${product.name}.`
      )
    }


    for (
      let i = 0;
      i < item.quantity;
      i++
    ) {
      packageProducts.push({
        length,
        width,
        height,
      })
    }
  }


  if (
    packageProducts.length === 0
  ) {
    throw new Error(
      'Unable to calculate package dimensions.'
    )
  }


  /* ----------------------------------------------------------
     SINGLE PRODUCT

     Use exact supplied dimensions.
  ---------------------------------------------------------- */

  if (
    packageProducts.length === 1
  ) {
    return {
      length:
        packageProducts[0].length,

      breadth:
        packageProducts[0].width,

      height:
        packageProducts[0].height,
    }
  }


  /* ----------------------------------------------------------
     MULTI-PRODUCT

     Arrange into approximately square grid.
  ---------------------------------------------------------- */

  const totalItems =
    packageProducts.length


  const columns =
    Math.ceil(
      Math.sqrt(
        totalItems
      )
    )


  const rows =
    Math.ceil(
      totalItems /
        columns
    )


  const maxLength =
    Math.max(
      ...packageProducts.map(
        item =>
          item.length
      )
    )


  const maxWidth =
    Math.max(
      ...packageProducts.map(
        item =>
          item.width
      )
    )


  const maxHeight =
    Math.max(
      ...packageProducts.map(
        item =>
          item.height
      )
    )


  const length =
    maxLength *
      columns +
    MULTI_ITEM_MARGIN_CM


  const breadth =
    maxWidth *
      rows +
    MULTI_ITEM_MARGIN_CM


  const height =
    maxHeight +
    MULTI_ITEM_MARGIN_CM


  return {
    length:
      Number(
        length.toFixed(1)
      ),

    breadth:
      Number(
        breadth.toFixed(1)
      ),

    height:
      Number(
        height.toFixed(1)
      ),
  }
}


/* ============================================================
   SHIPMENT WEIGHT
============================================================ */

function calculateShipmentWeight(
  items: Array<{
    id: string
    quantity: number
  }>
) {
  let productWeightGrams = 0


  let totalUnits = 0


  for (
    const item of items
  ) {
    const product =
      products.find(
        product =>
          product.id === item.id
      )


    if (!product) {
      throw new Error(
        `Product ${item.id} was not found.`
      )
    }


    const quantity =
      Number(item.quantity)


    if (
      !Number.isInteger(
        quantity
      ) ||
      quantity < 1 ||
      quantity > 20
    ) {
      throw new Error(
        `Invalid quantity for ${product.name}.`
      )
    }


    const weight =
      parseWeightToGrams(
        product.weight
      )


    if (weight <= 0) {
      throw new Error(
        `Invalid shipping weight for ${product.name}.`
      )
    }


    productWeightGrams +=
      weight *
      quantity


    totalUnits +=
      quantity
  }


  /*
    Product weight + 100 g packaging.
  */

  const totalWeightGrams =
    productWeightGrams +
    (
      totalUnits > 0
        ? PACKAGING_WEIGHT_G
        : 0
    )


  /*
    Shiprocket minimum chargeable weight:
    0.50 kg.
  */

  const shipmentWeightKg =
    Math.max(
      0.5,
      totalWeightGrams /
        1000
    )


  return Number(
    shipmentWeightKg.toFixed(3)
  )
}


/* ============================================================
   POST /api/shipping-rate
============================================================ */

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json()


    const {
      items,
      destinationPincode,
    } = body


    /* ========================================================
       VALIDATE ITEMS
    ======================================================== */

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your cart is empty.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       VALIDATE PINCODE
    ======================================================== */

    if (
      typeof destinationPincode !==
        'string' ||
      !/^\d{6}$/.test(
        destinationPincode
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Enter a valid 6-digit delivery pincode.',
        },
        {
          status: 400,
        }
      )
    }


    /* ========================================================
       CALCULATE PACKAGE
    ======================================================== */

    const shipmentWeight =
      calculateShipmentWeight(
        items
      )


    const packageDimensions =
      calculatePackageDimensions(
        items
      )


    /* ========================================================
       SUBTOTAL FOR DECLARED VALUE
    ======================================================== */

    let declaredValue = 0


    for (
      const item of items
    ) {
      const product =
        products.find(
          product =>
            product.id === item.id
        )


      if (!product) {
        throw new Error(
          `Product ${item.id} was not found.`
        )
      }


      declaredValue +=
        product.price *
        Number(item.quantity)
    }


    /* ========================================================
       SHIPROCKET RATE
    ======================================================== */

    const shipping =
      await getShiprocketShippingRate({
        destinationPincode,

        weight:
          shipmentWeight,

        length:
          packageDimensions.length,

        breadth:
          packageDimensions.breadth,

        height:
          packageDimensions.height,

        declaredValue,

        cod: 0,
      })


    /* ========================================================
       RESPONSE
    ======================================================== */

    return NextResponse.json({
      success: true,

      pickupPincode:
        process.env
          .SHIPROCKET_PICKUP_PINCODE,

      destinationPincode,

      shipmentWeight,

      productWeightGrams:
        Math.max(
          0,
          shipmentWeight *
            1000 -
            PACKAGING_WEIGHT_G
        ),

      packagingWeightGrams:
        PACKAGING_WEIGHT_G,

      packageDimensions,

      declaredValue,

      shippingCharge:
        shipping.shippingCharge,

      courier:
        shipping.courier,

      availableCouriers:
        shipping.availableCouriers,
    })

  } catch (error) {
    console.error(
      'Shipping rate error:',
      error
    )

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : 'Unable to calculate shipping.',
      },
      {
        status: 500,
      }
    )
  }
}