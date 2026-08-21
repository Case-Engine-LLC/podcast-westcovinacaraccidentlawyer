import type { Metadata } from 'next'
import V1EpisodePage from '@/themes/v1/pages/V1EpisodePage'
import { getAllEpisodes, getEpisodeByIdOrSlug, getEpisodeTranscript } from '@/lib/data'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const episode = await getEpisodeByIdOrSlug(id)

  if (!episode) {
    return { title: 'Episode Not Found' }
  }

  const description = episode.description.length > 200
    ? episode.description.slice(0, 200) + '...'
    : episode.description
  const canonicalPath = `/episode/${episode.slug ?? episode.id}`

  // Bare episode title — the layout's title template appends the podcast name.
  // Without this whole function every /episode/* URL fell back to the layout
  // default: the site title and a canonical pointing at the home page.
  return {
    title: episode.title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: episode.title,
      description,
      url: canonicalPath,
      type: 'article',
      ...(episode.logo ? { images: [{ url: episode.logo, alt: episode.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: episode.title,
      description,
      ...(episode.logo ? { images: [episode.logo] } : {}),
    },
  }
}

export async function generateStaticParams() {
  try {
    const episodes = await getAllEpisodes()
    return episodes.map(ep => ({ id: ep.slug ?? String(ep.id) }))
  } catch {
    return []
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const allEpisodes = await getAllEpisodes()
  const episode = await getEpisodeByIdOrSlug(id)
  const transcript = episode ? await getEpisodeTranscript(episode) : []

  return (
    <V1EpisodePage
      episodeId={id}
      episode={episode}
      allEpisodes={allEpisodes}
      transcript={transcript}
    />
  )
}
