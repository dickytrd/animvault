'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, Draggable, InertiaPlugin)

// ─────────────────────────────────────────────
// 🔧 FLEXIBLE ASSETS CONFIG
// Support: image, video, svg, component
// ─────────────────────────────────────────────
const ASSETS = [
  {
    id: 1,
    mediaType: 'image',
    src: '/assets/images/sticker-anim-1.png', // ← Sample asset kamu
    alt: 'Sticker Anim 1',
    size: 96,
    startPos: { x: 15, y: 20 },
    glow: 'rgba(37,99,235,0.4)',
    draggable: true,
  },
  {
    id: 2,
    mediaType: 'image',
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&h=200&fit=crop',
    alt: 'Abstract Blue',
    size: 72,
    startPos: { x: 80, y: 25 },
    glow: 'rgba(74,222,128,0.35)',
    draggable: true,
  },
  {
    id: 3,
    mediaType: 'video',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-3145-large.mp4',
    size: 64,
    startPos: { x: 20, y: 75 },
    glow: 'rgba(251,146,60,0.3)',
    videoProps: { autoPlay: true, loop: true, muted: true, playsInline: true },
    draggable: true,
  },
  {
    id: 4,
    mediaType: 'svg',
    src: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`)}`,
    alt: 'Info Icon',
    size: 56,
    startPos: { x: 75, y: 70 },
    glow: 'rgba(167,139,250,0.3)',
    draggable: true,
  },
  {
    id: 5,
    mediaType: 'image',
    src: 'https://images.unsplash.com/photo-1550751863-88438c3f6f9a?w=200&h=200&fit=crop',
    alt: 'Abstract Purple',
    size: 68,
    startPos: { x: 8, y: 50 },
    glow: 'rgba(56,189,248,0.3)',
    draggable: true,
  },
  {
    id: 6,
    mediaType: 'image',
    src: 'https://images.unsplash.com/photo-1550745169-9e6c6e5f6f9a?w=200&h=200&fit=crop',
    alt: 'Abstract Pink',
    size: 52,
    startPos: { x: 85, y: 55 },
    glow: 'rgba(244,114,182,0.3)',
    draggable: true,
  },
]

// ─────────────────────────────────────────────
// 🔧 FLEXIBLE MEDIA RENDERER
// ─────────────────────────────────────────────
function AssetMedia({ asset }) {
  const { mediaType, src, alt, size, color, videoProps = {} } = asset
  const s = size

  // Video
  if (mediaType === 'video') {
    return (
      <video
        width={s}
        height={s}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'block',
        }}
        {...videoProps}
      >
        <source src={src} type={`video/${src.split('.').pop()?.split('?')[0] || 'mp4'}`} />
      </video>
    )
  }

  // SVG (data URI or URL)
  if (mediaType === 'svg') {
    return (
      <img
        src={src}
        alt={alt || 'svg asset'}
        width={s}
        height={s}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'block',
        }}
        draggable={false}
      />
    )
  }

  // Image (default)
  return (
    <img
      src={src}
      alt={alt || 'asset'}
      width={s}
      height={s}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: mediaType === 'image' ? '12px' : '50%',
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'block',
      }}
      draggable={false}
      onError={(e) => {
        // Fallback jika image gagal load
        e.currentTarget.style.display = 'none'
        e.currentTarget.parentElement.innerHTML = `
          <div style="width:100%;height:100%;background:var(--surface-2);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--text-subtle);font-size:10px">
            ${alt || 'Asset'}
          </div>
        `
      }}
    />
  )
}

// ─────────────────────────────────────────────
// BOTTOM MASK REVEAL HOOK
// ─────────────────────────────────────────────
function useBottomMaskReveal(ref, options = {}) {
  const {
    duration = 0.3,
    stagger = 0.1,
    yRange = 220,
    rotationRange = 0,
    ease = 'power3.out',
    start = 'top 75%',
    delay = 0,
  } = options

  useGSAP(() => {
    if (!ref.current) return
    const el = ref.current

    const splitInstance = new SplitText(el, { type: 'chars' })
    const originalChars = splitInstance.chars

    const inners = []
    originalChars.forEach((char) => {
      const text = char.textContent?.trim() || ''
      const isSpace = !text

      const mask = document.createElement('span')
      mask.className = 'char-mask-container'
      mask.style.display = 'inline-block'
      mask.style.overflow = 'hidden'
      mask.style.position = 'relative'
      mask.style.verticalAlign = 'top'
      mask.style.lineHeight = '1.1'

      if (isSpace) {
        mask.innerHTML = '&nbsp;'
        mask.style.width = '0.28em'
        char.parentNode?.replaceChild(mask, char)
        return
      }

      const inner = document.createElement('span')
      inner.className = 'char-mask-inner'
      inner.textContent = text
      inner.style.display = 'inline-block'
      inner.style.whiteSpace = 'nowrap'
      inner.style.willChange = 'transform, opacity'
      inner.style.backfaceVisibility = 'hidden'
      mask.appendChild(inner)
      char.parentNode?.replaceChild(mask, char)

      const randY = yRange * (0.5 + Math.random() * 0.5)
      const randRot = (Math.random() - 0.5) * rotationRange
      gsap.set(inner, {
        y: randY,
        rotation: randRot,
        scale: 1,
        opacity: 1,
        transformOrigin: 'center center',
      })
      inners.push(inner)
    })

    gsap.to(inners, {
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      stagger: { each: stagger, from: 'random' },
      ease,
      scrollTrigger: { trigger: el, start },
    })

    return () => {
      splitInstance.revert()
    }
  }, { scope: ref })
}

// ─────────────────────────────────────────────
// MAIN CTA SECTION
// ─────────────────────────────────────────────
export function CTASection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)
  const btnRef = useRef(null)
  const assetRefs = useRef([])
  const draggablesRef = useRef([])
  const idleTlRef = useRef(null)

  // ── Heading reveal ──
  useBottomMaskReveal(titleRef, { yRange: 100, rotationRange: 0, stagger: 0.01, start: 'top 90%' })

  useGSAP(() => {
    gsap.from(subRef.current, {
      y: 16, opacity: 0, filter: 'blur(6px)',
      duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
    })
    gsap.from(btnRef.current, {
      y: 12, opacity: 0, duration: 0.6, delay: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }
    })
    gsap.from('.cta-asset', {
      scale: 0, opacity: 0, duration: 0.8,
      stagger: { each: 0.1, from: 'random' },
      ease: 'back.out(1.8)',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
    })
  }, { scope: sectionRef })

  // ── Idle floating animation ──
  const startIdleAnimation = useCallback(() => {
    if (idleTlRef.current) idleTlRef.current.kill()

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    assetRefs.current.forEach((el, i) => {
      if (!el) return
      const dur = 2.5 + Math.random() * 2
      const yMove = 8 + Math.random() * 12
      const xMove = 4 + Math.random() * 8
      const rot = (Math.random() - 0.5) * 10
      tl.to(el, {
        y: `+=${yMove}`,
        x: `+=${xMove}`,
        rotation: `+=${rot}`,
        duration: dur,
        ease: 'sine.inOut',
      }, i * 0.2)
    })
    idleTlRef.current = tl
  }, [])

  // ── Initialize Draggable ──
  useEffect(() => {
    if (!containerRef.current) return

    const timer = setTimeout(() => {
      const container = containerRef.current
      const assets = assetRefs.current.filter(Boolean)
      if (!assets.length) return

      draggablesRef.current.forEach(d => d.kill())
      draggablesRef.current = []

      assets.forEach((el) => {
        const assetData = ASSETS.find(a => a.id === Number(el.dataset.id))
        if (!assetData) return

        // Skip draggable if disabled
        const isDraggable = assetData.draggable !== false

        const rect = container.getBoundingClientRect()
        const startX = (assetData.startPos.x / 100) * rect.width
        const startY = (assetData.startPos.y / 100) * rect.height

        gsap.set(el, {
          x: startX - assetData.size / 2,
          y: startY - assetData.size / 2,
          xPercent: 0,
          yPercent: 0,
        })

        if (isDraggable) {
          const d = Draggable.create(el, {
            type: 'x,y',
            bounds: container,
            inertia: true,
            edgeResistance: 0.65,
            throwResistance: 800,
            overshootTolerance: 0,
            cursor: 'grab',
            activeCursor: 'grabbing',
            onPress() {
              if (idleTlRef.current) idleTlRef.current.pause()
              gsap.to(this.target, {
                scale: 1.15,
                duration: 0.2,
                ease: 'power2.out',
                overwrite: 'auto',
              })
              const glow = this.target.querySelector('.asset-glow')
              if (glow) gsap.to(glow, { opacity: 0.6, duration: 0.3 })
            },
            onDrag() {
              const vx = this.deltaX || 0
              const vy = this.deltaY || 0
              const velocity = Math.sqrt(vx * vx + vy * vy)
              const targetRot = gsap.getProperty(this.target, 'rotation')
              gsap.to(this.target, {
                rotation: targetRot + velocity * 0.5 * (vx > 0 ? 1 : -1),
                duration: 0.1,
                overwrite: 'auto',
              })
            },
            onRelease() {
              gsap.to(this.target, {
                scale: 1,
                duration: 0.4,
                ease: 'elastic.out(1, 0.5)',
                overwrite: 'auto',
              })
              const glow = this.target.querySelector('.asset-glow')
              if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 })
              setTimeout(() => {
                if (idleTlRef.current) idleTlRef.current.resume()
              }, 1000)
            },
          })[0]

          draggablesRef.current.push(d)
        }
      })

      startIdleAnimation()
    }, 500)

    return () => {
      clearTimeout(timer)
      draggablesRef.current.forEach(d => d.kill())
      if (idleTlRef.current) idleTlRef.current.kill()
    }
  }, [startIdleAnimation])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, var(--accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0.4,
        }}
      />

      {/* Draggable container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1100px',
          minHeight: '70vh',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 48px',
        }}
      >
        {/* Floating Assets */}
        {ASSETS.map((asset, i) => (
          <div
            key={asset.id}
            ref={(el) => { assetRefs.current[i] = el }}
            data-id={asset.id}
            className="cta-asset"
            style={{
              position: 'absolute',
              width: asset.size,
              height: asset.size,
              zIndex: 5,
              willChange: 'transform',
              userSelect: 'none',
              touchAction: asset.draggable !== false ? 'none' : 'auto',
              cursor: asset.draggable !== false ? 'grab' : 'default',
              pointerEvents: asset.draggable !== false ? 'auto' : 'none',
            }}
            onMouseEnter={(e) => {
              if (asset.draggable === false) return
              const el = e.currentTarget
              gsap.to(el, { scale: 1.08, duration: 0.25, ease: 'power2.out' })
              const glow = el.querySelector('.asset-hologram')
              if (glow) gsap.to(glow, { opacity: 0.5, duration: 0.3 })
            }}
            onMouseLeave={(e) => {
              if (asset.draggable === false) return
              const el = e.currentTarget
              gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
              const glow = e.currentTarget.querySelector('.asset-hologram')
              if (glow) gsap.to(glow, { opacity: 0, duration: 0.3 })
            }}
          >
            {/* Hologram gradient glow */}
            <div
              className="asset-hologram"
              style={{
                position: 'absolute',
                inset: '-30%',
                borderRadius: asset.mediaType === 'image' ? '20px' : '50%',
                background: `radial-gradient(circle, ${asset.glow} 0%, transparent 70%)`,
                opacity: 0,
                pointerEvents: 'none',
                transition: 'none',
                filter: 'blur(12px)',
              }}
            />
            {/* Soft shadow glow */}
            <div
              className="asset-glow"
              style={{
                position: 'absolute',
                inset: '-20%',
                borderRadius: asset.mediaType === 'image' ? '20px' : '50%',
                background: `radial-gradient(circle, ${asset.glow} 0%, transparent 60%)`,
                opacity: 0.2,
                pointerEvents: 'none',
                filter: 'blur(8px)',
              }}
            />
            {/* Media Renderer */}
            <div style={{ 
              position: 'relative', 
              zIndex: 2, 
              width: '100%', 
              height: '100%',
              borderRadius: asset.mediaType === 'image' ? '12px' : '50%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: asset.mediaType === 'image' ? 'var(--surface-2)' : 'transparent'
            }}>
              <AssetMedia asset={asset} />
            </div>
          </div>
        ))}

        {/* CTA Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            maxWidth: '680px',
            pointerEvents: 'none',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: '500',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-subtle)',
              marginBottom: '28px',
            }}
          >
            Start Building
          </p>

          <h2
            ref={titleRef}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: 'var(--text)',
              marginBottom: '20px',
              overflow: 'hidden',
              textWrap: 'balance',
            }}
          >
            Start Exploring
            <br />
            Animations
          </h2>

          <p
            ref={subRef}
            style={{
              fontSize: '16px',
              color: 'var(--text-muted)',
              maxWidth: '440px',
              lineHeight: 1.7,
              margin: '0 auto 40px',
            }}
          >
            Build better interactions. Design with intention. Ship with confidence.
          </p>

          <a
            ref={btnRef}
            href="#collection"
            className="cta-main-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '15px',
              fontWeight: 600,
              color: '#fff',
              background: 'var(--accent)',
              padding: '14px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              transition: 'background 0.2s, transform 0.2s',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1d4ed8'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(37, 99, 235, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 0px 0px rgba(37, 99, 235, 0.1)'
            }}
          >
            Explore Animations
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <p
            style={{
              marginTop: '24px',
              fontSize: '12px',
              color: 'var(--text-subtle)',
              opacity: 0.7,
            }}
          >
            Drag the shapes around — they respond to your touch
          </p>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .cta-asset { opacity: 0.6 !important; }
          .cta-main-btn {
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  )
}