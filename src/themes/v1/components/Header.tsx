'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { navigation, siteConfig } from '@/data/siteData'

interface HeaderProps {
  variant?: 'dark' | 'light'
}

const Header = ({ variant = 'dark' }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = navigation.items

  const textColor = 'text-white'
  const textHoverColor = 'hover:text-white/70'
  const buttonBg = 'bg-white text-black hover:bg-white/90'
  const mobileMenuBg = 'bg-black'
  const mobileBorder = 'border-white/10'
  const headerBg = isScrolled ? 'bg-black shadow-md' : 'bg-black'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerBg}`}>
      <div className="max-w-container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/logo.svg" alt={siteConfig.podcastName} className="h-12 md:h-14 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href.startsWith('#') ? `/${item.href}` : item.href}
              className={`text-base font-medium ${textColor} ${textHoverColor} transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Subscribe Button */}
        <div className="hidden md:flex items-center">
          <Link
            href={navigation.ctaHref.startsWith('#') ? `/${navigation.ctaHref}` : navigation.ctaHref}
            className={`px-6 py-2.5 rounded-lg text-base font-semibold ${buttonBg} transition-all`}
          >
            {navigation.ctaText}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 ${textColor}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className={`md:hidden ${mobileMenuBg} border-t ${mobileBorder} py-6 px-6 flex flex-col gap-6 shadow-xl`}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href.startsWith('#') ? `/${item.href}` : item.href}
              className={`text-lg font-medium ${textColor}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={navigation.ctaHref.startsWith('#') ? `/${navigation.ctaHref}` : navigation.ctaHref}
            className={`flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold ${buttonBg}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {navigation.ctaText}
          </Link>
        </div>
      )}
    </header>
  )
}

export default Header
