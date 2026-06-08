import type { MetadataRoute } from 'next'
import { siteConfig, authorProfiles } from '@/data/siteData'
import { getAllEpisodes } from '@/lib/data'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.podcastUrl
  const now = new Date()

  // Use the live feed episodes (same source the pages render from) so the sitemap
  // lists every published episode, not just the static siteData fallback. Falls back
  // to the static list automatically when the feed is unavailable (see getAllEpisodes).
  const episodes = await getAllEpisodes()

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...Object.keys(authorProfiles).map((slug) => ({
      url: `${base}/author/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...episodes.map((ep) => ({
      url: `${base}/episode/${ep.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
