const SHIPROCKET_BASE_URL =
  'https://apiv2.shiprocket.in/v1/external'

const AUTH_URL =
  `${SHIPROCKET_BASE_URL}/auth/login`

const SERVICEABILITY_URL =
  `${SHIPROCKET_BASE_URL}/courier/serviceability/`

const CREATE_ORDER_URL =
  `${SHIPROCKET_BASE_URL}/orders/create/adhoc`

const ASSIGN_AWB_URL =
  `${SHIPROCKET_BASE_URL}/courier/assign/awb`

const GENERATE_PICKUP_URL =
  `${SHIPROCKET_BASE_URL}/courier/generate/pickup`


/* ============================================================
   TYPES
============================================================ */

type ShiprocketAuthResponse = {
  token?: string
  error?: string
  message?: string
}


type ShiprocketCourier = {
  courier_company_id?: number
  courier_name?: string

  rate?: number | string
  freight_charge?: number | string
  cod_charges?: number | string

  charge_weight?: number | string

  etd?: string
  estimated_delivery_days?: string

  rating?: number | string
}


type ShiprocketRateResponse = {
  status?: number | boolean

  message?: string
  error?: string

  data?: {
    available_courier_companies?: ShiprocketCourier[]
  }
}


/* ============================================================
   CREATE ORDER RESPONSE
============================================================ */

type ShiprocketCreateOrderResponse = {
  order_id?: number
  shipment_id?: number

  status?: string
  status_code?: number

  awb_code?: string | null
  courier_company_id?: number | null
  courier_name?: string | null

  message?: string
  error?: string
}


/* ============================================================
   AWB RESPONSE
============================================================ */

type ShiprocketAwbResponse = {
  awb_assign_status?: number | boolean

  response?: {
    data?: {
      courier_company_id?: number
      awb_code?: string
      order_id?: number
      shipment_id?: number
    }
  }

  message?: string
  error?: string
}


/* ============================================================
   PICKUP RESPONSE
============================================================ */

type ShiprocketPickupResponse = {
  pickup_status?: number | boolean

  response?: {
    pickup_scheduled_date?: string
    pickup_token_number?: string
    status?: number
    shipment_id?: number
    manifest_generated?: number | boolean
    manifest_url?: string
  }

  message?: string
  error?: string
}


/* ============================================================
   GET TOKEN
============================================================ */

export async function getShiprocketToken(): Promise<string> {
  const email =
    process.env.SHIPROCKET_EMAIL

  const password =
    process.env.SHIPROCKET_PASSWORD


  if (!email || !password) {
    throw new Error(
      'Shiprocket credentials are not configured.'
    )
  }


  const response =
    await fetch(
      AUTH_URL,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify({
            email,
            password,
          }),

        cache: 'no-store',
      }
    )


  let data:
    ShiprocketAuthResponse = {}


  try {
    data =
      (await response.json()) as
        ShiprocketAuthResponse
  } catch {
    throw new Error(
      'Shiprocket returned an invalid authentication response.'
    )
  }


  if (
    !response.ok ||
    !data.token
  ) {
    throw new Error(
      data.message ||
        data.error ||
        'Shiprocket authentication failed.'
    )
  }


  return data.token
}


/* ============================================================
   SHIPPING RATE
============================================================ */

export async function getShiprocketShippingRate({
  destinationPincode,
  weight,
  length,
  breadth,
  height,
  declaredValue,
  cod = 0,
}: {
  destinationPincode: string
  weight: number
  length?: number
  breadth?: number
  height?: number
  declaredValue?: number
  cod?: 0 | 1
}) {
  const pickupPincode =
    process.env.SHIPROCKET_PICKUP_PINCODE


  if (!pickupPincode) {
    throw new Error(
      'Shiprocket pickup pincode is not configured.'
    )
  }


  if (
    !/^\d{6}$/.test(
      pickupPincode
    )
  ) {
    throw new Error(
      'Shiprocket pickup pincode is invalid.'
    )
  }


  if (
    !/^\d{6}$/.test(
      destinationPincode
    )
  ) {
    throw new Error(
      'Destination pincode is invalid.'
    )
  }


  if (
    !Number.isFinite(weight) ||
    weight <= 0
  ) {
    throw new Error(
      'Invalid shipment weight.'
    )
  }


  const token =
    await getShiprocketToken()


  const params =
    new URLSearchParams()


  params.set(
    'pickup_postcode',
    pickupPincode
  )

  params.set(
    'delivery_postcode',
    destinationPincode
  )

  params.set(
    'weight',
    Math.max(
      0.5,
      weight
    ).toFixed(3)
  )

  params.set(
    'cod',
    cod === 1
      ? '1'
      : '0'
  )


  if (
    typeof length === 'number' &&
    length > 0
  ) {
    params.set(
      'length',
      String(
        Math.ceil(length)
      )
    )
  }


  if (
    typeof breadth === 'number' &&
    breadth > 0
  ) {
    params.set(
      'breadth',
      String(
        Math.ceil(breadth)
      )
    )
  }


  if (
    typeof height === 'number' &&
    height > 0
  ) {
    params.set(
      'height',
      String(
        Math.ceil(height)
      )
    )
  }


  if (
    typeof declaredValue === 'number' &&
    declaredValue > 0
  ) {
    params.set(
      'declared_value',
      String(
        Math.round(
          declaredValue
        )
      )
    )
  }


  const response =
    await fetch(
      `${SERVICEABILITY_URL}?${params.toString()}`,
      {
        method: 'GET',

        headers: {
          Authorization:
            `Bearer ${token}`,

          'Content-Type':
            'application/json',
        },

        cache: 'no-store',
      }
    )


  let data:
    ShiprocketRateResponse = {}


  try {
    data =
      (await response.json()) as
        ShiprocketRateResponse
  } catch {
    throw new Error(
      'Shiprocket returned an invalid shipping response.'
    )
  }


  if (!response.ok) {
    throw new Error(
      data.message ||
        data.error ||
        'Unable to calculate Shiprocket shipping.'
    )
  }


  const couriers =
    data.data
      ?.available_courier_companies ||
    []


  const usableCouriers =
    couriers.filter(
      courier =>
        Number.isFinite(
          Number(
            courier.rate
          )
        )
    )


  if (
    usableCouriers.length === 0
  ) {
    throw new Error(
      'No Shiprocket courier is available for this destination.'
    )
  }


  /*
    Use the cheapest available prepaid courier.
  */

  const selectedCourier =
    [...usableCouriers].sort(
      (a, b) =>
        Number(a.rate) -
        Number(b.rate)
    )[0]


  const shippingCharge =
    Number(
      selectedCourier.rate
    )


  return {
    shippingCharge,

    courier: {
      id:
        Number(
          selectedCourier
            .courier_company_id || 0
        ),

      name:
        selectedCourier.courier_name ||
        'Shiprocket Courier',

      etd:
        selectedCourier.etd ||
        null,

      estimatedDeliveryDays:
        selectedCourier
          .estimated_delivery_days ||
        null,

      rating:
        selectedCourier.rating != null
          ? Number(
              selectedCourier.rating
            )
          : null,

      chargeWeight:
        selectedCourier.charge_weight != null
          ? Number(
              selectedCourier.charge_weight
            )
          : null,
    },

    availableCouriers:
      usableCouriers.map(
        courier => ({
          id:
            Number(
              courier
                .courier_company_id || 0
            ),

          name:
            courier.courier_name ||
            'Courier',

          rate:
            Number(
              courier.rate
            ),

          chargeWeight:
            courier.charge_weight != null
              ? Number(
                  courier.charge_weight
                )
              : null,

          freightCharge:
            courier.freight_charge != null
              ? Number(
                  courier.freight_charge
                )
              : null,

          etd:
            courier.etd ||
            null,
        })
      ),
  }
}


/* ============================================================
   CREATE SHIPROCKET ORDER
============================================================ */

export async function createShiprocketOrder({
  orderId,
  orderDate,
  customer,
  items,
  subtotal,
  shippingCharge,
  total,
  packageDimensions,
  shipmentWeight,
  invoiceNumber,
}: {
  orderId: string
  orderDate: string

  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }

  items: Array<{
    name: string
    sku: string
    quantity: number
    price: number
  }>

  subtotal: number
  shippingCharge: number
  total: number

  packageDimensions: {
    length: number
    breadth: number
    height: number
  }

  shipmentWeight: number

  invoiceNumber?: string
}) {
  const pickupLocation =
    process.env.SHIPROCKET_PICKUP_LOCATION


  if (!pickupLocation) {
    throw new Error(
      'SHIPROCKET_PICKUP_LOCATION is not configured.'
    )
  }


  const token =
    await getShiprocketToken()


  /*
    Shiprocket requires an order id that has not
    already been used in Shiprocket.

    We use our local AMPM order id.
  */

  const body = {
    order_id:
      orderId,

    order_date:
      orderDate,

    pickup_location:
      pickupLocation,

    comment:
      'amtopm website order',

    billing_customer_name:
      customer.name,

    billing_last_name:
      '',

    billing_address:
      customer.address,

    billing_address_2:
      '',

    billing_city:
      customer.city,

    billing_pincode:
      customer.pincode,

    billing_state:
      customer.state,

    billing_country:
      'India',

    billing_email:
      customer.email,

    billing_phone:
      customer.phone,

    shipping_is_billing:
      true,

    shipping_customer_name:
      customer.name,

    shipping_last_name:
      '',

    shipping_address:
      customer.address,

    shipping_address_2:
      '',

    shipping_city:
      customer.city,

    shipping_pincode:
      customer.pincode,

    shipping_country:
      'India',

    shipping_state:
      customer.state,

    shipping_email:
      customer.email,

    shipping_phone:
      customer.phone,

    order_items:
      items.map(
        item => ({
          name:
            item.name,

          sku:
            item.sku,

          units:
            item.quantity,

          selling_price:
            item.price,

          discount:
            0,

          tax:
            0,

          hsn:
            '',
        })
      ),

    payment_method:
      'Prepaid',

    shipping_charges:
      shippingCharge,

    giftwrap_charges:
      0,

    transaction_charges:
      0,

    total_discount:
      0,

    sub_total:
      subtotal,

    length:
      packageDimensions.length,

    breadth:
      packageDimensions.breadth,

    height:
      packageDimensions.height,

    weight:
      shipmentWeight,

    invoice_number:
      invoiceNumber || '',
  }


  const response =
    await fetch(
      CREATE_ORDER_URL,
      {
        method: 'POST',

        headers: {
          Authorization:
            `Bearer ${token}`,

          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify(body),

        cache: 'no-store',
      }
    )


  let data:
    ShiprocketCreateOrderResponse =
      {}


  try {
    data =
      (await response.json()) as
        ShiprocketCreateOrderResponse
  } catch {
    throw new Error(
      'Shiprocket returned an invalid order response.'
    )
  }


  if (
    !response.ok ||
    !data.order_id ||
    !data.shipment_id
  ) {
    throw new Error(
      data.message ||
        data.error ||
        'Unable to create Shiprocket order.'
    )
  }


  return {
    shiprocketOrderId:
      data.order_id,

    shipmentId:
      data.shipment_id,

    courierName:
      data.courier_name ||
      null,

    status:
      data.status ||
      'NEW',
  }
}


/* ============================================================
   ASSIGN AWB
============================================================ */

export async function assignShiprocketAwb({
  shipmentId,
  courierId,
}: {
  shipmentId: number
  courierId?: number
}) {
  const token =
    await getShiprocketToken()


  const body: Record<
    string,
    number
  > = {
    shipment_id:
      shipmentId,
  }


  if (
    courierId &&
    courierId > 0
  ) {
    body.courier_id =
      courierId
  }


  const response =
    await fetch(
      ASSIGN_AWB_URL,
      {
        method: 'POST',

        headers: {
          Authorization:
            `Bearer ${token}`,

          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify(body),

        cache: 'no-store',
      }
    )


  let data:
    ShiprocketAwbResponse =
      {}


  try {
    data =
      (await response.json()) as
        ShiprocketAwbResponse
  } catch {
    throw new Error(
      'Shiprocket returned an invalid AWB response.'
    )
  }


  const awb =
    data.response?.data


  if (
    !response.ok ||
    !awb?.awb_code
  ) {
    throw new Error(
      data.message ||
        data.error ||
        'Unable to assign Shiprocket AWB.'
    )
  }


  return {
    awbCode:
      awb.awb_code,

    courierCompanyId:
      awb.courier_company_id,

    orderId:
      awb.order_id,

    shipmentId:
      awb.shipment_id,
  }
}


/* ============================================================
   GENERATE PICKUP
============================================================ */

export async function generateShiprocketPickup(
  shipmentId: number
) {
  const token =
    await getShiprocketToken()


  const response =
    await fetch(
      GENERATE_PICKUP_URL,
      {
        method: 'POST',

        headers: {
          Authorization:
            `Bearer ${token}`,

          'Content-Type':
            'application/json',
        },

        body:
          JSON.stringify({
            shipment_id: shipmentId,
            
          }),

        cache: 'no-store',
      }
    )


  let data:
    ShiprocketPickupResponse =
      {}


  try {
    data =
      (await response.json()) as
        ShiprocketPickupResponse
  } catch {
    throw new Error(
      'Shiprocket returned an invalid pickup response.'
    )
  }


  if (
    !response.ok ||
    !data.response
  ) {
    throw new Error(
      data.message ||
        data.error ||
        'Unable to generate Shiprocket pickup.'
    )
  }


  return {
    pickupScheduledDate:
      data.response
        .pickup_scheduled_date ||
      null,

    pickupToken:
      data.response
        .pickup_token_number ||
      null,

    status:
      data.response.status ??
      null,

    manifestGenerated:
      Boolean(
        data.response
          .manifest_generated
      ),

    manifestUrl:
      data.response.manifest_url ||
      null,
  }
}


/* ============================================================
   COMPLETE SHIPMENT FULFILLMENT
============================================================ */

export async function fulfillShiprocketOrder({
  orderId,
  orderDate,
  customer,
  items,
  subtotal,
  shippingCharge,
  total,
  packageDimensions,
  shipmentWeight,
  invoiceNumber,
  courierId,
}: {
  orderId: string
  orderDate: string

  customer: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }

  items: Array<{
    name: string
    sku: string
    quantity: number
    price: number
  }>

  subtotal: number
  shippingCharge: number
  total: number

  packageDimensions: {
    length: number
    breadth: number
    height: number
  }

  shipmentWeight: number

  invoiceNumber?: string

  courierId?: number
}) {
  const created =
    await createShiprocketOrder({
      orderId,
      orderDate,
      customer,
      items,
      subtotal,
      shippingCharge,
      total,
      packageDimensions,
      shipmentWeight,
      invoiceNumber,
    })


  const awb =
    await assignShiprocketAwb({
      shipmentId:
        created.shipmentId,

      courierId,
    })


  const pickup =
    await generateShiprocketPickup(
      created.shipmentId
    )


  return {
    ...created,

    awbCode:
      awb.awbCode,

    courierCompanyId:
      awb.courierCompanyId,

    pickupScheduledDate:
      pickup.pickupScheduledDate,

    pickupToken:
      pickup.pickupToken,

    pickupStatus:
      pickup.status,

    manifestGenerated:
      pickup.manifestGenerated,

    manifestUrl:
      pickup.manifestUrl,
  }
}