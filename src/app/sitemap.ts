import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://referrals.kud.io',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}