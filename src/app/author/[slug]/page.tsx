import { Metadata } from 'next'
import V1AuthorPage from '@/themes/v1/pages/V1AuthorPage'
import { authorProfiles } from '@/data/siteData'

export async function generateStaticParams() {
  return Object.keys(authorProfiles).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const author = authorProfiles[slug]
  if (!author) return { title: 'Author Not Found' }

  const canonicalPath = `/author/${slug}`

  return {
    title: `${author.name} — ${author.title}`,
    description: author.bio[0],
    // Self-referential canonical. Without it the layout's `canonical: '/'`
    // is inherited and every author page declares itself a duplicate of home.
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      url: canonicalPath,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <V1AuthorPage slug={slug} />
}
