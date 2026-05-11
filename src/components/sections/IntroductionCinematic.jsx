'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─────────────────────────────────────────────
// 🔧 HEADING CONFIG
// ─────────────────────────────────────────────
const HEADING = {
  line1: 'From Idea',
  line2: 'to Implementation',
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Browse 30+ production-ready animations across 12 categories — from simple fades to physics-based interactions.',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=800&fit=crop',
  },
  {
    num: '02',
    title: 'Customize Live',
    desc: 'Tweak duration, easing, stagger, and blur directly in the browser. The preview updates in real time.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=800&fit=crop',
  },
  {
    num: '03',
    title: 'Copy & Ship',
    desc: 'One click copies production-ready GSAP code. Drop it into your project and it works instantly.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
]

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export function IntroductionCinematic() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const headingRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const cardsContainerRef = useRef(null)
  const cardRefs = useRef([])

     useGSAP(() => {
    if (!sectionRef.current || !wrapperRef.current) return

    const line1 = line1Ref.current
    const line2 = line2Ref.current
    
    // Pastikan urutan array tetap Kiri(0) -> Tengah(1) -> Kanan(2)
    const cards = [
      cardRefs.current[0],
      cardRefs.current[1],
      cardRefs.current[2],
    ].filter(Boolean)

    // ── SplitText Logic ──
    const split1 = new SplitText(line1, { type: 'chars' })
    const split2 = new SplitText(line2, { type: 'chars' })

    const buildMasks = (splitInstance) => {
      const inners = []
      splitInstance.chars.forEach((char) => {
        const text = char.textContent?.trim() || ''
        const isSpace = !text
        const mask = document.createElement('span')
        mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;line-height:1.05'
        
        if (isSpace) {
          mask.innerHTML = '&nbsp;'; mask.style.width = '0.28em'; char.parentNode?.replaceChild(mask, char); return
        }
        
        const inner = document.createElement('span')
        inner.textContent = text
        inner.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden'
        mask.appendChild(inner); char.parentNode?.replaceChild(mask, char)
        
        gsap.set(inner, { 
          y: 120 + Math.random() * 80, 
          // rotation: (Math.random() - 0.5) * 20, 
          scale: 1, 
          opacity: 0, 
          filter: 'blur(8px)', 
          transformOrigin: 'center center' 
        })
        inners.push(inner)
      })
      return inners
    }

    const allInners = [...buildMasks(split1), ...buildMasks(split2)]

    // ── Initial States ──
    cards.forEach((card, i) => {
      const baseY = 720
      const baseRotation = i === 0 ? -4 : i === 2 ? 4 : 0 // Rotasi sedikit acak
      gsap.set(card, {
        y: baseY + (Math.random() - 0.5) * 40,
        rotation: baseRotation + (Math.random() - 0.5) * 2,
        scale: 0.9,
        opacity: 1,
        filter: 'blur(8px)',
      })
    })

    // ── Timeline Configuration ──
    // Total Duration: 100 Units (Normalized)
    // Scroll Distance: 600% (Sangat panjang untuk efek "Step-by-Step")
   const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top top',
    end: '+=400%',
    pin: true,
    scrub: 0.8,
    anticipatePin: 1,
    // // ── Atmosphere contribution ──────────────────────────────
    // // Cards exit starts at tl position 80 / total ~140 ≈ 57%
    // // Contributes 0 → 0.4 during exit phase, before Marquee takes over
    // onUpdate: (self) => {
    //   const exitStart    = 0.57
    //   const contribution = Math.max(0, (self.progress - exitStart) / (1 - exitStart)) * 0.4
    //   window.__introAtmosContrib = contribution
    //   const current = window.__atmosphereTarget ?? 0
    //   if (contribution > current) {
    //     window.__atmosphereTarget = contribution
    //   }
    // },
    // onLeave: () => {
    //   window.__introAtmosContrib  = 0.4
    //   window.__atmosphereTarget   = 0.4
    // },
    // onLeaveBack: () => {
    //   window.__introAtmosContrib  = 0
    //   window.__atmosphereTarget   = 0
    // },
  },
})

    // PHASE 1: Heading Reveal (0% - 20%)
    tl.to(allInners, {
      y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
      duration: 10,
      stagger: { each: 0.03, from: 'random' },
      ease: 'power3.out',
    }, 0)

    // PHASE 2: Heading Hold (20% - 30%)
    tl.to({}, { duration: 5 }, 10)

    // PHASE 3: Heading Exit (30% - 40%)
    tl.to([line1, line2], {
      y: -600, opacity: 1, filter: 'blur(6px)',
      duration: 15,
      ease: 'power2.in',
    }, 15)

    // PHASE 4: Gap (40% - 45%)
    tl.to({}, { duration: 5 }, 20)

    // PHASE 5: Card 1 Reveal (Kiri) (45% - 55%)
    // User Scroll -> Card 1 Muncul
    tl.to(cards[0], {
      y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
      duration: 20,
      ease: 'power3.out',
    }, 25)

    // PHASE 6: Scroll Space (55% - 60%)
    // User Scroll (Jeda)
    tl.to({}, { duration: 5 }, 30)

    // PHASE 7: Card 2 Reveal (Tengah) (60% - 70%)
    // User Scroll -> Card 2 Muncul
    tl.to(cards[1], {
      y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
      duration: 20,
      ease: 'power3.out',
    }, 40)

    // PHASE 8: Scroll Space (70% - 75%)
    // User Scroll (Jeda)
    tl.to({}, { duration: 5 }, 45)

    // PHASE 9: Card 3 Reveal (Kanan) (75% - 85%)
    // User Scroll -> Card 3 Muncul
    tl.to(cards[2], {
      y: 0, rotation: 0, scale: 1, opacity: 1, filter: 'blur(0px)',
      duration: 20,
      ease: 'power3.out',
    }, 55)

    // PHASE 10: Hold Cards (85% - 90%)
    tl.to({}, { duration: 5 }, 70)

    // PHASE 11: Cards Exit (Staggered) (90% - 100%+)
    // Exit juga dibuat bertahap (1 -> 2 -> 3)
    tl.to(cards[0], {
      y: -700, rotation: -5, opacity: 1, filter: 'blur(8px)',
      duration: 25,
      ease: 'back.inOut(2)',
    }, 80)

    tl.to(cards[1], {
      y: -700, rotation: -5, opacity: 1, filter: 'blur(8px)',
      duration: 25,
      ease: 'back.inOut(2)',
    }, 90) // Delay 3 units

    tl.to(cards[2], {
      y: -700, rotation: -5, opacity: 1, filter: 'blur(8px)',
      duration: 40,
      ease: 'back.inOut(2)',
    }, 100) // Delay 3 units

    return () => {
      split1.revert()
      split2.revert()
      tl.kill()
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        overflow: 'visible',
        paddingTop:'0',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          width: '100vw',
          maxWidth: '1920px',
          margin: '0 auto',
          padding: '0 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {/* HEADING */}
        <div
          ref={headingRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            zIndex: 10,
          }}
        >
          <div
            ref={line1Ref}
            className="h1"
            style={{
              fontWeight: '900',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              color: 'var(--text)',
              marginBottom: '8px',
            }}
          >
            {HEADING.line1}
          </div>

          <div
            ref={line2Ref}
            className="h1"
            style={{
              fontWeight: '900',
              letterSpacing: '-0.03em',
              lineHeight: '1.05',
              color: 'var(--text)',
            }}
          >
            {HEADING.line2}
          </div>
        </div>

        {/* CARDS */}
        <div
          ref={cardsContainerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'center',
            gap: '24px',
            padding: '0 48px',
            zIndex: 5,
          }}
          className="intro-cards-container"
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => { cardRefs.current[i] = el }}
              style={{
                flex: '1 1 0',
                maxWidth: '340px',
                minWidth: '0',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                willChange: 'transform, opacity, filter',
                aspectRatio: '2.5 / 3.5',
              }}
              // onMouseEnter={(e) => {
              //   const el = e.currentTarget
              //   el.style.borderColor = 'var(--border-hover)'
              //   gsap.to(el, {
              //     y: -6,
              //     duration: 0.3,
              //     ease: 'power2.out',
              //   })
              // }}
              // onMouseLeave={(e) => {
              //   const el = e.currentTarget
              //   el.style.borderColor = 'var(--border)'
              //   gsap.to(el, {
              //     y: 0,
              //     duration: 0.3,
              //     ease: 'power2.out',
              //   })
              // }}
            >
              {/* IMAGE WRAPPER */}
              <div
                style={{
                  width: '100%',
                  height: '55%',
                  overflow: 'hidden',
                  background: 'var(--surface-2)',
                  position: 'relative',
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  // onMouseEnter={(e) => {
                  //   e.currentTarget.style.transform = 'scale(1.05)'
                  // }}
                  // onMouseLeave={(e) => {
                  //   e.currentTarget.style.transform = 'scale(1)'
                  // }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '16px',
                    right: '16px',
                    height: '2px',
                    background: 'var(--accent)',
                    opacity: 0.6,
                    borderRadius: '1px',
                  }}
                />
              </div>

              {/* Content Section */}
              <div
                style={{
                  padding: '20px 24px',
                  flex: '1 1 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  background: 'linear-gradient(to bottom, var(--surface) 0%, var(--surface-2) 100%)',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--accent)',
                    letterSpacing: '0.1em',
                    fontFamily: 'monospace',
                    marginBottom: '12px',
                    display: 'inline-block',
                  }}
                >
                  {step.num}
                </span>

                <h3
                  className="h4"
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--text)',
                    marginBottom: '10px',
                    lineHeight: '1.3',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.65',
                    flex: '1 1 auto',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .intro-cards-container {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
            padding: 0 24px !important;
          }
          .intro-cards-container > div {
            max-width: 100% !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}