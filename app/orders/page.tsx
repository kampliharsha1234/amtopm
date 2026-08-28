import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { authOptions } from '../api/auth/[...nextauth]/route'
import { getOrdersByUserId } from '../../lib/orders'

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const orders = getOrdersByUserId(session.user.id)

  return (
    <main className="min-h-screen bg-[#F7F2EB] pt-24 sm:pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        <Link
          href="/account"
          className="text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition"
        >
          ← Back to Account
        </Link>

        <div className="mt-5 mb-8">
          <p className="text-xs uppercase tracking-[0.18em] text-[#E85D2C]">
            AM:PM ACCOUNT
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold text-[#171717] mt-1">
            My Orders
          </h1>

          <p className="text-sm text-[#6B6B6B] mt-2">
            View your AM:PM order history.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm">
            <div className="text-4xl mb-4">
              🛍️
            </div>

            <h2 className="text-xl font-semibold text-[#171717]">
              No orders yet
            </h2>

            <p className="text-sm text-[#6B6B6B] mt-2">
              Your completed orders will appear here.
            </p>

            <Link
              href="/shop"
              className="btn-primary inline-flex mt-6"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >

                <div className="p-5 sm:p-6 border-b border-[#E8DFD3]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>
                      <p className="text-xs text-[#6B6B6B]">
                        Order
                      </p>

                      <p className="font-semibold text-[#171717] mt-0.5">
                        #{order.id}
                      </p>

                      <p className="text-xs text-[#6B6B6B] mt-1">
                        {new Date(order.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1.5 rounded-full bg-[#E8F4E8] text-xs font-medium text-[#3D7040] capitalize">
                        {order.status}
                      </span>

                      <span className="px-3 py-1.5 rounded-full bg-[#FCE6D9] text-xs font-medium text-[#E85D2C]">
                        {order.payment.status === 'paid'
                          ? 'Paid'
                          : 'Payment pending'}
                      </span>
                    </div>

                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {order.items.map(item => (
                    <div
                      key={item.productId}
                      className="flex gap-4"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F7F2EB] overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#171717]">
                          {item.name}
                        </p>

                        <p className="text-xs text-[#6B6B6B] mt-1">
                          ₹{item.price.toLocaleString('en-IN')}
                          {' × '}
                          {item.quantity}
                        </p>

                        <p className="text-sm font-medium text-[#171717] mt-1">
                          ₹{(
                            item.price * item.quantity
                          ).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8DFD3] p-5 sm:p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6B6B6B]">
                      Order Total
                    </span>

                    <span className="text-xl font-semibold text-[#171717]">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="text-sm text-[#6B6B6B] hover:text-[#E85D2C] transition"
          >
            Continue Shopping →
          </Link>
        </div>

      </div>
    </main>
  )
}