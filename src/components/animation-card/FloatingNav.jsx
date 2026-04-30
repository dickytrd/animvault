'use client'

import { useState, useEffect } from 'react'

export function FloatingNav({ animations }) {
  const [activeId, setActiveId] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  // Wait for mount
  useEffect(() => {
    setMounted(true)
  }, [])

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

    // Function to observe sections
    const observeSections = () => {
      const sections = document.querySelectorAll('[data-animation-id]')
      console.log(`[FloatingNav] Found ${sections.length} sections`)
      
      sections.forEach((section) => {
        observer.observe(section)
      })
      
      return sections.length
    }

    // Try multiple times with increasing delay
    let attempt = 0
    const maxAttempts = 5
    const tryObserve = () => {
      const count = observeSections()
      
      if (count === 0 && attempt < maxAttempts) {
        attempt++
        console.log(`[FloatingNav] Retry ${attempt}/${maxAttempts}...`)
        setTimeout(tryObserve, attempt * 200) // 200ms, 400ms, 600ms, 800ms, 1000ms
      }
    }

    // Initial attempt
    setTimeout(tryObserve, 100)

    // Also observe on DOM changes
    const mutationObserver = new MutationObserver(() => {
      const sections = document.querySelectorAll('[data-animation-id]')
      if (sections.length > 0) {
        sections.forEach((section) => observer.observe(section))
      }
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [mounted])

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

  // Smooth scroll dengan multiple fallback methods
  const scrollToSection = (id) => {
    console.log(`[FloatingNav] Scrolling to: ${id}`)
    
    // Try multiple selectors
    const element = 
      document.getElementById(id) ||
      document.querySelector(`[data-animation-id="${id}"]`)
    
    if (element) {
      const rect = element.getBoundingClientRect()
      const offsetTop = window.scrollY + rect.top - 100
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      })
      
      window.history.pushState(null, '', `#${id}`)
    } else {
      console.error(`[FloatingNav] Element "${id}" not found!`)
      // List available sections for debugging
      const available = Array.from(document.querySelectorAll('[data-animation-id]'))
        .map(el => el.getAttribute('data-animation-id'))
      console.log('[FloatingNav] Available:', available)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const currentIndex = animations.findIndex((a) => a.id === activeId)
        const nextIndex =
          e.key === 'ArrowDown'
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
        style={{
          position: 'fixed',
          left: 'auto',
          right: '24px',
          top: '40%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          padding: '8px 4px',
          background: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          maxHeight: '50vh',
          overflowY: 'auto',
        }}
      >
        {animations.map((anim, index) => {
          const isActive = activeId === anim.id
          const number = String(index + 1).padStart(2, '0')

          return (
            <button
              key={anim.id}
              onClick={() => scrollToSection(anim.id)}
              title={`${number} — ${anim.label}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '9px',
                fontWeight: isActive ? '600' : '400',
                fontFamily: 'inherit',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                minWidth: '32px',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontVariantNumeric: 'tabular-nums',
                  opacity: isActive ? 0.9 : 0.5,
                  fontSize: '8px',
                  fontWeight: isActive ? '700' : '500',
                }}
              >
                {number}
              </span>

              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    right: '-4px',
                    width: '4px',
                    height: '4px',
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
                  }}
                />
              )}
            </button>
          )
        })}
      </nav>
    </>
  )
}