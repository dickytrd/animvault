'use client'

import { useState, useEffect, useRef } from 'react'

export function FloatingNav({ animations }) {
  const [activeId, setActiveId] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const navContainerRef = useRef(null)
    const [isNavScrolling, setIsNavScrolling] = useState(false)

  // 🎯 Auto-hide scrollbar when inactive
  useEffect(() => {
    const nav = navContainerRef.current
    if (!nav || !mounted) return

    let timeout
    const handleScroll = () => {
      setIsNavScrolling(true)
      clearTimeout(timeout)
      timeout = setTimeout(() => setIsNavScrolling(false), 800) // Hide after 800ms
    }

    nav.addEventListener('scroll', handleScroll)
    return () => {
      nav.removeEventListener('scroll', handleScroll)
      clearTimeout(timeout)
    }
  }, [mounted])

  // Wait for mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // 🎯 Auto-scroll active item into view (with delay for DOM readiness)
  useEffect(() => {
    if (!activeId || !navContainerRef.current || !mounted) return

    const timer = setTimeout(() => {
      const activeButton = navContainerRef.current?.querySelector(`[data-nav-id="${activeId}"]`)
      
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest',
        })
      }
    }, 150) // Delay 150ms untuk pastikan DOM update selesai

    return () => clearTimeout(timer)
  }, [activeId, mounted])

  // Intersection Observer dengan retry
  useEffect(() => {
    if (!mounted) return

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-animation-id')
          if (id) setActiveId(id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    const observeSections = () => {
      const sections = document.querySelectorAll('[data-animation-id]')
      sections.forEach((section) => observer.observe(section))
      return sections.length
    }

    let attempt = 0
    const maxAttempts = 5
    const tryObserve = () => {
      const count = observeSections()
      if (count === 0 && attempt < maxAttempts) {
        attempt++
        setTimeout(tryObserve, attempt * 200)
      }
    }

    setTimeout(tryObserve, 100)

    const mutationObserver = new MutationObserver(() => {
      const sections = document.querySelectorAll('[data-animation-id]')
      if (sections.length > 0) {
        sections.forEach((section) => observer.observe(section))
      }
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [mounted])

    // 🎯 NEW: Clear active state when at top (hero section)
  useEffect(() => {
    const handleScroll = () => {
      // If scroll position is near top (< 100px), clear active state
      if (window.scrollY < 100) {
        setActiveId(null)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Check initial position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll ke section
  const scrollToSection = (id) => {
    const element = document.getElementById(id) || document.querySelector(`[data-animation-id="${id}"]`)
    
    if (element) {
      const rect = element.getBoundingClientRect()
      const offsetTop = window.scrollY + rect.top - 100
      
      window.scrollTo({ top: offsetTop, behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const currentIndex = animations.findIndex((a) => a.id === activeId)
        const nextIndex = e.key === 'ArrowDown'
          ? Math.min(currentIndex + 1, animations.length - 1)
          : Math.max(currentIndex - 1, 0)
        scrollToSection(animations[nextIndex].id)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeId, animations])

  const getShortLabel = (label) => {
    const words = label.split('—')
    if (words[0]) return words[0].trim()
    return label.length > 15 ? label.substring(0, 15) + '…' : label
  }

  if (!mounted) return null

  return (
    <>
      {/* Progress Bar */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '3px',
          height: `${scrollProgress}%`,
          background: 'var(--accent)',
          zIndex: 101,
          transition: 'height 0.1s ease',
        }}
      />

      {/* Floating Navigation */}
      <nav
        ref={navContainerRef}
        className={`floating-nav ${isNavScrolling ? 'scrolling' : ''}`}
        data-lenis-prevent
        style={{
          position: 'fixed',
          right: '24px',
          top: 'auto',
          bottom: '32px',
          transform: 'none',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '10px 8px',
          background: 'rgba(10, 10, 10, 0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          maxHeight: '40vh',
          overflowY: 'auto',
          minWidth: '180px',
          scrollBehavior: 'smooth',
          scrollBehavior: 'auto',               
          overscrollBehavior: 'contain',
        }}
      >
          {/* 🎯 NEW: Header Title */}
  <div
    style={{
      padding: '8px 12px',
      marginBottom: '8px',
      borderBottom: '1px solid var(--border)',
      fontSize: '9px',
      fontWeight: '600',
      color: 'var(--text-subtle)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      textAlign: 'center',
    }}
  >
    Table of Animations
  </div>
        
        {animations.map((anim, index) => {
          const isActive = activeId === anim.id
          const number = String(index + 1).padStart(2, '0')

          return (
            <button
              key={anim.id}
              data-nav-id={anim.id}
              onClick={() => scrollToSection(anim.id)}
              title={`${number} — ${anim.label}`}
              className={`nav-btn ${isActive ? 'active' : ''}`}
              style={{
                // ✅ FIX 2: Hapus inline style yang conflict dengan CSS class
                // Biarkan CSS class (.nav-btn) yang handle background/color/hover
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '8px',
                padding: '8px 12px',
                border: 'none',
                borderLeft: '2px solid transparent',
                borderRadius: '0 8px 8px 0',
                fontSize: '10px',
                fontWeight: '400',
                fontFamily: 'inherit',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                minWidth: '150px',
                position: 'relative',
                outline: 'none',
                // Color akan di-handle oleh CSS class (.nav-btn / .nav-btn.active)
              }}
            >
              {/* Number */}
              <span style={{
                fontVariantNumeric: 'tabular-nums',
                opacity: isActive ? 0.9 : 0.5,
                fontSize: '9px',
                fontWeight: isActive ? '700' : '500',
                minWidth: '20px',
                textAlign: 'center',
              }}>
                {number}
              </span>

              {/* Separator */}
              <span style={{ opacity: 0.3, fontSize: '8px' }}>•</span>

              {/* Label */}
              <span style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '110px',
                fontSize: '9px',
              }}>
                {getShortLabel(anim.label)}
              </span>

              {/* Active Dot */}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  right: '8px',
                  width: '4px',
                  height: '4px',
                  background: '#fff',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
                }} />
              )}
            </button>
          )
        })}
      </nav>

      {/* CSS Styles */}
            {/* ── HOVER, ACTIVE & SCROLLBAR STYLES ── */}
      <style jsx>{`
        /* Button Styles */
        .nav-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
          color: var(--text-muted);
        }
        .nav-btn:hover:not(.active) {
          background: var(--surface-2) !important;
          color: var(--text) !important;
          border-left-color: var(--accent) !important;
          padding-left: 10px !important;
          transform: translateX(3px);
        }
        .nav-btn:active:not(.active) {
          transform: translateX(1px) scale(0.98);
          opacity: 0.85;
        }
        .nav-btn.active {
          background: var(--accent) !important;
          color: #fff !important;
          border-left-color: #fff !important;
          font-weight: 600 !important;
        }
        .nav-btn.active:hover {
          transform: none !important;
          padding-left: 12px !important;
        }

        /* 🎯 Auto-Hide Scrollbar Styles */
        .floating-nav::-webkit-scrollbar {
          width: 4px;
        }
        .floating-nav::-webkit-scrollbar-track {
          background: transparent;
        }
        .floating-nav::-webkit-scrollbar-thumb {
          background: transparent; /* Hidden by default */
          transition: background 0.3s ease;
          border-radius: 2px;
        }
        /* Show scrollbar on scroll or hover */
        .floating-nav.scrolling::-webkit-scrollbar-thumb,
        .floating-nav:hover::-webkit-scrollbar-thumb {
          background: var(--border);
        }
        
        /* Firefox Support */
        .floating-nav {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          transition: scrollbar-color 0.3s ease;
        }
        .floating-nav.scrolling,
        .floating-nav:hover {
          scrollbar-color: var(--border) transparent;
        }
      `}</style>
    </>
  )
}