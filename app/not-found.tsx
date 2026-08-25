import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="text-center max-w-lg mx-auto">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="section-heading text-center">Page Not Found</h1>
        <p className="body-text mt-3">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/shop" className="btn-secondary">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  )
}