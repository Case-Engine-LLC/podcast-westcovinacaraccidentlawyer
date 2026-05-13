'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { footer, episodes as episodesData } from '@/data/siteData'

const XIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.677l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const epList = (episodesData as Array<{ id: number | string; number?: number; title: string }>).map(ep => ({
    name: `Episode ${ep.number ?? ep.id}: ${(ep.title || '').split(':')[0]}`,
    href: `/episode/${ep.id}`,
  }))

  return (
    <footer className="bg-[#0a0a1a] text-white">
      {/* Marquee Section */}
      <div className="py-12 md:py-16 overflow-hidden">
        <div className="flex animate-marquee-fast">
          <span className="font-extrabold text-white whitespace-nowrap" style={{ fontSize: 'clamp(4rem, 8vw, 12.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01
          </span>
          <span className="font-extrabold text-white whitespace-nowrap ml-8" style={{ fontSize: 'clamp(4rem, 8vw, 12.5rem)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01 SEASON 01
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Logo & Social */}
          <div>
            <div className="mb-6">
              <img src="/logo.svg" alt={footer.logo} className="h-14 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
              {footer.description}
            </p>
            <div className="flex items-center gap-4">
              <Link href={footer.socialLinks.twitter} className="hover:opacity-70 transition-opacity">
                <XIcon size={20} className="text-white" />
              </Link>
              <Link href={footer.socialLinks.linkedin} className="hover:opacity-70 transition-opacity">
                <Linkedin size={20} className="text-white" />
              </Link>
              <Link href={footer.socialLinks.facebook} className="hover:opacity-70 transition-opacity">
                <Facebook size={20} className="text-white" />
              </Link>
              <Link href={footer.socialLinks.instagram} className="hover:opacity-70 transition-opacity">
                <Instagram size={20} className="text-white" />
              </Link>
              <Link href={footer.socialLinks.youtube} className="hover:opacity-70 transition-opacity">
                <Youtube size={20} className="text-white" />
              </Link>
            </div>
          </div>

          {/* Right Column - Episodes */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Episodes</h3>
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              {epList.map((episode, index) => (
                <Link
                  key={index}
                  href={episode.href}
                  className="text-base text-white/80 hover:text-white transition-colors"
                >
                  {episode.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-6 md:px-12 py-6">
          <p className="text-sm text-white/60 text-center">
            © {currentYear} {footer.copyright}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
