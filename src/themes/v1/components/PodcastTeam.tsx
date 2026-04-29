'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { podcastTeam } from '@/data/siteData'

const PodcastTeam = () => {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  const teamMembers = podcastTeam.map(member => ({
    name: member.name,
    title: member.role,
    image: member.photo,
    bio: member.bio,
    slug: member.slug,
  }))

  const nextSlide = () => {
    setDirection('right')
    setCurrentSlide((prev) => (prev + 1) % teamMembers.length)
  }

  const prevSlide = () => {
    setDirection('left')
    setCurrentSlide((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  const handleAuthorClick = (slug: string) => {
    router.push(`/author/${slug}`)
  }

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
      <section className="relative bg-primary pt-20 md:pt-28 pb-16 md:pb-20 overflow-hidden">
      {/* Section header */}
      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12 text-center mb-10 md:mb-14">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-px bg-secondary" />
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-secondary">
            The Team
          </span>
          <div className="w-12 h-px bg-secondary" />
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Behind the Podcast
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container mx-auto px-6 md:px-12">
        {/* Mobile Slider */}
        <div className="md:hidden relative">
          <div className="w-full flex justify-center items-end relative overflow-hidden">
            <img
              key={currentSlide}
              src={teamMembers[currentSlide].image}
              alt={teamMembers[currentSlide].name}
              className="w-full h-auto object-contain"
              style={{
                animation: direction === 'right'
                  ? 'slideInRight 0.5s ease-out'
                  : 'slideInLeft 0.5s ease-out'
              }}
            />

            {/* Card */}
            <div
              onClick={() => handleAuthorClick(teamMembers[currentSlide].slug)}
              className="absolute bottom-20 left-4 right-4 bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={teamMembers[currentSlide].image}
                    alt={teamMembers[currentSlide].name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                      {teamMembers[currentSlide].name}
                    </h3>
                    <p className="text-xs text-gray-600">{teamMembers[currentSlide].title}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    // TODO: Navigate to episodes page
                  }}
                  className="bg-secondary hover:bg-secondary-hover text-white text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap"
                >
                  All Episodes
                </button>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">{teamMembers[currentSlide].bio}</p>
            </div>
          </div>

          {/* Navigation Arrows - Stay in place outside animated content */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-20">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-black hover:bg-gray-800 text-white flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className={`hidden md:grid gap-6 ${teamMembers.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-2'}`}>
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full flex justify-center items-end relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto object-contain"
              />

              {/* Card */}
              <div
                onClick={() => handleAuthorClick(member.slug)}
                className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl shadow-lg p-5 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.title}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // TODO: Navigate to episodes page
                    }}
                    className="bg-secondary hover:bg-secondary-hover text-white text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap"
                  >
                    All Episodes
                  </button>
                </div>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default PodcastTeam
