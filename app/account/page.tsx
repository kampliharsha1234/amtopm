import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <main className="min-h-screen bg-[#F7F2EB] px-5 py-12 sm:px-8 md:px-12">
      <div className="mx-auto w-full max-w-4xl">

        <div className="border border-[#E8DFD3] bg-[#FBF8F3] p-6 sm:p-8">

          <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#E85D2C]">
            AM:PM ACCOUNT
          </p>

          <h1 className="mt-3 font-serif text-[42px] leading-none tracking-[-0.045em] sm:text-[54px]">
            My Account
          </h1>

          <div className="mt-8 border-t border-[#E8DFD3] pt-6 space-y-4">

            <div>
              <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                Name
              </p>

              <p className="mt-1 text-[12px] font-medium">
                {session.user.name ?? '—'}
              </p>
            </div>

            <div>
              <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                Email
              </p>

              <p className="mt-1 text-[12px] font-medium">
                {session.user.email ?? '—'}
              </p>
            </div>

            <div>
              <p className="text-[8px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
                Member since
              </p>

              <p className="mt-1 text-[12px] font-medium">
                Today
              </p>
            </div>

          </div>

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              href="/shop"
              className="btn-primary"
            >
              Continue Shopping
            </Link>

            <Link
              href="/orders"
              className="btn-secondary"
            >
              My Orders
            </Link>

          </div>

        </div>

      </div>
    </main>
  )
}