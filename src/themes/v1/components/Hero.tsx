'use client'

import React from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import FeaturedEpisodePlayer from './FeaturedEpisodePlayer'
import { siteConfig, episode, content } from '@/data/siteData'
import type { Episode } from '@/lib/data'

const isRealLink = (url?: string | null): url is string =>
  !!url && url.trim() !== '' && url.trim() !== '#'

interface HeroProps {
  latestEpisode?: Episode | null
}

const Hero = ({ latestEpisode }: HeroProps) => {
  const ep = latestEpisode ?? episode

  const appleHref = siteConfig.platformLinks.apple
  const spotifyHref = siteConfig.platformLinks.spotify
  const showApple = isRealLink(appleHref)
  const showSpotify = isRealLink(spotifyHref)
  const showSubscribeRow = showApple || showSpotify

  return (
    <>
    <section className="hero-section relative pt-[4rem] md:pt-[6rem] pb-12 md:pb-0 md:h-[90vh]">
      {/* Hero Background Image - indexable - Desktop */}
      <figure className="hidden md:block absolute inset-0 z-0 m-0">
        <img
          src="/hero-placeholder.jpg"
          alt={content.heroTitle}
          className="w-full h-full object-cover object-[center_right]"
        />
      </figure>

      {/* Hero Background Image - Mobile/Tablet */}
      <figure className="md:hidden absolute inset-0 z-0 m-0">
        <img
          src="/hero-placeholder.jpg"
          alt={content.heroTitle}
          className="w-full h-full object-cover object-center"
        />
      </figure>

      {/* Marquee Banner */}
      <div className="relative z-[1] bg-secondary py-3 md:py-4 overflow-hidden whitespace-nowrap -rotate-[2deg] transform origin-center">
        <div className="flex animate-marquee">
          <span className="text-black font-bold uppercase tracking-[0.3em] text-xs md:text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-black font-bold uppercase tracking-[0.3em] text-xs md:text-sm inline-block">
            {siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;{siteConfig.tagline}&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-[1] max-w-container mx-auto px-4 md:px-12 pt-6 md:pt-12 pb-0 md:pb-12">
        {/* Text Content */}
        <div className="md:w-[55%] pb-6 md:pb-16 text-center md:text-left">
          {/* Heading */}
          <h1 className="text-[2.25rem] leading-[1.2] md:text-5xl font-bold md:leading-tighter text-white mb-3 md:mb-4">
            {content.heroTitle}
          </h1>

          {/* Description */}
          <p className="text-sm md:text-lg text-white/80 leading-relaxed mb-5 md:mb-8 max-w-xl mx-auto md:mx-0">
            {content.heroDescription}
          </p>

          {/* Available On Buttons */}
          <div id="listen" className="flex flex-row gap-2 md:gap-4 items-center justify-center md:justify-start scroll-mt-24">
            {showApple && (
            <a
              href={appleHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Apple Podcasts"
              className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
            >
              <img
                src="/badges/listen-on-apple-podcasts.svg"
                alt="Listen on Apple Podcasts"
                className="h-10 md:h-12 w-auto"
              />
            </a>
            )}

            {showSpotify && (
            <a
              href={spotifyHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Listen on Spotify"
              className="inline-block transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-md"
            >
              <img
                src="/badges/listen-on-spotify.svg"
                alt="Listen on Spotify"
                className="h-10 md:h-12 w-auto"
              />
            </a>
            )}

            {!showSubscribeRow && (
              <p className="text-sm md:text-base text-white/60 italic">Subscribe links coming soon.</p>
            )}
          </div>
        </div>

      </div>
    </section>

    {/* Featured Episode Player - Outside hero with negative margin */}
    <div className="relative z-10 -mt-8 md:-mt-16">
      <div className="max-w-container mx-auto px-4 md:px-12">
        <FeaturedEpisodePlayer
          episodeNumber={String(ep.number)}
          title={ep.title}
          description={ep.description}
          duration={ep.duration}
          episodeLink={`/episode/${(ep as { slug?: string; number?: number }).slug ?? ep.number ?? 1}`}
          imageUrl={(latestEpisode as { logo?: string } | null | undefined)?.logo || undefined}
          audioUrl={(latestEpisode as { audioUrl?: string } | null | undefined)?.audioUrl || undefined}
        />
      </div>
    </div>
    </>
  )
}

export default Hero
