import { fetchPodcastFeed, fetchTranscript as fetchRssTranscript, type RSSEpisode, type TranscriptSegment } from './rss'
import { generatedTranscripts } from '@/data/transcripts.generated'
import { episodes as staticEpisodes, siteConfig } from '@/data/siteData'

// Prefer env var (Vercel project setting), fall back to siteData.rssFeedUrl
// so the build still has a wired feed if the env var is not set.
const RSS_URL = process.env.PODCAST_RSS_URL || (siteConfig as { rssFeedUrl?: string })?.rssFeedUrl || undefined

export function slugifyEpisode(title: string, fallback: string = 'episode'): string {
  if (!title) return fallback
  const s = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return s.slice(0, 80) || fallback
}
export const REVALIDATE = parseInt(process.env.REVALIDATE_SECONDS || '3600', 10)

function sanitizeLglGuaranteeCopy(s: string): string {
  if (!s) return s
  return s
    .replace(
      /No recovery\s*\/\s*no fee\.\s*Fee never exceeds your recovery\.\s*30-day cancellation guarantee\.?/gi,
      'No recovery / no fee. When Lem Garcia Law handles the case, attorney fees paid to LGL are never more than the amount the client receives at the end.'
    )
    .replace(
      /fee never exceeds your recovery/gi,
      'attorney fees paid to LGL are never more than the amount the client receives at the end'
    )
    .replace(
      /fee never more than your recovery/gi,
      'attorney fees paid to LGL are never more than the amount the client receives at the end'
    )
    .replace(/\s*30-day cancellation guarantee\.?/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export interface Episode {
  id: number
  slug?: string
  number: number
  title: string
  subtitle: string
  description: string
  duration: string
  date: string
  category: string
  featured: boolean
  topic: string
  concepts: string[]
  chapters: string[]
  logo: string
  audioUrl?: string
  audioType?: string
  transcriptUrl?: string | null
  transcriptType?: string | null
  youtubeUrl?: string
}

function rssEpisodeToEpisode(ep: RSSEpisode): Episode {
  return {
    id: ep.id,
    slug: slugifyEpisode(ep.title, String(ep.id)),
    number: ep.id,
    title: ep.title,
    subtitle: ep.subtitle,
    description: sanitizeLglGuaranteeCopy(ep.description),
    duration: ep.duration,
    date: ep.date,
    category: ep.category,
    featured: ep.featured,
    topic: ep.topic,
    concepts: ep.concepts,
    chapters: ep.chapters,
    logo: ep.logo,
    audioUrl: ep.audioUrl || undefined,
    audioType: ep.audioType || undefined,
    transcriptUrl: ep.transcriptUrl,
    transcriptType: ep.transcriptType,
  }
}

function normalizeStaticEpisode(ep: Record<string, unknown>): Episode {
  return {
    id: (ep.id as number) ?? 1,
    slug: (ep.slug as string) || slugifyEpisode((ep.title as string) || '', String((ep.id as number) ?? 1)),
    number: (ep.number as number) ?? (ep.id as number) ?? 1,
    title: (ep.title as string) ?? '',
    subtitle: (ep.subtitle as string) ?? '',
    description: sanitizeLglGuaranteeCopy((ep.description as string) ?? ''),
    duration: (ep.duration as string) ?? '',
    date: (ep.date as string) ?? '',
    category: (ep.category as string) ?? '',
    featured: (ep.featured as boolean) ?? false,
    topic: (ep.topic as string) ?? '',
    concepts: (ep.concepts as string[]) ?? [],
    chapters: (ep.chapters as string[]) ?? [],
    logo: (ep.logo as string) ?? '',
    audioUrl: (ep.audioUrl as string) ?? undefined,
    audioType: (ep.audioType as string) ?? undefined,
    transcriptUrl: (ep.transcriptUrl as string) ?? null,
    transcriptType: (ep.transcriptType as string) ?? null,
    youtubeUrl: (ep.youtubeUrl as string) ?? undefined,
  }
}

let feedCache: { episodes: Episode[]; fetchedAt: number } | null = null

export async function getAllEpisodes(): Promise<Episode[]> {
  // Only surface episodes that actually have audio. Placeholder/unreleased
  // entries in static data have no audioUrl and would render dead play buttons
  // on episode lists and detail pages, so we filter them out here at the source.
  const onlyReleased = (eps: Episode[]) => eps.filter(ep => Boolean(ep.audioUrl))

  if (!RSS_URL) {
    return onlyReleased((staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode))
  }

  // Simple in-memory cache for same request cycle
  if (feedCache && Date.now() - feedCache.fetchedAt < 30_000) {
    return feedCache.episodes
  }

  try {
    const feed = await fetchPodcastFeed(RSS_URL)
    const episodes = onlyReleased(feed.episodes.map(rssEpisodeToEpisode))
    feedCache = { episodes, fetchedAt: Date.now() }
    return episodes
  } catch (e) {
    console.error('RSS fetch failed, falling back to static data:', e)
    return onlyReleased((staticEpisodes as Record<string, unknown>[]).map(normalizeStaticEpisode))
  }
}

export async function getEpisodeById(id: number): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find(ep => ep.id === id) ?? null
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  return episodes.find(ep => ep.slug === slug) ?? null
}

export async function getEpisodeByIdOrSlug(idOrSlug: string): Promise<Episode | null> {
  const episodes = await getAllEpisodes()
  const bySlug = episodes.find(ep => ep.slug === idOrSlug)
  if (bySlug) return bySlug
  const n = Number(idOrSlug)
  if (Number.isFinite(n)) return episodes.find(ep => ep.id === n) ?? null
  return null
}

export async function getEpisodeTranscript(episode: Episode): Promise<TranscriptSegment[]> {
  if (!RSS_URL) {
    return generatedTranscripts[episode.id] ?? []
  }

  if (episode.transcriptUrl && episode.transcriptType) {
    const segments = await fetchRssTranscript(episode.transcriptUrl, episode.transcriptType)
    if (segments.length > 0) return segments
  }

  // Serve the staged transcript for ANY episode that has one (was gated to ep1).
  return generatedTranscripts[episode.id] ?? []
}

export async function getEpisodeTopics(episodes: Episode[]): Promise<string[]> {
  const topics = new Set<string>(['All'])
  episodes.forEach(ep => {
    if (ep.topic) topics.add(ep.topic)
  })
  return Array.from(topics)
}
