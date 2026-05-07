'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Draggable }     from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText }     from 'gsap/SplitText'

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger, SplitText)

// ═══════════════════════════════════════════════════════════════
// 🎨 FLOATING ASSETS CONFIG — ALL PNG IMAGES
// ═══════════════════════════════════════════════════════════════
//
// 🔄 Semua asset sekarang menggunakan PNG image yang sama
//    Variasi dibuat melalui: position, size, rotation, from-direction
//
// ── HOW TO ADD NEW ASSET ───────────────────────────────────────
//   1. Copy paste object below
//   2. Change: id, x, y, size, rotation, from
//   3. Keep: content: 'img', src: '/sticker-animvault.png'
// ════════════════════════════════════════════════════════════════

const ASSETS = [
  // ── Asset 1: Sticker Utama ──────────────────────────────────
  {
    id:       'sticker-1',
    x:        '-38%',
    y:        '-18%',
    size:     130,
    rotation: -14,
    from:     'left',
    content:  'img',
    src:      '/sticker-animvault.png',
  },

  // ── Asset 2: Same sticker, different position ───────────────
  {
    id:       'sticker-2',
    x:        '37%',
    y:        '-28%',
    size:     88,
    rotation: 18,
    from:     'top',
    content:  'img',
    src:      '/sticker-animvault.png',
  },

  // ── Asset 3: Same sticker, different position ───────────────
  {
    id:       'sticker-3',
    x:        '-40%',
    y:        '24%',
    size:     78,
    rotation: 5,
    from:     'left',
    content:  'img',
    src:      '/sticker-animvault.png',
  },

  // ── Asset 4: Same sticker, different position ───────────────
  {
    id:       'sticker-4',
    x:        '40%',
    y:        '26%',
    size:     94,
    rotation: 8,
    from:     'right',
    content:  'img',
    src:      '/sticker-animvault.png',
  },

  // ── Asset 5: Same sticker, different position ───────────────
  {
    id:       'sticker-5',
    x:        '-12%',
    y:        '-38%',
    size:     66,
    rotation: -6,
    from:     'top',
    content:  'img',
    src:      '/sticker-animvault.png',
  },

  // ── Asset 6: Same sticker, different position ───────────────
  {
    id:       'sticker-6',
    x:        '18%',
    y:        '-22%',
    size:     54,
    rotation: 22,
    from:     'right',
    content:  'img',
    src:      '/sticker-animvault.png',
  },
]

// ═══════════════════════════════════════════════════════════════
// 🎨 HOLOGRAM HOVER STYLES
// ═══════════════════════════════════════════════════════════════
const STYLES = `
  @keyframes holoRotate {
    0%   { background-position: 0% 50%;   filter: hue-rotate(0deg);   }
    50%  { background-position: 100% 50%; filter: hue-rotate(200deg); }
    100% { background-position: 0% 50%;   filter: hue-rotate(360deg); }
  }

  .cta-asset {
    position:   absolute;
    cursor:     grab;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
    will-change: transform;
  }
  .cta-asset:active { cursor: grabbing; }

  /* ── Inner shell ── */
  .cta-asset-inner {
    width:      100%;
    height:     100%;
    position:   relative;
    border-radius: 999px;        /* 🔧 Rounded corners untuk PNG sticker */
    overflow:   hidden;         /* Clip hologram agar tidak bocor */
    transition: transform 0.25s ease;
  }
  .cta-asset:hover .cta-asset-inner {
    transform: scale(1.10);
  }

  /* ── Hologram overlay ── */
  .cta-asset-holo {
    position:   absolute;
    inset:      0;
    z-index: 10;
    mix-blend-mode: overlay;
    border-radius: inherit;
    
    /* 🔧 BLUR FILTER untuk soft glowing effect */
    filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    
    background: linear-gradient(135deg,
      rgba(37,99,255,0)     0%,
      rgba(120,37,255,0.45) 25%,
      rgba(37,200,255,0.4)  50%,
      rgba(255,37,200,0.35) 75%,
      rgba(37,99,255,0)     100%
    );
    background-size: 300% 300%;
    opacity:    0;
    pointer-events: none;
    animation:  holoRotate 2.8s linear infinite;
    transition: opacity 0.3s ease;
  }
  
  .cta-asset:hover .cta-asset-holo {
    opacity: 0.9;
  }
  
  /* 🔧 Sharp image rendering */
  .cta-asset img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    -webkit-font-smoothing: antialiased;
  }
`

// ── Edge origins for "throw-in" intro reveal ──────────────────
const FROM_POSITIONS = {
  left:   { x: -400, y:    0, rot: -30, scale: 0.5 },
  right:  { x:  400, y:    0, rot:  30, scale: 0.5 },
  top:    { x:    0, y: -350, rot:  20, scale: 0.5 },
  bottom: { x:    0, y:  350, rot: -20, scale: 0.5 },
}

export function CTADraggable() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const subRef     = useRef(null)
  const btnRef     = useRef(null)
  const hintRef    = useRef(null)
  const splitRef   = useRef(null)
  const draggables = useRef([])

  // ── Heading BottomMask reveal ──
  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      splitRef.current = new SplitText(el, { type: 'chars' })
      const chars = splitRef.current.chars
      const inners = []

      chars.forEach((char) => {
        const text    = char.textContent.trim()
        const isSpace = !text
        const mask    = document.createElement('span')
        mask.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:0.85;'
        if (isSpace) {
          mask.innerHTML   = '&nbsp;'
          mask.style.width = '0.28em'
          char.parentNode.replaceChild(mask, char)
          return
        }
        const inner = document.createElement('span')
        inner.style.cssText = 'display:inline-block;white-space:nowrap;will-change:transform;'
        inner.textContent   = text
        mask.appendChild(inner)
        char.parentNode.replaceChild(mask, char)

        const randY   = 100 + Math.random() * 80
        const randScl = 0.4 + Math.random() * 0.4
        gsap.set(inner, { y: randY, scale: randScl, opacity: 1, transformOrigin: 'center center' })
        inners.push(inner)
      })

      gsap.to(inners, {
        y: 0, scale: 1, opacity: 1,
        duration: 0.7,
        stagger: { each: 0.025, from: 'random' },
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
    }, el)

    return () => { ctx.revert(); splitRef.current?.revert() }
  }, [])

  // ── Sub / button reveal ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      gsap.from([subRef.current, btnRef.current, hintRef.current], {
        y: 18, opacity: 0, filter: 'blur(6px)',
        stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%' },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  // ── Asset: throw-in reveal + idle float + Draggable ──
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const timer = setTimeout(() => {
      const assetEls = Array.from(section.querySelectorAll('.cta-asset'))
      if (!assetEls.length) return

      // 1. THROW-IN REVEAL
      assetEls.forEach((el, i) => {
        const cfg  = ASSETS[i]
        const from = FROM_POSITIONS[cfg?.from ?? 'left']

        gsap.fromTo(el,
          {
            x:       from.x,
            y:       from.y,
            rotation: from.rot,
            opacity: 0,
            scale:   from.scale,
            filter:  'blur(10px)',
          },
          {
            x:        0,
            y:        0,
            rotation: cfg?.rotation ?? 0,
            opacity:  1,
            scale:    1,
            filter:   'blur(0px)',
            duration: 1.2,
            delay:    0.2 + i * 0.12,
            ease:     'power3.out',
            scrollTrigger: { trigger: section, start: 'top 70%', once: true },
          }
        )
      })

      // 2. IDLE FLOAT
      assetEls.forEach((el, i) => {
        const delay = i * 0.6
        const dur   = 3 + i * 0.5
        const yAmt  = 10 + i * 2
        const rotAmt = i % 2 === 0 ? 4 : -4

        gsap.to(el, {
          y:       `+=${yAmt}`,
          rotation: `+=${rotAmt}`,
          duration: dur,
          delay,
          yoyo:    true,
          repeat:  -1,
          ease:    'sine.inOut',
        })
      })

      // 3. DRAGGABLE
      draggables.current = Draggable.create(assetEls, {
        type:            'x,y',
        inertia:         true,
        bounds:          section,
        edgeResistance:  0.72,
        throwResistance: 1600,
        maxDuration:     1.4,
        zIndexBoost:     true,

        onPress() {
          gsap.killTweensOf(this.target, 'y,rotation')
          gsap.to(this.target, { 
            scale: 1.08, 
            duration: 0.25, 
            ease: 'power2.out',
            overwrite: 'auto'
          })
          const holo = this.target.querySelector('.cta-asset-holo')
          if (holo) gsap.to(holo, { opacity: 0.7, duration: 0.2 })
        },

        onDrag() {
          const vx  = this.velocityX ?? 0
          const cur = Number(gsap.getProperty(this.target, 'rotation')) || 0
          const next = cur + vx * 0.012
          gsap.set(this.target, { 
            rotation: Math.max(-35, Math.min(35, next)),
            overwrite: 'auto'
          })
        },

        onRelease() {
          gsap.to(this.target, { 
            scale: 1, 
            duration: 0.4, 
            ease: 'elastic.out(1, 0.5)',
            overwrite: 'auto'
          })
          const holo = this.target.querySelector('.cta-asset-holo')
          if (holo) gsap.to(holo, { opacity: 0, duration: 0.3 })

          const idx   = assetEls.indexOf(this.target)
          const dur   = 3 + idx * 0.5
          const yAmt  = 10 + idx * 2
          const rotAmt = idx % 2 === 0 ? 4 : -4

          setTimeout(() => {
            if (!this.target) return
            gsap.to(this.target, {
              y: `+=${yAmt}`, 
              rotation: `+=${rotAmt}`,
              duration: dur, 
              yoyo: true, 
              repeat: -1, 
              ease: 'sine.inOut',
            })
          }, 1200)
        },

        onThrowComplete() {
          gsap.to(this.target, { scale: 1, duration: 0.25, overwrite: 'auto' })
        },
      })
    }, 150)

    return () => {
      clearTimeout(timer)
      draggables.current.forEach(d => d?.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position:       'relative',
        minHeight:      '600px',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        '160px 48px',
        overflow:       'hidden',
        background:     'var(--bg)',
      }}
    >
      <style>{STYLES}</style>

      {/* Background accent glow */}
      <div style={{
        position:   'absolute', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 0,
        background: 'radial-gradient(ellipse 60% 60% at 50% 50%, var(--accent-dim) 0%, transparent 70%)',
      }} />

      {/* ── FLOATING DRAGGABLE ASSETS ── */}
      {ASSETS.map((asset, i) => (
        <div
          key={asset.id}
          className="cta-asset"
          style={{
            width:     asset.size,
            height:    asset.size,
            left:      `calc(50% + ${asset.x})`,
            top:       `calc(50% + ${asset.y})`,
            transform: `translate(-50%, -50%) rotate(${asset.rotation}deg)`,
            zIndex:    10 + i,
          }}
        >
          <div className="cta-asset-inner">
            <div className="cta-asset-holo" />

            {/* 🔧 Simplified: Semua asset sekarang PNG image */}
            <img
              src={asset.src}
              alt={asset.id}
              draggable={false}
              style={{
                width:     '100%',
                height:    '100%',
                objectFit: 'contain',
                display:   'block',
                filter:    'drop-shadow(0 8px 24px rgba(37,99,255,0.35))',
              }}
            />
          </div>
        </div>
      ))}

      {/* ── CTA CONTENT ── */}
      <div style={{ position: 'relative', zIndex: 20, maxWidth: '760px' }}>
        <p style={{
          fontSize:'11px', 
          fontWeight:'500', 
          letterSpacing:'0.12em',
          textTransform:'uppercase', 
          color:'var(--text-subtle)', 
          marginBottom:'20px',
        }}>
          Start Building
        </p>

        <h2
          ref={titleRef}
          className="h2-lg"
          style={{ 
            overflow: 'hidden', 
            marginBottom: '24px',
          }}
        >
          Start Exploring<br />Animations
        </h2>

        <p 
          ref={subRef} 
          style={{
            fontSize:'16px', 
            color:'var(--text-muted)', 
            lineHeight:'1.7',
            maxWidth:'440px', 
            margin:'0 auto 40px',
          }}
        >
          Build better interactions. Design with intention.<br />
          Ship with confidence.
        </p>

        <div ref={btnRef}>
          <a
            href="#collection"
            style={{
              display:'inline-flex', 
              alignItems:'center', 
              gap:'8px',
              fontSize:'15px', 
              fontWeight:'600', 
              color:'#fff',
              background:'var(--accent)', 
              padding:'14px 32px',
              borderRadius:'10px', 
              textDecoration:'none',
              transition:'all 0.2s ease',
              letterSpacing:'-0.01em',
              boxShadow:'0 4px 20px rgba(37,99,255,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background  = '#1d4ed8'
              e.currentTarget.style.transform   = 'translateY(-2px)'
              e.currentTarget.style.boxShadow   = '0 12px 40px rgba(37,99,255,0.45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background  = 'var(--accent)'
              e.currentTarget.style.transform   = 'translateY(0)'
              e.currentTarget.style.boxShadow   = '0 4px 20px rgba(37,99,255,0.3)'
            }}
          >
            Browse Animations
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <p 
          ref={hintRef} 
          style={{
            fontSize:'11px', 
            color:'var(--text-subtle)',
            marginTop:'20px', 
            letterSpacing:'0.04em',
          }}
        >
          ✦ Drag the floating elements around
        </p>
      </div>
    </section>
  )
}