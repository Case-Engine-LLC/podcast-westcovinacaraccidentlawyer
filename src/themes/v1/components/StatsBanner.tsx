'use client'

import React from 'react'
import { Star, ThumbsUp, Briefcase } from 'lucide-react'
import { stats } from '@/data/siteData'

const StatsBanner = () => {
  return (
    <section className="bg-white py-0 md:py-12">
      <div className="max-w-container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1: Rating */}
          <div className="bg-secondary rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <span className="text-white text-4xl md:text-6xl font-bold">{stats.rating}</span>
              <Star size={56} className="text-white" fill="currentColor" />
            </div>
            <p className="text-white text-xl md:text-2xl font-bold mb-3">Positive Reviews</p>
            <p className="text-white/85 text-sm md:text-base leading-relaxed">{stats.ratingVerbalization}</p>
          </div>

          {/* Card 2: Satisfaction */}
          <div className="bg-primary rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <span className="text-secondary text-4xl md:text-6xl font-bold">{stats.satisfactionRate}%</span>
              <ThumbsUp size={56} className="text-secondary" fill="currentColor" />
            </div>
            <p className="text-white text-xl md:text-2xl font-bold mb-3">{stats.satisfactionLabel}</p>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">{stats.satisfactionVerbalization}</p>
          </div>

          {/* Card 3: Cases */}
          <div className="bg-secondary rounded-3xl px-6 py-8 md:px-5 md:py-10 text-left">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <span className="text-white text-4xl md:text-6xl font-bold">{stats.casesHandled}+</span>
              <Briefcase size={56} className="text-white" />
            </div>
            <p className="text-white text-xl md:text-2xl font-bold mb-3">{stats.casesLabel}</p>
            <p className="text-white/85 text-sm md:text-base leading-relaxed">{stats.casesVerbalization}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsBanner
