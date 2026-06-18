'use client'

import React from 'react'
import { Car, MessageSquare, Star, ThumbsUp } from 'lucide-react'
import { stats } from '@/data/siteData'

// Pull a leading metric token (e.g. "$8M") out of a label so the real
// number is the hero, with the remaining words as the caption.
const splitLeadingMetric = (label?: string) => {
  const m = /^(\$?[\d.,]+\s*[KMB]?\+?)\s+(.+)$/i.exec((label || '').trim())
  return m ? { value: m[1].replace(/\s+/g, ''), label: m[2] } : null
}

const StatsBanner = () => {
  const recovery = splitLeadingMetric(stats.casesLabel)

  const tiles = [
    stats.rating
      ? { value: String(stats.rating), label: 'Average Rating', Icon: Star }
      : null,
    stats.reviewCount
      ? { value: String(stats.reviewCount), label: 'Client Reviews', Icon: MessageSquare }
      : null,
    stats.satisfactionRate && stats.satisfactionLabel
      ? { value: `${stats.satisfactionRate}%`, label: stats.satisfactionLabel, Icon: ThumbsUp }
      : null,
    recovery && stats.casesVerbalization && !/TODO/i.test(stats.casesVerbalization)
      ? { value: recovery.value, label: recovery.label, Icon: Car, outline: true }
      : stats.casesHandled && stats.casesLabel
        ? { value: String(stats.casesHandled), label: stats.casesLabel, Icon: Car, outline: true }
        : null,
  ].filter(
    (t): t is { value: string; label: string; Icon: typeof Star; outline?: boolean } => Boolean(t),
  )

  if (tiles.length === 0) {
    return null
  }

  const colsClass =
    tiles.length <= 2
      ? 'grid-cols-2 max-w-2xl'
      : tiles.length === 3
        ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl'
        : 'grid-cols-2 lg:grid-cols-4 max-w-5xl'

  const footnote = [stats.ratingVerbalization, stats.satisfactionVerbalization, stats.casesVerbalization]
    .filter((t) => t && t.trim() && !/TODO/i.test(t))
    .join('  ·  ')

  return (
    <section className="relative overflow-hidden bg-primary py-10 md:py-14">
      {/* depth + accent ambience */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#1c2659] via-primary to-[#0d1338]" />
      <div aria-hidden className="absolute -right-20 -top-28 h-96 w-96 rounded-full bg-secondary/15 blur-[110px]" />
      <div aria-hidden className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-secondary/10 blur-[120px]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="relative mx-auto max-w-container px-6 md:px-12">
        <div className={`mx-auto grid ${colsClass} gap-x-6 gap-y-12`}>
          {tiles.map(({ value, label, Icon, outline }) => (
            <div key={label} className="group flex flex-col items-center text-center">
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/15 text-secondary ring-1 ring-secondary/30 transition-colors duration-300 group-hover:bg-secondary group-hover:text-primary">
                {outline ? (
                  <Icon size={26} strokeWidth={2} />
                ) : (
                  <Icon size={24} fill="currentColor" strokeWidth={0} />
                )}
              </div>
              <span className="text-5xl font-extrabold leading-none tracking-tight text-secondary tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5 md:text-6xl">
                {value}
              </span>
              <span className="mt-3 text-sm font-semibold uppercase tracking-wide text-white/80 md:text-base">
                {label}
              </span>
            </div>
          ))}
        </div>

        {footnote && (
          <>
            <div className="mx-auto mt-14 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/45">
              {footnote}
            </p>
          </>
        )}
      </div>
    </section>
  )
}

export default StatsBanner
