import path from 'path'

import PDFDocument from 'pdfkit'

import { Order } from './orders'

type PDFDoc = InstanceType<typeof PDFDocument>


/* ============================================================
   TAX INFORMATION

   GST is derived from:
   inclusive product price - exclusive product price

   No GST percentage or HSN is fabricated.
============================================================ */

const TAX_CONFIG = {
  notes:
    "GST amounts are calculated from each product's configured inclusive and exclusive prices.",
}


/* ============================================================
   PAGE
============================================================ */

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89

const MARGIN_X = 42
const FOOTER_TOP = 760

const CONTENT_WIDTH =
  PAGE_WIDTH -
  MARGIN_X * 2


/* ============================================================
   COLORS
============================================================ */

const COLORS = {
  cream: '#F9F5F0',
  creamDark: '#F3EDE5',
  white: '#FFFFFF',
  black: '#171717',
  muted: '#6B6B6B',
  mutedLight: '#8A837B',
  orange: '#E85D2C',
  border: '#E5DDD3',
  softBorder: '#EEE7DF',
}


/* ============================================================
   HELPERS
============================================================ */

function formatCurrency(
  value: number
) {
  return `INR ${Number(
    value || 0
  ).toLocaleString(
    'en-IN',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`
}


function formatDate(
  value: string
) {
  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return '—'
  }

  return date.toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  )
}


function sanitizeFilename(
  value: string
) {
  return value.replace(
    /[\\/:*?"<>|]/g,
    '-'
  )
}


function drawRoundedBox(
  doc: PDFDoc,
  x: number,
  y: number,
  width: number,
  height: number,
  fill = COLORS.white
) {
  doc
    .roundedRect(
      x,
      y,
      width,
      height,
      9
    )
    .fillColor(fill)
    .strokeColor(
      COLORS.border
    )
    .lineWidth(1)
    .fillAndStroke()
}


function drawSectionLabel(
  doc: PDFDoc,
  text: string,
  x: number,
  y: number
) {
  doc
    .font('Helvetica-Bold')
    .fontSize(7.5)
    .fillColor(
      COLORS.orange
    )
    .text(
      text.toUpperCase(),
      x,
      y,
      {
        characterSpacing: 0.7,
      }
    )
}


/* ============================================================
   HEADER
============================================================ */

function drawHeader(
  doc: PDFDoc,
  invoiceNumber: string,
  invoiceDate: string
) {
  const headerHeight = 76

  doc
    .fillColor(
      COLORS.creamDark
    )
    .rect(
      0,
      0,
      PAGE_WIDTH,
      headerHeight
    )
    .fill()

  doc
    .fillColor(
      COLORS.orange
    )
    .rect(
      0,
      headerHeight,
      PAGE_WIDTH,
      3
    )
    .fill()


  const logoPath =
    path.join(
      process.cwd(),
      'public',
      'images',
      'logo.png'
    )


  try {
    doc.image(
      logoPath,
      MARGIN_X,
      14,
      {
        fit: [
          140,
          46,
        ],
      }
    )
  } catch {
    doc
      .font(
        'Helvetica-Bold'
      )
      .fontSize(24)
      .fillColor(
        COLORS.black
      )
      .text(
        'amtopm',
        MARGIN_X,
        24
      )
  }


  const rightWidth = 225

  const rightX =
    PAGE_WIDTH -
    MARGIN_X -
    rightWidth


  doc
    .font(
      'Helvetica-Bold'
    )
    .fontSize(11.5)
    .fillColor(
      COLORS.black
    )
    .text(
      'TAX INVOICE',
      rightX,
      16,
      {
        width:
          rightWidth,
        align:
          'right',
      }
    )


  doc
    .font('Helvetica')
    .fontSize(7.8)
    .fillColor(
      COLORS.muted
    )
    .text(
      `Invoice no: ${invoiceNumber}`,
      rightX,
      35,
      {
        width:
          rightWidth,
        align:
          'right',
      }
    )


  doc
    .text(
      `Date: ${invoiceDate}`,
      rightX,
      47,
      {
        width:
          rightWidth,
        align:
          'right',
      }
    )


  doc
    .fontSize(7.2)
    .text(
      'Skincare for morning & night',
      rightX,
      60,
      {
        width:
          rightWidth,
        align:
          'right',
      }
    )
}


/* ============================================================
   SELLER / CUSTOMER PANELS
============================================================ */

function drawInfoPanel(
  doc: PDFDoc,
  x: number,
  y: number,
  width: number,
  title: string,
  rows: Array<{
    label: string
    value: string
  }>
) {
  const height = 146
  const padding = 13

  drawRoundedBox(
    doc,
    x,
    y,
    width,
    height
  )


  drawSectionLabel(
    doc,
    title,
    x + padding,
    y + 12
  )


  const labelWidth = 63

  let currentY =
    y + 29


  rows.forEach(
    row => {

      doc
        .font('Helvetica-Bold')
        .fontSize(7.1)
        .fillColor(
          COLORS.muted
        )
        .text(
          row.label,
          x + padding,
          currentY,
          {
            width:
              labelWidth,
            height: 11,
          }
        )


      doc
        .font('Helvetica')
        .fontSize(7.5)
        .fillColor(
          COLORS.black
        )
        .text(
          row.value || '—',
          x +
            padding +
            labelWidth,
          currentY,
          {
            width:
              width -
              padding * 2 -
              labelWidth,
            height: 19,
            lineGap: 0.5,
            ellipsis: true,
          }
        )


      currentY += 17
    }
  )


  return height
}


/* ============================================================
   ORDER META
============================================================ */

function drawOrderMeta(
  doc: PDFDoc,
  order: Order,
  y: number
) {
  const height = 58

  drawRoundedBox(
    doc,
    MARGIN_X,
    y,
    CONTENT_WIDTH,
    height,
    COLORS.cream
  )


  drawSectionLabel(
    doc,
    'Order details',
    MARGIN_X + 13,
    y + 9
  )


  const fields = [
    {
      label: 'Order ID',
      value:
        order.id,
    },
    {
      label: 'Razorpay order',
      value:
        order.payment
          .razorpayOrderId,
    },
    {
      label: 'Razorpay payment',
      value:
        order.payment
          .razorpayPaymentId ||
        'Not available',
    },
    {
      label: 'Order date',
      value:
        formatDate(
          order.createdAt
        ),
    },
    {
      label: 'Payment method',
      value:
        'Prepaid',
    },
    {
      label: 'Payment status',
      value:
        order.payment.status ===
        'paid'
          ? 'Paid'
          : 'Pending',
    },
  ]


  const gap = 10

  const cellWidth =
    (
      CONTENT_WIDTH -
      26 -
      gap * 2
    ) / 3


  const rows = [
    fields.slice(0, 3),
    fields.slice(3, 6),
  ]


  rows.forEach(
    (
      row,
      rowIndex
    ) => {

      row.forEach(
        (
          field,
          columnIndex
        ) => {

          const cellX =
            MARGIN_X +
            13 +
            columnIndex *
              (
                cellWidth +
                gap
              )

          const cellY =
            y +
            (
              rowIndex === 0
                ? 25
                : 43
            )


          doc
            .font(
              'Helvetica'
            )
            .fontSize(6.3)
            .fillColor(
              COLORS.muted
            )
            .text(
              field.label,
              cellX,
              cellY,
              {
                width:
                  cellWidth,
                height: 8,
              }
            )


          doc
            .font(
              'Helvetica-Bold'
            )
            .fontSize(7)
            .fillColor(
              COLORS.black
            )
            .text(
              field.value || '—',
              cellX,
              cellY + 8,
              {
                width:
                  cellWidth,
                height: 10,
                ellipsis: true,
              }
            )
        }
      )
    }
  )


  return height
}


/* ============================================================
   PRODUCT TABLE
============================================================ */

function drawProductTable(
  doc: PDFDoc,
  order: Order,
  y: number
) {
  const x = MARGIN_X
  const width = 495

  /*
    495 total width exactly.

    IMPORTANT:
    No column gaps are added outside these widths.
  */

  const columns = [
    {
      label: 'Product',
      width: 200,
      align: 'left' as const,
    },
    {
      label: 'SKU',
      width: 48,
      align: 'center' as const,
    },
    {
      label: 'Qty',
      width: 35,
      align: 'center' as const,
    },
    {
      label: 'Taxable Value',
      width: 82,
      align: 'right' as const,
    },
    {
      label: 'GST',
      width: 57,
      align: 'right' as const,
    },
    {
      label: 'Line Total',
      width: 73,
      align: 'right' as const,
    },
  ]


  const calculatedWidth =
    columns.reduce(
      (
        sum,
        column
      ) =>
        sum +
        column.width,
      0
    )


  if (
    calculatedWidth !==
    width
  ) {
    throw new Error(
      `Invoice table width mismatch: ${calculatedWidth} !== ${width}`
    )
  }


  const headerHeight = 24


  /* ==========================================================
     HEADER
  ========================================================== */

  doc
    .fillColor(
      COLORS.creamDark
    )
    .rect(
      x,
      y,
      width,
      headerHeight
    )
    .fill()


  doc
    .strokeColor(
      COLORS.border
    )
    .lineWidth(1)
    .rect(
      x,
      y,
      width,
      headerHeight
    )
    .stroke()


  let currentX =
    x


  columns.forEach(
    column => {

      doc
        .font(
          'Helvetica-Bold'
        )
        .fontSize(7.1)
        .fillColor(
          COLORS.black
        )
        .text(
          column.label,
          currentX + 5,
          y + 8,
          {
            width:
              column.width -
              10,
            align:
              column.align,
          }
        )


      currentX +=
        column.width
    }
  )


  let currentY =
    y +
    headerHeight


  /* ==========================================================
     ROWS
  ========================================================== */

  order.items.forEach(
    (item, index) => {

      const productName =
        item.name ||
        'Product'


      const unitPrice =
        Number(
          item.price || 0
        )


      /*
        priceExcludingGst comes from the
        authoritative product database.

        If an older order doesn't have it,
        fall back to unit price rather than
        inventing a tax amount.
      */

      const taxableUnitPrice =
        item.priceExcludingGst != null
          ? Number(
              item.priceExcludingGst
            )
          : unitPrice


      const gstPerUnit =
        Math.max(
          0,
          unitPrice -
            taxableUnitPrice
        )


      const taxableValue =
        taxableUnitPrice *
        item.quantity


      const gstAmount =
        gstPerUnit *
        item.quantity


      const lineTotal =
        unitPrice *
        item.quantity


      doc
        .font('Helvetica')
        .fontSize(8)


      const productHeight =
        doc.heightOfString(
          productName,
          {
            width:
              columns[0].width -
              12,
            lineGap: 1,
          }
        )


      const rowHeight =
        Math.max(
          30,
          productHeight + 12
        )


      const fill =
        index % 2 === 0
          ? COLORS.white
          : COLORS.cream


      doc
        .fillColor(fill)
        .rect(
          x,
          currentY,
          width,
          rowHeight
        )
        .fill()


      doc
        .strokeColor(
          COLORS.softBorder
        )
        .lineWidth(0.7)
        .moveTo(
          x,
          currentY +
            rowHeight
        )
        .lineTo(
          x + width,
          currentY +
            rowHeight
        )
        .stroke()


      let cellX =
        x


      /* Product */

      doc
        .font('Helvetica')
        .fontSize(8)
        .fillColor(
          COLORS.black
        )
        .text(
          productName,
          cellX + 6,
          currentY + 8,
          {
            width:
              columns[0].width -
              12,
            lineGap: 1,
          }
        )


      cellX +=
        columns[0].width


      /* SKU */

      doc
        .font('Helvetica')
        .fontSize(7.5)
        .fillColor(
          COLORS.black
        )
        .text(
          item.sku ||
            item.productId ||
            '—',
          cellX + 4,
          currentY + 9,
          {
            width:
              columns[1].width -
              8,
            align:
              'center',
          }
        )


      cellX +=
        columns[1].width


      /* Qty */

      doc
        .font('Helvetica')
        .fontSize(7.8)
        .fillColor(
          COLORS.black
        )
        .text(
          String(
            item.quantity
          ),
          cellX + 3,
          currentY + 9,
          {
            width:
              columns[2].width -
              6,
            align:
              'center',
          }
        )


      cellX +=
        columns[2].width


      /* Taxable */

      doc
        .font('Helvetica')
        .fontSize(7.4)
        .fillColor(
          COLORS.black
        )
        .text(
          formatCurrency(
            taxableValue
          ),
          cellX + 4,
          currentY + 9,
          {
            width:
              columns[3].width -
              8,
            align:
              'right',
          }
        )


      cellX +=
        columns[3].width


      /* GST */

      doc
        .font('Helvetica')
        .fontSize(7.4)
        .fillColor(
          COLORS.black
        )
        .text(
          formatCurrency(
            gstAmount
          ),
          cellX + 4,
          currentY + 9,
          {
            width:
              columns[4].width -
              8,
            align:
              'right',
          }
        )


      cellX +=
        columns[4].width


      /* Line total */

      doc
        .font(
          'Helvetica-Bold'
        )
        .fontSize(7.6)
        .fillColor(
          COLORS.black
        )
        .text(
          formatCurrency(
            lineTotal
          ),
          cellX + 4,
          currentY + 9,
          {
            width:
              columns[5].width -
              8,
            align:
              'right',
          }
        )


      currentY +=
        rowHeight
    }
  )


  /*
    Outer border.
  */

  doc
    .strokeColor(
      COLORS.border
    )
    .lineWidth(1)
    .rect(
      x,
      y,
      width,
      currentY - y
    )
    .stroke()


  return currentY
}


/* ============================================================
   TOTALS
============================================================ */

function drawTotals(
  doc: PDFDoc,
  order: Order,
  y: number
) {
  const width = 250

  const x =
    PAGE_WIDTH -
    MARGIN_X -
    width

  const height = 108


  drawRoundedBox(
    doc,
    x,
    y,
    width,
    height
  )


  const taxableSubtotal =
    order.items.reduce(
      (
        sum,
        item
      ) => {

        const taxableUnitPrice =
          item.priceExcludingGst != null
            ? Number(
                item.priceExcludingGst
              )
            : Number(
                item.price || 0
              )

        return (
          sum +
          taxableUnitPrice *
            item.quantity
        )
      },
      0
    )


  const gstTotal =
    order.items.reduce(
      (
        sum,
        item
      ) => {

        const unitPrice =
          Number(
            item.price || 0
          )

        const taxableUnitPrice =
          item.priceExcludingGst != null
            ? Number(
                item.priceExcludingGst
              )
            : unitPrice

        const gstPerUnit =
          Math.max(
            0,
            unitPrice -
              taxableUnitPrice
          )

        return (
          sum +
          gstPerUnit *
            item.quantity
        )
      },
      0
    )


  const productSubtotal =
    order.items.reduce(
      (
        sum,
        item
      ) =>
        sum +
        Number(
          item.price || 0
        ) *
        item.quantity,
      0
    )


  const shipping =
    Number(
      order.shippingCharge ||
      0
    )


  const grandTotal =
    Number(
      order.total ||
      0
    )


  const labelX =
    x + 14

  const valueX =
    x + 126

  const valueWidth =
    width - 140


  const drawAmountRow = (
    label: string,
    value: number,
    rowY: number,
    bold = false
  ) => {

    doc
      .font(
        bold
          ? 'Helvetica-Bold'
          : 'Helvetica'
      )
      .fontSize(
        bold
          ? 8.7
          : 8
      )
      .fillColor(
        COLORS.black
      )
      .text(
        label,
        labelX,
        rowY,
        {
          width: 105,
        }
      )


    doc
      .text(
        formatCurrency(
          value
        ),
        valueX,
        rowY,
        {
          width:
            valueWidth,
          align:
            'right',
        }
      )
  }


  drawAmountRow(
    'Taxable subtotal',
    taxableSubtotal,
    y + 13
  )


  drawAmountRow(
    'GST',
    gstTotal,
    y + 29
  )


  drawAmountRow(
    'Product subtotal',
    productSubtotal,
    y + 45
  )


  drawAmountRow(
    'Shipping',
    shipping,
    y + 61
  )


  doc
    .strokeColor(
      COLORS.border
    )
    .lineWidth(1)
    .moveTo(
      labelX,
      y + 78
    )
    .lineTo(
      x +
        width -
        14,
      y + 78
    )
    .stroke()


  drawAmountRow(
    'Grand total',
    grandTotal,
    y + 88,
    true
  )


  return height
}


/* ============================================================
   PAYMENT + LOGISTICS
============================================================ */

function drawPaymentAndLogistics(
  doc: PDFDoc,
  order: Order,
  y: number
) {
  const gap = 14

  const leftWidth = 240

  const rightWidth =
    CONTENT_WIDTH -
    leftWidth -
    gap

  const height = 70


  /* PAYMENT */

  drawRoundedBox(
    doc,
    MARGIN_X,
    y,
    leftWidth,
    height,
    COLORS.cream
  )


  drawSectionLabel(
    doc,
    'Payment',
    MARGIN_X + 14,
    y + 11
  )


  doc
    .font('Helvetica')
    .fontSize(8.3)
    .fillColor(
      COLORS.black
    )
    .text(
      'Method: Prepaid',
      MARGIN_X + 14,
      y + 30
    )


  const status =
    order.payment.status ===
    'paid'
      ? 'PAID'
      : 'PENDING'


  doc
    .font('Helvetica')
    .fontSize(8.3)
    .fillColor(
      COLORS.black
    )
    .text(
      `Status: ${status}`,
      MARGIN_X + 14,
      y + 47
    )


  const badgeWidth =
    status === 'PAID'
      ? 42
      : 59


  const badgeX =
    MARGIN_X +
    leftWidth -
    badgeWidth -
    14


  doc
    .roundedRect(
      badgeX,
      y + 30,
      badgeWidth,
      19,
      9.5
    )
    .fillColor(
      COLORS.orange
    )
    .fill()


  doc
    .font(
      'Helvetica-Bold'
    )
    .fontSize(7)
    .fillColor(
      COLORS.white
    )
    .text(
      status,
      badgeX,
      y + 36,
      {
        width:
          badgeWidth,
        align:
          'center',
      }
    )


  /* LOGISTICS */

  const rightX =
    MARGIN_X +
    leftWidth +
    gap


  drawRoundedBox(
    doc,
    rightX,
    y,
    rightWidth,
    height,
    COLORS.cream
  )


  drawSectionLabel(
    doc,
    'Logistics',
    rightX + 14,
    y + 11
  )


  const weight =
    (
      order.shipmentWeight ??
      0
    ).toFixed(2)


  const dimensions =
    order.packageDimensions
      ? `${order.packageDimensions.length} × ${order.packageDimensions.breadth} × ${order.packageDimensions.height} cm`
      : 'Not available'


  doc
    .font('Helvetica')
    .fontSize(7.8)
    .fillColor(
      COLORS.black
    )
    .text(
      `Package weight: ${weight} kg`,
      rightX + 14,
      y + 29,
      {
        width:
          rightWidth - 28,
      }
    )


  doc
    .text(
      `Dimensions: ${dimensions}`,
      rightX + 14,
      y + 44,
      {
        width:
          rightWidth - 28,
      }
    )


  doc
    .fontSize(7.2)
    .fillColor(
      COLORS.muted
    )
    .text(
      'Shipping partner: Shiprocket',
      rightX + 14,
      y + 58,
      {
        width:
          rightWidth - 28,
      }
    )
}


/* ============================================================
   TAX NOTE
============================================================ */

function drawTaxNote(
  doc: PDFDoc,
  y: number
) {
  doc
    .font('Helvetica')
    .fontSize(6.7)
    .fillColor(
      COLORS.mutedLight
    )
    .text(
      TAX_CONFIG.notes,
      MARGIN_X,
      y,
      {
        width:
          CONTENT_WIDTH,
      }
    )
}


/* ============================================================
   FOOTER
============================================================ */

function drawFooter(
  doc: PDFDoc
) {
  const y =
    FOOTER_TOP


  doc
    .strokeColor(
      COLORS.border
    )
    .lineWidth(1)
    .moveTo(
      MARGIN_X,
      y
    )
    .lineTo(
      PAGE_WIDTH -
        MARGIN_X,
      y
    )
    .stroke()


  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor(
      COLORS.muted
    )
    .text(
      'Thank you for choosing amtopm.',
      MARGIN_X,
      y + 12
    )


  doc
    .fontSize(7.2)
    .text(
      'amtopmformulation@gmail.com  •  7795995110  •  www.amtopm.net',
      MARGIN_X,
      y + 28,
      {
        width:
          CONTENT_WIDTH - 110,
      }
    )


  doc
    .fontSize(7)
    .text(
      `amtopm © ${new Date().getFullYear()}`,
      MARGIN_X,
      y + 43
    )
}


/* ============================================================
   PUBLIC HELPERS
============================================================ */

export function buildInvoiceFilename(
  invoiceNumber?: string
) {
  const safeInvoice =
    sanitizeFilename(
      invoiceNumber ||
        'invoice'
    )

  return `amtopm-invoice-${safeInvoice}.pdf`
}


export function getInvoiceTaxSummary() {
  return TAX_CONFIG
}


/* ============================================================
   GENERATE PDF
============================================================ */

export async function generateInvoicePdf(
  order: Order
): Promise<Buffer> {

  const invoiceNumber =
    order.invoice?.invoiceNumber ||
    'AMPM-PENDING'


  const invoiceDate =
    formatDate(
      order.invoice?.generatedAt ||
        order.createdAt
    )


  const pdfBuffer =
    await new Promise<Buffer>(
      (
        resolve,
        reject
      ) => {

        const chunks: Buffer[] = []


        const doc =
          new PDFDocument({
            size: 'A4',
            margin: 0,
            autoFirstPage: true,
          })


        doc.on(
          'data',
          (
            chunk: Buffer
          ) => {
            chunks.push(
              Buffer.from(
                chunk
              )
            )
          }
        )


        doc.on(
          'end',
          () => {
            resolve(
              Buffer.concat(
                chunks
              )
            )
          }
        )


        doc.on(
          'error',
          reject
        )


        /* ====================================================
           BACKGROUND
        ==================================================== */

        doc
          .fillColor(
            COLORS.cream
          )
          .rect(
            0,
            0,
            PAGE_WIDTH,
            PAGE_HEIGHT
          )
          .fill()


        /* ====================================================
           HEADER
        ==================================================== */

        drawHeader(
          doc,
          invoiceNumber,
          invoiceDate
        )


        /* ====================================================
           SELLER / CUSTOMER
        ==================================================== */

        const infoY = 98

        const gap = 14

        const panelWidth =
          (
            CONTENT_WIDTH -
            gap
          ) / 2


        drawInfoPanel(
          doc,
          MARGIN_X,
          infoY,
          panelWidth,
          'Seller / Bill From',
          [
            {
              label: 'Brand',
              value:
                'amtopm',
            },
            {
              label:
                'Owner / entity',
              value:
                'Veetarag Kasar',
            },
            {
              label:
                'Address',
              value:
                'Kalpadrum Arcade, 4th floor, CTS 1966, Kore Galli, Shahapur, Belgavi - 590003',
            },
            {
              label:
                'GSTIN',
              value:
                '29KTZPK4478J2Z9',
            },
            {
              label:
                'Email',
              value:
                'amtopmformulation@gmail.com',
            },
            {
              label:
                'Phone',
              value:
                '7795995110',
            },
          ]
        )


        drawInfoPanel(
          doc,
          MARGIN_X +
            panelWidth +
            gap,
          infoY,
          panelWidth,
          'Bill To',
          [
            {
              label: 'Name',
              value:
                order.shipping.name,
            },
            {
              label: 'Email',
              value:
                order.shipping.email,
            },
            {
              label: 'Phone',
              value:
                order.shipping.phone,
            },
            {
              label: 'Address',
              value:
                order.shipping.address,
            },
            {
              label: 'City',
              value:
                order.shipping.city,
            },
            {
              label: 'State',
              value:
                order.shipping.state,
            },
            {
              label: 'Pincode',
              value:
                order.shipping.pincode,
            },
          ]
        )


        /* ====================================================
           ORDER META
        ==================================================== */

        const metaY =
          infoY +
          146 +
          10


        drawOrderMeta(
          doc,
          order,
          metaY
        )


        /* ====================================================
           PRODUCT TABLE
        ==================================================== */

        const tableY =
          metaY +
          58 +
          12


        const tableEndY =
          drawProductTable(
            doc,
            order,
            tableY
          )


        /* ====================================================
           TOTALS
        ==================================================== */

        const totalsY =
          tableEndY +
          10


        drawTotals(
          doc,
          order,
          totalsY
        )


        /* ====================================================
           PAYMENT / LOGISTICS
        ==================================================== */

        const lowerY =
          totalsY +
          118


        drawPaymentAndLogistics(
          doc,
          order,
          lowerY
        )


        /* ====================================================
           TAX NOTE
        ==================================================== */

        drawTaxNote(
          doc,
          lowerY +
            82
        )


        /* ====================================================
           FOOTER
        ==================================================== */

        drawFooter(
          doc
        )


        doc.end()
      }
    )


  return pdfBuffer
}


/* ============================================================
   INVOICE FILENAME FROM ORDER
============================================================ */

export function invoiceFileNameFromOrder(
  order: Order
) {
  const invoiceNumber =
    order.invoice?.invoiceNumber ||
    order.id

  return buildInvoiceFilename(
    invoiceNumber
  )
}