import { MetadataRoute } from 'next'
import { products } from './data/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amtopm.com'

  // Static pages
  const staticPages = [
    '',
    '/shop',
    '/quiz',
    '/science',
    '/school',
    '/about',
    '/support',
    '/cart',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/shop/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages]
}