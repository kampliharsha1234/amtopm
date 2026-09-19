# amtopm Technical Overview

This document describes what the amtopm website currently does, what it depends on, what data it stores, which APIs it calls, and what is required to deploy it.

## 1. Executive Summary

amtopm is a Next.js ecommerce and skincare website with:

- Product browsing and product detail pages
- Skin quiz and product recommendations
- Shopping cart
- Pincode-based shipping calculation
- Authenticated checkout
- Razorpay payments
- Shiprocket shipping and fulfilment integration
- PDF invoice generation
- Transactional email through Resend
- Customer accounts and order history
- Password reset
- Product reviews
- Consultation requests
- Newsletter notifications
- Brand, science, shipping, returns, and terms content

Current persistence uses Prisma with MariaDB:

- **1 MariaDB database**
- **4 JSON files retained as migration backups**
- Static product catalog in TypeScript
- Cart and cookie consent in browser `localStorage`

For production, the application uses **1 MariaDB database** through Prisma, plus optional object storage for invoice files and media. Redis is optional for rate limiting and background jobs.

## 2. Technology Stack

| Area | Technology |
|---|---|
| Framework | Next.js `16.3.1` App Router |
| UI | React `19.2.8` |
| Language | TypeScript with strict mode |
| Styling | Tailwind CSS v4 and global CSS |
| Authentication | NextAuth credentials provider with JWT sessions |
| Password hashing | bcryptjs |
| Payments | Razorpay |
| Shipping | Shiprocket |
| Email | Resend |
| PDF invoices | PDFKit |
| Current persistence | Prisma with MariaDB; JSON files retained as backups |
| Browser persistence | `localStorage` |
| Runtime | Node.js server with writable filesystem |
| Package manager | npm |

Important scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## 3. Website Pages

| Route | Function |
|---|---|
| `/` | Homepage, hero content, product concerns, doctor reviews, before/after content, and calls to action |
| `/shop` | Product catalog, filters, and add-to-cart |
| `/shop/[id]` | Product detail, ingredients, usage, price, and reviews |
| `/cart` | Cart contents, quantity changes, item removal, pincode shipping quote, and checkout link |
| `/checkout` | Authenticated delivery form, pincode autofill, shipping quote, Razorpay payment, and order completion |
| `/quiz` | Skin-type and concern quiz with product recommendations |
| `/consultation` | Consultation form for name, phone, email, age, gender, problem, and description |
| `/account` | Authenticated account summary |
| `/orders` | Authenticated customer order history |
| `/auth/signin` | Sign in |
| `/auth/signup` | Account creation |
| `/auth/forgot-password` | Request password reset |
| `/auth/reset-password` | Complete password reset |
| `/science` | Skincare science and formulation information |
| `/about` | Brand information |
| `/support` | FAQ, routine guidance, and newsletter form |
| `/shipping` | Shipping policy |
| `/returns` | Returns and refunds policy |
| `/terms` | Terms and policy links |

The canonical production domain is `https://amtopm.net`. The sitemap and public robots configuration use this domain.

## 4. Internal API Endpoints

| Endpoint | Method | Purpose | Authentication |
|---|---:|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth credentials authentication and JWT session handling | NextAuth |
| `/api/auth/signup` | POST | Validate signup details, hash password, and create user | Public |
| `/api/auth/forgot-password` | POST | Create a time-limited reset token and email a reset link | Public |
| `/api/auth/reset-password` | POST | Validate and consume a reset token and update password | Public with token |
| `/api/create-order` | POST | Validate products, calculate authoritative totals, request Razorpay order, and save pending order | Authenticated |
| `/api/verify-payment` | POST | Verify Razorpay signature, mark order paid, generate invoice, email receipt, and create Shiprocket fulfilment | Authenticated |
| `/api/shipping-rate` | POST | Calculate package dimensions and request a Shiprocket delivery quote | Public |
| `/api/pincode` | GET | Look up Indian city and state from a six-digit pincode | Public; proxies PostalPincode |
| `/api/consultation` | POST | Validate consultation form and send internal/customer emails | Public |
| `/api/newsletter` | POST | Validate an email and send a newsletter notification | Public |
| `/api/reviews` | GET | Return reviews for a product | Public |
| `/api/reviews` | POST | Store a product review | Public |
| `/api/shiprocket-test` | GET | Test Shiprocket authentication | Development only; disabled in production |

## 5. External Services and APIs

### Razorpay

Used for payment order creation and browser checkout.

- Browser SDK: `https://checkout.razorpay.com/v1/checkout.js`
- Server creates Razorpay orders.
- Server verifies the payment signature using the Razorpay secret.
- Currency is INR.
- COD is not enabled.

Environment variables:

```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=public_browser_key
RAZORPAY_KEY_ID=server_key
RAZORPAY_KEY_SECRET=server_secret
```

Current limitation: there is no Razorpay webhook. If the browser closes after payment, the server has no independent payment reconciliation process.

### Shiprocket

Used for:

- Shipping rate/serviceability lookup
- Courier selection
- Order creation after payment
- AWB assignment
- Pickup-related fulfilment operations

Environment variables:

```env
SHIPROCKET_EMAIL=account_email
SHIPROCKET_PASSWORD=account_password
SHIPROCKET_PICKUP_PINCODE=warehouse_pincode
SHIPROCKET_PICKUP_LOCATION=warehouse_name
```

Important current issue: the fulfilment code currently sends repeated SKU values of `500`. Shiprocket can reject multi-product orders with `SKU cannot be repeated.` Each product needs a unique SKU configured in the product catalog and sent to Shiprocket.

### Resend

Used for:

- Password reset emails
- Order confirmation emails
- Invoice attachments
- Consultation notifications and confirmations
- Newsletter notification emails

Environment variables:

```env
RESEND_API_KEY=resend_api_key
RESEND_FROM_EMAIL=verified_sender_address
CONTACT_EMAIL=contact_recipient
ADMIN_EMAIL=admin_recipient
```

The sender domain/address must be verified in Resend. The newsletter currently sends a notification email but does not maintain a subscriber list or unsubscribe system.

### PostalPincode

Used by the checkout pincode lookup:

```text
https://api.postalpincode.in/pincode/{pincode}
```

No API key is currently required. It returns the district/city and state used to populate the checkout form.

## 6. Environment Variables

Production should configure all of the following:

```env
NEXTAUTH_URL=https://amtopm.net
NEXTAUTH_SECRET=long_random_secret

NEXT_PUBLIC_RAZORPAY_KEY_ID=public_razorpay_key
RAZORPAY_KEY_ID=razorpay_key
RAZORPAY_KEY_SECRET=razorpay_secret

SHIPROCKET_EMAIL=shiprocket_email
SHIPROCKET_PASSWORD=shiprocket_password
SHIPROCKET_PICKUP_PINCODE=pickup_pincode
SHIPROCKET_PICKUP_LOCATION=pickup_location

RESEND_API_KEY=resend_api_key
RESEND_FROM_EMAIL=verified_sender
CONTACT_EMAIL=contact_email
ADMIN_EMAIL=admin_email
```

Never commit `.env.local` or production secrets to Git. Use the hosting provider's environment-variable panel or a protected server-side environment file.

## 7. Current Data Storage

### `data/users.json`

Stores:

- User ID
- Name
- Email
- bcrypt password hash
- Account timestamps

### `data/password-resets.json`

Stores:

- Hashed reset token
- User ID
- Expiry timestamp
- Used flag

Reset tokens are intended to expire after 15 minutes and are stored as hashes rather than plain tokens.

### `data/orders.json`

Stores:

- Order ID and user ID
- Product IDs, names, prices, quantities, and SKU data
- Subtotal and shipping charge
- Shipping name, email, phone, address, city, state, and pincode
- Razorpay order/payment identifiers and status
- Invoice metadata
- Shiprocket status and identifiers
- Order status and timestamps

This file contains personally identifiable information and payment-related identifiers and must be protected from public web access.

### `data/reviews.json`

Stores:

- Product ID
- Reviewer name
- Rating
- Review body
- Review ID
- Timestamp

Reviews are currently publicly submittable without authentication, purchase verification, moderation, or rate limiting.

### Static product data

`app/data/products.ts` contains:

- Product names and descriptions
- Prices
- Product IDs and SKUs
- Ingredients and usage
- Product images
- Skin concerns and skin types
- Weight and package dimensions
- In-stock flag

The `inStock` value is informational only. There is no inventory reservation or stock decrement system.

### Browser storage

The browser stores:

- Cart contents under `cart`
- Cookie consent under `cookie-consent`

## 8. Recommended Production Database Design

The current app needs no database to run in its present single-server prototype form. It uses four JSON files instead.

For a real production store, use **one MariaDB database** with tables such as:

1. `users`
2. `password_reset_tokens`
3. `products`
4. `product_variants` or `product_skus`
5. `inventory`
6. `orders`
7. `order_items`
8. `payments`
9. `payment_events`
10. `shipments`
11. `shipment_events`
12. `invoices`
13. `reviews`
14. `newsletter_subscriptions`
15. `consultation_requests`
16. `audit_logs`
17. `idempotency_keys`

This is still **one database**, not seventeen separate databases. These are tables inside the same MariaDB database.

Recommended additional services:

- Object storage for invoice PDFs and uploaded media
- Redis for rate limiting, temporary locks, and job queues
- Background worker for emails, Shiprocket fulfilment, retries, and reconciliation

## 9. Authentication Flow

1. User signs up through `/api/auth/signup`.
2. Password is hashed with bcrypt and stored in the MariaDB `User` table.
3. NextAuth validates credentials during sign in.
4. NextAuth issues a JWT session.
5. Account, order history, order creation, and payment verification check the session.
6. Password reset uses a random token. Only its SHA-256 hash is stored.
7. The reset token expires and is marked used after completion.

There is currently no role or admin authorization system. `ADMIN_EMAIL` only controls email delivery; it does not grant admin access.

## 10. Checkout and Order Flow

1. Customer adds products to the browser cart.
2. Customer enters a pincode.
3. City and state are looked up through `/api/pincode`.
4. Shipping details are sent to `/api/shipping-rate`.
5. The server calculates package weight and dimensions and asks Shiprocket for a quote.
6. The client submits product IDs, quantities, and delivery details to `/api/create-order`.
7. The server looks up products and ignores client-provided prices.
8. The server calculates the authoritative subtotal and shipping amount.
9. The server creates a Razorpay order and stores a pending local order.
10. The browser opens Razorpay checkout.
11. The browser sends payment identifiers to `/api/verify-payment`.
12. The server verifies the Razorpay signature.
13. The order is marked paid/confirmed.
14. A PDF invoice is generated in memory using PDFKit.
15. Confirmation emails are sent with the invoice attached.
16. A Shiprocket order is created and an AWB is requested.
17. Shiprocket failures are recorded but do not undo a successful payment.

## 11. Invoice and Email Behavior

- Invoices are generated with PDFKit in the server process.
- Invoice metadata is stored with the order.
- The PDF is attached to email as base64.
- The PDF is not permanently stored in object storage.
- The invoice table does not display the SKU column.
- The invoice currently uses product price data to derive taxable and GST values.
- Formal tax fields such as seller GSTIN, HSN/SAC, tax jurisdiction, and legal invoice configuration are not currently implemented.

## 12. Hosting Requirements

The application requires:

- Node.js `20+`
- `npm install` or `npm ci`
- `npm run build`
- `npm run start`
- A persistent Node.js process
- MariaDB connectivity for Prisma
- HTTPS
- Environment variables
- DNS control for `amtopm.net`
- Outbound HTTPS access to Razorpay, Shiprocket, Resend, and PostalPincode

It should not be deployed as a static-only website because it requires server-side Prisma and external service integrations. The JSON files are retained as backups and are not runtime persistence.

Basic deployment commands:

```bash
npm ci
npm run build
npm run start
```

For a long-running Linux server, use the hosting provider's Node.js application manager or a process manager such as PM2.

DNS should point the domain to the server, and production configuration should use:

```env
NEXTAUTH_URL=https://amtopm.net
```

SSL should cover both `amtopm.net` and `www.amtopm.net` if both will be used.

## 13. Important Production Risks

### Data and scalability

- JSON read-modify-write operations are not atomic.
- Concurrent signups, orders, reviews, or password resets can overwrite each other.
- Multiple server instances cannot safely share these JSON files.
- JSON files contain passwords hashes, addresses, phone numbers, and payment identifiers.
- There is no database backup, migration, transaction, or audit system.

### Payments and fulfilment

- There is no Razorpay webhook or reconciliation process.
- A browser interruption can leave a valid payment without completed fulfilment.
- Payment verification side effects are not fully idempotent.
- Duplicate callbacks could create duplicate emails, invoices, or Shiprocket orders.
- There is no refund, cancellation, retry, or admin fulfilment workflow.
- Shiprocket currently has duplicate SKU risk.

### Public endpoints

- Consultation and newsletter endpoints have no rate limiting or CAPTCHA.
- Reviews are public and have no moderation or purchase verification.
- `/api/shiprocket-test` should not remain publicly accessible in production.

### Input and email safety

- Several public inputs need stronger length and format validation.
- User-submitted values in consultation and newsletter email HTML should be escaped correctly.
- The checkout email is not required to match the authenticated account email.

### Business functionality

- Inventory is not reserved or decremented.
- Pending orders are not expired or cleaned up.
- Newsletter subscriptions are not persisted.
- Consultation requests are not persisted.
- There is no admin dashboard.

## 14. Recommended Launch Sequence

1. Choose a Hosting.com plan with Node.js 20+ and MariaDB connectivity.
2. Standardize the canonical domain as `https://amtopm.net`.
3. Add all production environment variables.
4. Configure DNS and SSL.
5. Fix unique product SKUs for Shiprocket.
6. Restrict or remove `/api/shiprocket-test`.
7. Test signup, sign in, password reset, shipping quote, test payment, invoice email, and fulfilment.
8. Add a Razorpay webhook and idempotent payment processing.
9. Run `npm run db:migrate` and then `npm run db:migrate-json` before accepting production traffic.
10. Add backups, monitoring, rate limiting, and an admin fulfilment workflow.

## 15. Source Locations

- Pages: `app/**/page.tsx`
- API routes: `app/api/**/route.ts`
- Products: `app/data/products.ts`
- Cart: `app/context/CartContext.tsx`
- Users: `lib/users.ts`
- Orders: `lib/orders.ts`
- Reviews: `lib/reviews.ts`
- Shipping: `lib/shiprocket.ts`
- Email: `lib/email.ts` and `lib/email/**`
- Invoice: `lib/invoice.ts`
- JSON data: `data/*.json`
- Runtime configuration: `package.json`, `next.config.ts`, `tsconfig.json`
