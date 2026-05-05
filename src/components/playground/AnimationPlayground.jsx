'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

// ── Heading animations (ALL 30) ─────────────────────────────────
import { SplitFadeOpacity }     from '@/animations/heading-reveal/SplitFadeOpacity'
import { SplitFadeBlur }        from '@/animations/heading-reveal/SplitFadeBlur'
import { SplitMaskChar }        from '@/animations/heading-reveal/SplitMaskChar'
import { SplitMaskWord }        from '@/animations/heading-reveal/SplitMaskWord'
import { SplitSkewFade }        from '@/animations/heading-reveal/SplitSkewFade'
import { ScrambleReveal }       from '@/animations/heading-reveal/ScrambleReveal'
import { RotateIn3D }           from '@/animations/heading-reveal/RotateIn3d'
import { WaveChar }             from '@/animations/heading-reveal/WaveChar'
import { LineByLine }           from '@/animations/heading-reveal/LineByLine'
import { ScaleFade }            from '@/animations/heading-reveal/ScaleFade'
import { Typewriter }           from '@/animations/heading-reveal/Typewriter'
import { LetterCollapse }       from '@/animations/heading-reveal/LetterCollapse'
import { SlideFromLeft }        from '@/animations/heading-reveal/SlideFromLeft'
import { FadeSubtle }           from '@/animations/heading-reveal/FadeSubtle'
import { BottomMaskAssemble }   from '@/animations/heading-reveal/BottomMaskAssemble'
import { AlternatingYReveal }   from '@/animations/heading-reveal/AlternatingYReveal'
import { CharAssembleGlitch }   from '@/animations/heading-reveal/CharAssembleGlitch'
import { CinematicDepthReveal } from '@/animations/heading-reveal/CinematicDepthReveal'
import { FloatingZigzagNoMask } from '@/animations/heading-reveal/FloatingZigzagNoMask'
import { FloatingZigzagReveal } from '@/animations/heading-reveal/FloatingZigzagReveal'
import { GlitchChangeAssemble } from '@/animations/heading-reveal/GlitchChangeAssemble'
import { RandomMaskAssemble }   from '@/animations/heading-reveal/RandomMaskAssemble'
import { SliceGlitchReveal }    from '@/animations/heading-reveal/SliceGlitchReveal'
import { SliceMaskGlitch }      from '@/animations/heading-reveal/SliceMaskGlitch'
import { FlipWord3d }       from '@/animations/heading-reveal/FlipWord3d'
import { KineticSnapReveal }    from '@/animations/heading-reveal/KineticSnapReveal'
import { TrackingReveal }       from '@/animations/heading-reveal/TrackingReveal'
import { RadialBurstReveal }    from '@/animations/heading-reveal/RadialBurstReveal'
import { CenterOutCascade }     from '@/animations/heading-reveal/CenterOutCascade'
import { ElasticOvershoot }     from '@/animations/heading-reveal/ElasticOvershoot'

// ── Content animations ──────────────────────────────────────────
import { StaggerCards }         from '@/animations/content-reveal/StaggerCards'
import { ClipSlideCards }       from '@/animations/content-reveal/ClipSlideCards'
import { FadeUpBatch }          from '@/animations/content-reveal/FadeUpBatch'
import { ScaleReveal }          from '@/animations/content-reveal/ScaleReveal'
import { StaggerChildren }      from '@/animations/content-reveal/StaggerChildren'

// ── Button components (ALL) ─────────────────────────────────────
import { FillSlideBtn }         from '@/components/buttons/FillSlideBtn'
import { ArrowSlideBtn }        from '@/components/buttons/ArrowSlideBtn'
import { RippleClickBtn }       from '@/components/buttons/RippleClickBtn'
import { ScalePopBtn }          from '@/components/buttons/ScalePopBtn'
import { ShakeErrorBtn }        from '@/components/buttons/ShakeErrorBtn'
import { MagneticBtn }          from '@/components/buttons/MagneticBtn'
import { ThreeDFlipBtn }        from '@/components/buttons/ThreeDFlipBtn'
import { LiquidFillBtn }        from '@/components/buttons/LiquidFillBtn'
import { PressHoldBtn }         from '@/components/buttons/PressHoldBtn'
import { GlitchTextBtn }        from '@/components/buttons/GlitchTextBtn'
import { QuantumFluxBtn }       from '@/components/buttons/QuantumFluxBtn'
import { HoloDecodeBtn }        from '@/components/buttons/HoloDecodeBtn'
import { DataStreamBtn }        from '@/components/buttons/DataStreamBtn'
import { CyberSliceBtn }        from '@/components/buttons/CyberSliceBtn'

import {
  HEADING_ANIMS, CONTENT_ANIMS, BUTTON_ANIMS,
  PLAYGROUND_HEADING, PLAYGROUND_SUBTEXT,
} from '@/data/playground.data'

// ────────────────────────────────────────────────────────────────
// REGISTRIES
// ────────────────────────────────────────────────────────────────
const HEADING_REGISTRY = {
  SplitFadeOpacity, SplitFadeBlur, SplitMaskChar, SplitMaskWord,
  SplitSkewFade, ScrambleReveal, RotateIn3D, WaveChar, LineByLine,
  ScaleFade, Typewriter, LetterCollapse, SlideFromLeft, FadeSubtle,
  BottomMaskAssemble, AlternatingYReveal, CharAssembleGlitch,
  CinematicDepthReveal, FloatingZigzagNoMask, FloatingZigzagReveal,
  GlitchChangeAssemble, RandomMaskAssemble, SliceGlitchReveal,
  SliceMaskGlitch, FlipWord3d, KineticSnapReveal, TrackingReveal,
  RadialBurstReveal, CenterOutCascade, ElasticOvershoot,
}

const CONTENT_REGISTRY = {
  StaggerCards, ClipSlideCards, FadeUpBatch, ScaleReveal, StaggerChildren,
}

const BUTTON_REGISTRY = {
  FillSlideBtn, ArrowSlideBtn, RippleClickBtn, ScalePopBtn, ShakeErrorBtn,
  MagneticBtn, ThreeDFlipBtn, LiquidFillBtn, PressHoldBtn, GlitchTextBtn,
  QuantumFluxBtn, HoloDecodeBtn, DataStreamBtn, CyberSliceBtn,
}

const TABS = [
  { id: 'heading', label: 'Heading Reveal' },
  // { id: 'content', label: 'Content Reveal' },
  { id: 'button',  label: 'Button Hover'   },
]

const TAB_ROUTES = {
  heading: '/heading-reveal',
  content: '/content-reveal',
  button: '/buttons',
}

// ────────────────────────────────────────────────────────────────
// MINI CARD COMPONENT (Fixed Size)
// ────────────────────────────────────────────────────────────────
function MiniCard({ highlight }) {
  return (
    <div style={{
      flex:          1,
      minWidth:      0,
      background:    'var(--surface)',
      border:        `1px solid ${highlight ? 'var(--accent)' : 'var(--border)'}`,
      borderRadius:  '12px',
      overflow:      'hidden',
      transition:    'all 0.4s ease',
      display:       'flex',
      flexDirection: 'column',
    }}>
      <div style={{ aspectRatio:'16/9', background:'var(--surface-2)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <div style={{ padding:'18px', display:'flex', flexDirection:'column', gap:'10px' }}>
        <div style={{ height:'14px', width:'75%', background:'var(--border)', borderRadius:'4px' }} />
        <div style={{ height:'12px', width:'100%', background:'var(--border)', borderRadius:'4px', opacity:0.6 }} />
        <div style={{ height:'12px', width:'65%', background:'var(--border)', borderRadius:'4px', opacity:0.4 }} />
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// VARIANT POPUP (Fixed Scroll Lock)
// ────────────────────────────────────────────────────────────────
function VariantPopup({ isOpen, onClose, variants, currentIndex, onSelect }) {
  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '28px',
          maxWidth: '560px',
          width: '90%',
          maxHeight: '75vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          transform: 'scale(1)',
          animation: 'popupIn 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>Select Variant</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 0' }}>
              {currentIndex + 1} of {variants.length} selected
            </p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--border)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface-2)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px' }}>
          {variants.map((v, i) => (
            <button
              key={v.key}
              onClick={() => { onSelect(i); onClose(); }}
              style={{
                padding: '14px 8px',
                borderRadius: '10px',
                border: i === currentIndex ? '2px solid var(--accent)' : '1px solid var(--border)',
                background: i === currentIndex ? 'var(--accent-dim)' : 'var(--surface-2)',
                color: i === currentIndex ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: i === currentIndex ? '700' : '500',
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontVariantNumeric: 'tabular-nums',
              }}
              onMouseEnter={(e) => {
                if (i !== currentIndex) {
                  e.currentTarget.style.borderColor = 'var(--border-hover)'
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.background = 'var(--border)'
                }
              }}
              onMouseLeave={(e) => {
                if (i !== currentIndex) {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'var(--surface-2)'
                }
              }}
            >
              {v.num}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────
// ANIMATION PLAYGROUND
// ────────────────────────────────────────────────────────────────
export function AnimationPlayground() {
  const router = useRouter()
  const [tab,           setTab]           = useState('heading')
  const [hIdx,          setHIdx]          = useState(0)
  const [cIdx,          setCIdx]          = useState(0)
  const [bIdx,          setBIdx]          = useState(0)
  const [state,         setState]         = useState('idle')
  const [btnKey,        setBtnKey]        = useState(0)
  const [showPopup,     setShowPopup]     = useState(false)
  const isAnimatingRef  = useRef(false)

  const headingRef   = useRef(null)
  const cardsRef     = useRef(null)
  const splitRef     = useRef(null)
  const tweenRef     = useRef(null)
  const gsapCtxRef   = useRef(null)

  const headingAnim  = HEADING_ANIMS[hIdx]
  const contentAnim  = CONTENT_ANIMS[cIdx]
  const buttonAnim   = BUTTON_ANIMS[bIdx]

  const cleanup = useCallback(() => {
    isAnimatingRef.current = false
    tweenRef.current?.kill()
    gsapCtxRef.current?.revert()
    tweenRef.current  = null
    gsapCtxRef.current = null
    if (splitRef.current) {
      try { splitRef.current.revert?.() } catch {}
      splitRef.current = null
    }
  }, [])

  const runHeading = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    
    const el = headingRef.current
    if (!el) { setState('complete'); return }
    const fn = HEADING_REGISTRY[headingAnim.key]
    if (!fn) { setState('complete'); isAnimatingRef.current = false; return }

    cleanup()
    setState('animating')

    gsapCtxRef.current = gsap.context(() => {
      tweenRef.current = fn({
        element:    el,
        splitRef,
        controls:   headingAnim.controls,
        onComplete: () => {
          setState('complete')
          isAnimatingRef.current = false
        },
      })
    })
  }, [headingAnim, cleanup])

  const runContent = useCallback(() => {
    if (isAnimatingRef.current) return
    isAnimatingRef.current = true
    
    const el = cardsRef.current
    if (!el) { setState('complete'); return }
    const fn = CONTENT_REGISTRY[contentAnim.key]
    if (!fn) { setState('complete'); isAnimatingRef.current = false; return }

    cleanup()
    setState('animating')

    gsapCtxRef.current = gsap.context(() => {
      tweenRef.current = fn({
        element:    el,
        controls:   contentAnim.controls,
        onComplete: () => {
          setState('complete')
          isAnimatingRef.current = false
        },
      })
    })
  }, [contentAnim, cleanup])

  const replay = useCallback(() => {
    if (state === 'animating' || isAnimatingRef.current) return
    setState('idle')
    setTimeout(() => {
      if (tab === 'heading') runHeading()
      if (tab === 'content') runContent()
      if (tab === 'button')  { setBtnKey(k => k + 1); setState('complete') }
    }, 100)
  }, [state, tab, runHeading, runContent])

  // Auto-play when tab or variant changes
  useEffect(() => {
    if (isAnimatingRef.current) return
    cleanup()
    setState('idle')
    const t = setTimeout(() => {
      if (tab === 'heading') runHeading()
      if (tab === 'content') runContent()
      if (tab === 'button')  { setBtnKey(k => k + 1); setState('complete') }
    }, 200)
    return () => clearTimeout(t)
  }, [tab, hIdx, cIdx, bIdx])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
      document.body.style.overflow = ''
    }
  }, [cleanup])

  const shuffle = () => {
    if (state === 'animating' || isAnimatingRef.current) return
    if (tab === 'heading') setHIdx(Math.floor(Math.random() * HEADING_ANIMS.length))
    if (tab === 'content') setCIdx(Math.floor(Math.random() * CONTENT_ANIMS.length))
    if (tab === 'button')  setBIdx(Math.floor(Math.random() * BUTTON_ANIMS.length))
  }

  const currentAnims = tab === 'heading' ? HEADING_ANIMS : tab === 'content' ? CONTENT_ANIMS : BUTTON_ANIMS
  const currentIdx   = tab === 'heading' ? hIdx : tab === 'content' ? cIdx : bIdx
  const setCurrentIdx = tab === 'heading' ? setHIdx : tab === 'content' ? setCIdx : setBIdx
  const currentAnim  = currentAnims[currentIdx]

  const BtnComponent = BUTTON_REGISTRY[buttonAnim.key]
  const { btnLabel, hint, key: _k, num: _n, label: _l, hintType: _h, ...btnProps } = buttonAnim

  const handleGetCode = () => {
    const route = TAB_ROUTES[tab]
    if (route) router.push(route)
  }

  return (
    <section style={{ 
      padding: '120px 0 80px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      borderTop: '1px solid var(--border)',
    }}>
      {/* ── Header ── */}
      <div style={{ padding: '0 48px 48px', textAlign: 'center' }}>
        <p style={{ 
          fontSize: '11px', 
          fontWeight: '600', 
          letterSpacing: '0.15em', 
          textTransform: 'uppercase', 
          color: 'var(--accent)', 
          marginBottom: '16px',
        }}>
          05 — Playground
        </p>
        <h2 className="h2" style={{ marginBottom: '12px' }}>
          Try the Animations
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-muted)', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>
          Switch types, cycle variants, and replay animations in real time.
        </p>
      </div>

      {/* ── Control Bar ── */}
      <div style={{ 
        margin: '0 48px 0',
        padding: '18px 28px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        flexWrap: 'wrap',
        position: 'relative',
      }}>
        {/* Left: Type Selector */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {TABS.map(t => (
            <button 
              key={t.id} 
              onClick={() => setTab(t.id)} 
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: tab === t.id ? 'var(--accent)' : 'var(--surface-2)',
                color: tab === t.id ? '#fff' : 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: tab === t.id ? '600' : '500',
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (tab !== t.id) {
                  e.currentTarget.style.background = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text)'
                }
              }}
              onMouseLeave={(e) => {
                if (tab !== t.id) {
                  e.currentTarget.style.background = 'var(--surface-2)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Center: Variant Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={() => {
              if (state !== 'animating' && !isAnimatingRef.current) {
                setCurrentIdx(i => Math.max(0, i - 1))
              }
            }} 
            disabled={currentIdx === 0 || state === 'animating'}
            style={{
              padding: '8px 14px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: currentIdx === 0 || state === 'animating' ? 'var(--text-subtle)' : 'var(--text)',
              fontSize: '12px',
              cursor: currentIdx === 0 || state === 'animating' ? 'not-allowed' : 'pointer',
              opacity: currentIdx === 0 || state === 'animating' ? 0.4 : 1,
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
          >
            ← Prev
          </button>

          <button
            onClick={() => setShowPopup(true)}
            disabled={state === 'animating'}
            style={{
              padding: '8px 24px',
              background: state === 'animating' ? 'var(--surface-2)' : 'var(--accent-dim)',
              border: `1px solid ${state === 'animating' ? 'var(--border)' : 'var(--accent)'}`,
              borderRadius: '6px',
              color: state === 'animating' ? 'var(--text-subtle)' : 'var(--accent)',
              fontSize: '13px',
              fontWeight: '600',
              cursor: state === 'animating' ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit',
              fontVariantNumeric: 'tabular-nums',
              transition: 'all 0.15s',
              minWidth: '120px',
              opacity: state === 'animating' ? 0.5 : 1,
            }}
          >
            {currentIdx + 1} / {currentAnims.length}
          </button>

          <button 
            onClick={() => {
              if (state !== 'animating' && !isAnimatingRef.current) {
                setCurrentIdx(i => Math.min(currentAnims.length - 1, i + 1))
              }
            }} 
            disabled={currentIdx === currentAnims.length - 1 || state === 'animating'}
            style={{
              padding: '8px 14px',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: currentIdx === currentAnims.length - 1 || state === 'animating' ? 'var(--text-subtle)' : 'var(--text)',
              fontSize: '12px',
              cursor: currentIdx === currentAnims.length - 1 || state === 'animating' ? 'not-allowed' : 'pointer',
              opacity: currentIdx === currentAnims.length - 1 || state === 'animating' ? 0.4 : 1,
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
          >
            Next →
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={shuffle} 
            disabled={state === 'animating'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: state === 'animating' ? 'var(--surface-2)' : 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: state === 'animating' ? 'var(--text-subtle)' : 'var(--text-muted)',
              fontSize: '12px',
              fontFamily: 'inherit',
              cursor: state === 'animating' ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
              opacity: state === 'animating' ? 0.5 : 1,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"/>
              <line x1="4" y1="20" x2="21" y2="3"/>
              <polyline points="21 16 21 21 16 21"/>
              <line x1="15" y1="15" x2="21" y2="21"/>
            </svg>
            Shuffle
          </button>

          <button 
            onClick={replay} 
            disabled={state === 'animating'} 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: state === 'animating' ? 'var(--surface-2)' : 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'inherit',
              cursor: state === 'animating' ? 'not-allowed' : 'pointer',
              opacity: state === 'animating' ? 0.5 : 1,
              transition: 'all 0.15s',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-5.87"/>
            </svg>
            {state === 'animating' ? 'Playing…' : 'Replay'}
          </button>
        </div>

        {/* Playing Indicator (Small, Smooth, Right Side of Bar) */}
        {state === 'animating' && (
          <div style={{
            position: 'absolute',
            bottom: '-36px',
            right: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            background: 'var(--surface)',
            border: '1px solid var(--accent)',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(37, 99, 255, 0.15)',
            animation: 'indicatorSlide 0.3s ease-out',
          }}>
            <span style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: 'var(--accent)',
              animation: 'indicatorPulse 1.2s ease-in-out infinite',
            }} />
            <span style={{ 
              fontSize: '11px', 
              color: 'var(--accent)', 
              letterSpacing: '0.04em',
              fontWeight: '600',
            }}>
              Playing
            </span>
          </div>
        )}
      </div>

      {/* ── Playground Stage ── */}
      <div style={{
        margin: '0 48px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        minHeight: '65vh',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Stage Header */}
        <div style={{ 
          padding: '16px 32px', 
          borderBottom: '1px solid var(--border)', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px', 
          background: 'var(--surface-2)',
        }}>
          {['#ff5f57', '#ffbd2e', '#28ca41'].map(c => (
            <span key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, opacity: 0.8 }} />
          ))}
          <span style={{ fontSize: '12px', color: 'var(--text-subtle)', marginLeft: '8px', letterSpacing: '0.04em' }}>
            AnimVault Playground — {TABS.find(t => t.id === tab)?.label}
          </span>
        </div>

        {/* Stage Body */}
        <div style={{ 
          flex: 1, 
          padding: '80px 60px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '48px', 
          justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Heading Section */}
          <div style={{ 
            opacity: tab === 'heading' ? 1 : 0.25, 
            transition: 'opacity 0.5s ease',
            textAlign: 'center',
          }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '6px 14px', 
              border: `1px solid ${tab === 'heading' ? 'var(--accent)' : 'var(--border)'}`, 
              borderRadius: '20px', 
              marginBottom: '24px',
              background: tab === 'heading' ? 'var(--accent-dim)' : 'transparent',
            }}>
              <span style={{ fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600' }}>
                {tab === 'heading' ? headingAnim.label : 'Heading Reveal'}
              </span>
            </div>

            <h2
              ref={headingRef}
              style={{
                fontSize:      'clamp(36px, 5vw, 64px)',
                fontWeight:    '800',
                color:         'var(--text)',
                lineHeight:    '1.1',
                letterSpacing: '-0.02em',
                marginBottom:  '16px',
                overflow:      'hidden',
                wordBreak:     'break-word',
              }}
            >
              {PLAYGROUND_HEADING}
            </h2>

            <p style={{ fontSize: '16px', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
              {PLAYGROUND_SUBTEXT}
            </p>
          </div>

          {/* Content Cards Section */}
          <div
            ref={cardsRef}
            style={{
              display:  'flex',
              gap:      '20px',
              opacity:  tab === 'content' ? 1 : 0.25,
              transition: 'opacity 0.5s ease',
            }}
          >
            <MiniCard highlight={tab === 'content'} />
            <MiniCard highlight={tab === 'content'} />
            <MiniCard highlight={tab === 'content'} />
          </div>

          {/* Button Section */}
          <div style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '20px',
            opacity:        tab === 'button' ? 1 : 0.25,
            transition:     'opacity 0.5s ease',
            minHeight:      '80px',
          }}>
            {BtnComponent && tab === 'button' && (
              <BtnComponent key={btnKey} {...btnProps} label={btnLabel} />
            )}
            {tab !== 'button' && (
              <div style={{ 
                padding: '14px 32px', 
                background: 'var(--accent)', 
                borderRadius: '10px', 
                fontSize: '14px', 
                fontWeight: '600', 
                color: 'rgba(255,255,255,0.4)',
                opacity: 0.4,
              }}>
                Button Preview
              </div>
            )}
            {tab === 'button' && (
              <p style={{ fontSize: '13px', color: 'var(--text-subtle)', fontStyle: 'italic', marginLeft: '8px' }}>
                ↑ {hint}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Get Code Button ── */}
      <div style={{ 
        margin: '32px 48px 0',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <button
          onClick={handleGetCode}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 32px',
            background: 'var(--accent)',
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'inherit',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 12px rgba(37, 99, 255, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 255, 0.2)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
          Get Code for {currentAnim.label}
        </button>
      </div>

      {/* Variant Popup */}
      <VariantPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        variants={currentAnims}
        currentIndex={currentIdx}
        onSelect={setCurrentIdx}
      />

      {/* Animations */}
      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes indicatorSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes indicatorPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  )
}