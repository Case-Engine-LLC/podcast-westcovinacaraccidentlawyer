'use client'

import React from 'react'
import { Star, ThumbsUp, Briefcase } from 'lucide-react'
import { stats } from '@/data/siteData'

const isPublishable = (text: string | undefined | null): text is string =>
  !!text && text.trim() !== '' && !text.trim().startsWith('TODO')

type StatCard = {
  key: string
  value: string
  label: string
  verb: string
  bg: string
  valueColor: string
  iconColor: string
  bodyColor: string
  icon: React.ReactNode
  iconFill?: boolean
}

const StatsBanner = () => {
  const cards: StatCard[] = []

  if (stats.rating && Number(stats.rating) > 0) {
    cards.push({
      key: 'rating',
      value: String(stats.rating),
      label: 'Positive Reviews',
      verb: isPublishable(stats.ratingVerbalization) ? stats.ratingVerbalization : '',
      bg: 'bg-secondary',
      valueColor: 'text-white',
      iconColor: 'text-white',
      bodyColor: 'text-white/85',
      icon: <Star size={56} className="text-white" fill="currentColor" />,
    })
  }

  if (stats.satisfactionRate && Number(stats.satisfactionRate) > 0 && stats.satisfactionLabel) {
    cards.push({
      key: 'satisfaction',
      value: `${stats.satisfactionRate}%`,
      label: stats.satisfactionLabel,
      verb: isPublishable(stats.satisfactionVerbalization) ? stats.satisfactionVerbalization : '',
      bg: 'bg-primary',
      valueColor: 'text-secondary',
      iconColor: 'text-secondary',
      bodyColor: 'text-white/80',
      icon: <ThumbsUp size={56} className="text-secondary" fill="currentColor" />,
    })
  }

  if (stats.casesHandled && Number(stats.casesHandled) > 0 && stats.casesLabel) {
    cards.push({
      key: 'cases',
      value: `${stats.casesHandled}+`,
      label: stats.casesLabel,
      verb: isPublishable(stats.casesVerbalization) ? stats.casesVerbalization : '',
      bg: 'bg-secondary',
      valueColor: 'text-white',
      iconColor: 'text-white',
      bodyColor: 'text-white/85',
      icon: <Briefcase size={56} className="text-white" />,
    })
  }

  if (cards.length === 0) return null

  const gridCols =
    cards.length === 1 ? 'sm:grid-cols-1 md:grid-cols-1' :
    cards.length === 2 ? 'sm:grid-cols-2 md:grid-cols-2' :
    'sm:grid-cols-2 md:grid-cols-3'

  return (
    <section className="bg-white py-0 md:py-12">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
          {cards.map(card => (
            <div key={card.key} className={`${card.bg} rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left`}>
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <span className={`${card.valueColor} text-4xl md:text-6xl font-bold`}>{card.value}</span>
                {card.icon}
              </div>
              <p className="text-white text-xl md:text-2xl font-bold mb-3">{card.label}</p>
              {card.verb && (
                <p className={`${card.bodyColor} text-sm md:text-base leading-relaxed`}>{card.verb}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
