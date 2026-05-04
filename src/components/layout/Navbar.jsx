'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

// ── MENU CONFIG ─────────────────────────────────
const MENU_ITEMS = [
  { label: 'Home',           href: '/',               tag: '00' },
  { label: 'Heading Reveal', href: '/heading-reveal', tag: '01', count: '30+' },
  { label: 'Content Reveal', href: '/content-reveal', tag: '02', count: '5'  },
  { label: 'Loaders',        href: '/loaders',        tag: '03', count: '5'  },
  { label: 'Buttons',        href: '/buttons',        tag: '04', count: '5'  },
]

const SOON_ITEMS = [
  { label: 'Scroll Effects',   tag: '05' },
  { label: 'Page Transitions', tag: '06' },
  { label: 'Cursor FX',        tag: '07' },
  { label: 'SVG Animations',   tag: '08' },
]
// ────────────────────────────────────────────────

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(true) // Hide hint after first open

  // Refs for GSAP
  const menuPanelRef = useRef(null)
  const overlayRef   = useRef(null)
  const itemsRef     = useRef([])
  const soonRef      = useRef([])
  const footerRef    = useRef(null)
  const hamburgerRef = useRef(null)
  const bar1Ref      = useRef(null)
  const bar2Ref      = useRef(null)
  const bar3Ref      = useRef(null)
  const tlRef        = useRef(null)
  const hintRef      = useRef(null) // ← Ref for hint button animation
  const arrowRef     = useRef(null) // ← Ref for arrow icon animation

  // Build timeline once on mount
  useEffect(() => {
    const panel = menuPanelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay) return

    gsap.set(panel, { clipPath: 'circle(0% at calc(100% - 32px) 32px)', opacity: 1, pointerEvents: 'none' })
    gsap.set(overlay, { opacity: 0, pointerEvents: 'none' })
    gsap.set(itemsRef.current, { yPercent: 110, opacity: 0 })
    gsap.set(soonRef.current, { yPercent: 110, opacity: 0 })
    gsap.set(footerRef.current, { opacity: 0, y: 10 })

    // Build open/close timeline
    tlRef.current = gsap.timeline({ paused: true })

    // 1. Overlay fade in
    tlRef.current.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' }, 0)

    // 2. Panel clip-path expand from top-right corner
    tlRef.current.to(panel, {
      clipPath: 'circle(150% at calc(100% - 32px) 32px)',
      duration: 0.65,
      ease: 'power4.inOut',
    }, 0)

    // 3. Menu items reveal — stagger mask slide up
    tlRef.current.to(itemsRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: 'power3.out',
    }, 0.3)

    // 4. Soon items
    tlRef.current.to(soonRef.current, {
      yPercent: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power3.out',
    }, 0.45)

    // 5. Footer row
    tlRef.current.to(footerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.6)

    return () => { tlRef.current?.kill() }
  }, [])

  // Toggle open/close + hint animation
  useEffect(() => {
    const panel   = menuPanelRef.current
    const overlay = overlayRef.current
    if (!panel || !overlay || !tlRef.current) return

    if (open) {
      gsap.set(panel, { pointerEvents: 'auto' })
      gsap.set(overlay, { pointerEvents: 'auto' })
      tlRef.current.play()

      // Hamburger → X morph
      gsap.to(bar1Ref.current, { y: 6, rotation: 45, duration: 0.35, ease: 'power3.inOut' })
      gsap.to(bar2Ref.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
      gsap.to(bar3Ref.current, { y: -6, rotation: -45, duration: 0.35, ease: 'power3.inOut' })

      // ✨ Hide hint button when menu opens
      if (hintRef.current) {
        gsap.to(hintRef.current, { scale: 0.8, opacity: 0, duration: 0.2, ease: 'power2.in' })
      }
    } else {
      tlRef.current.reverse()
      setTimeout(() => {
        gsap.set(panel, { pointerEvents: 'none' })
        gsap.set(overlay, { pointerEvents: 'none' })
      }, 650)

      // X → hamburger morph
      gsap.to(bar1Ref.current, { y: 0, rotation: 0, duration: 0.35, ease: 'power3.inOut' })
      gsap.to(bar2Ref.current, { opacity: 1, duration: 0.2, ease: 'power2.out', delay: 0.1 })
      gsap.to(bar3Ref.current, { y: 0, rotation: 0, duration: 0.35, ease: 'power3.inOut' })

      // ✨ Show hint button after delay (if not dismissed)
      if (hintRef.current && showHint) {
        gsap.fromTo(hintRef.current, 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.2)', delay: 0.8 }
        )
      }
    }
  }, [open, showHint])

  // ✨ Subtle arrow pulse animation (only when menu closed & hint visible)
  useEffect(() => {
    if (!arrowRef.current || open || !showHint) return

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(arrowRef.current, { x: 4, duration: 0.6, ease: 'sine.inOut' })
      .to(arrowRef.current, { x: 0, duration: 0.6, ease: 'sine.inOut' }, '+=0.2')

    return () => tl.kill()
  }, [open, showHint])

  // Close on route change
  const close = () => setOpen(false)

  // Dismiss hint permanently after user clicks menu once
  const handleHintClick = () => {
    setShowHint(false)
    setOpen(true)
  }

  return (
    <>
      {/* ── Fixed Navbar bar ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '56px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(30px)',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Logo */}
        <a href="/" style={{ fontSize:'15px', fontWeight:'700', color:'var(--text)', textDecoration:'none', letterSpacing:'-0.02em' }}>
          Anim<span style={{ color:'var(--accent)' }}>Vault</span>
        </a>

        {/* Right side: Hint Button + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* ✨ Animated Hint Button (only shows when menu closed & not dismissed) */}
          {showHint && !open && (
            <button
              ref={hintRef}
              onClick={handleHintClick}
              aria-label="Open menu"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: 0, // Start hidden for GSAP fade-in
                scale: 0.8,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-dim)'
                e.currentTarget.style.borderColor = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface-2)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--text-subtle)', fontWeight: '500' }}>
                Explore
              </span>
              {/* Animated arrow icon */}
              <svg 
                ref={arrowRef}
                width="14" height="14" viewBox="0 0 24 24" 
                fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"
                style={{ display: 'block' }}
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          )}

          {/* Hamburger button */}
          <button
            ref={hamburgerRef}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
            style={{
              width:'40px', height:'40px', background:'transparent', border:'none',
              cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center',
              justifyContent:'center', gap:'0', padding:'10px', borderRadius:'8px',
              transition:'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span ref={bar1Ref} style={{ display:'block', width:'18px', height:'1.5px', background:'var(--text)', borderRadius:'2px', transformOrigin:'center', position:'relative', top:'0' }} />
            <span ref={bar2Ref} style={{ display:'block', width:'18px', height:'1.5px', background:'var(--text)', borderRadius:'2px', margin:'4.5px 0' }} />
            <span ref={bar3Ref} style={{ display:'block', width:'18px', height:'1.5px', background:'var(--text)', borderRadius:'2px', transformOrigin:'center', position:'relative', top:'0' }} />
          </button>
        </div>
      </nav>

      {/* ── Backdrop overlay ── */}
      <div
        ref={overlayRef}
        onClick={close}
        style={{
          position:'fixed', inset:0, zIndex:201,
          background:'rgba(0,0,0,0.4)',
          backdropFilter:'blur(10px)',
          WebkitBackdropFilter:'blur(2px)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating menu panel ── */}
      <div
        ref={menuPanelRef}
        style={{
          position:'fixed', top:'12px', right:'12px', zIndex:202,
          width:'320px',
          background:'var(--surface)',
          border:'1px solid var(--border)',
          borderRadius:'16px',
          boxShadow:'0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          overflow:'hidden',
          display:'flex', flexDirection:'column',
          clipPath: 'circle(0% at calc(100% - 32px) 32px)',
          pointerEvents: 'none',
          opacity: 1,
        }}
      >
        {/* Panel header */}
        <div style={{ padding:'20px 24px 14px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ fontSize:'11px', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-subtle)', fontWeight:'500' }}>
            Menu
          </span>
          <button onClick={close} style={{ width:'28px', height:'28px', background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:'6px', cursor:'pointer', color:'var(--text-muted)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', fontFamily:'inherit' }}
            onMouseEnter={(e) => { e.currentTarget.style.color='var(--text)'; e.currentTarget.style.borderColor='var(--border-hover)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border)' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Live links */}
        <div style={{ padding:'10px 12px' }}>
          <p style={{ fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-subtle)', padding:'6px 12px', marginBottom:'2px' }}>
            Live
          </p>
          {MENU_ITEMS.map((item, i) => {
            const isActive = pathname === item.href
            return (
              <div key={item.href} style={{ overflow:'hidden' }}>
                <a
                  ref={el => itemsRef.current[i] = el}
                  href={item.href}
                  onClick={close}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'10px 12px', borderRadius:'8px', textDecoration:'none',
                    background: isActive ? 'var(--accent-dim)' : 'transparent',
                    transition:'background 0.15s',
                    marginBottom:'2px',
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                    <span style={{ fontSize:'10px', color:'var(--text-subtle)', fontVariantNumeric:'tabular-nums', minWidth:'20px' }}>{item.tag}</span>
                    <span style={{ fontSize:'14px', fontWeight: isActive ? '600' : '400', color: isActive ? 'var(--text)' : 'var(--text-muted)', letterSpacing:'-0.01em', transition:'color 0.15s' }}>{item.label}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                    {item.count && <span style={{ fontSize:'10px', color: isActive ? 'var(--accent)' : 'var(--text-subtle)' }}>{item.count} anims</span>}
                    {isActive && <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'var(--accent)', display:'inline-block' }} />}
                  </div>
                </a>
              </div>
            )
          })}
        </div>

        {/* Divider */}
        <div style={{ height:'1px', background:'var(--border)', margin:'0 12px' }} />

        {/* Coming soon */}
        <div style={{ padding:'10px 12px' }}>
          <p style={{ fontSize:'10px', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-subtle)', padding:'6px 12px', marginBottom:'2px' }}>
            Coming Soon
          </p>
          {SOON_ITEMS.map((item, i) => (
            <div key={item.tag} style={{ overflow:'hidden' }}>
              <div
                ref={el => soonRef.current[i] = el}
                style={{
                  display:'flex', alignItems:'center', gap:'12px',
                  padding:'10px 12px', borderRadius:'8px', marginBottom:'2px',
                  opacity: 0.45,
                }}
              >
                <span style={{ fontSize:'10px', color:'var(--text-subtle)', minWidth:'20px' }}>{item.tag}</span>
                <span style={{ fontSize:'14px', color:'var(--text-muted)', letterSpacing:'-0.01em' }}>{item.label}</span>
                <span style={{ marginLeft:'auto', fontSize:'9px', fontWeight:'600', padding:'2px 8px', borderRadius:'10px', background:'rgba(251,146,60,0.1)', color:'#fb923c' }}>soon</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          style={{
            padding:'12px 24px', borderTop:'1px solid var(--border)',
            display:'flex', justifyContent:'space-between', alignItems:'center',
          }}
        >
          <a href="https://gsap.com" target="_blank" rel="noreferrer"
            style={{ fontSize:'11px', color:'var(--text-subtle)', textDecoration:'none', transition:'color 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-subtle)'}>
            GSAP ↗
          </a>
          <span style={{ fontSize:'11px', color:'var(--text-subtle)' }}>v1.0</span>
        </div>
      </div>

      {/* Escape key close */}
      <EscapeClose onClose={close} />
    </>
  )
}

function EscapeClose({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])
  return null
}