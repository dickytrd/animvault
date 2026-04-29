'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { gsap }           from '@/lib/gsap'
import { useDebounce }    from '@/hooks/useDebounce'
import { ConfigModal }    from '@/components/shared/ConfigModal'
import { useContentRevealCodeGenerator } from '@/hooks/useContentRevealCodeGenerator'

import { FadeUp }          from '@/animations/content-reveal/FadeUp'
import { ClipReveal }      from '@/animations/content-reveal/ClipReveal'
import { StaggerChildren } from '@/animations/content-reveal/StaggerChildren'
import { ScaleReveal }     from '@/animations/content-reveal/ScaleReveal'
import { SlideReveal }     from '@/animations/content-reveal/SlideReveal'

const REGISTRY = { FadeUp, ClipReveal, StaggerChildren, ScaleReveal, SlideReveal }

export function ContentRevealGridCard({ config }) {
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    config.controls.forEach((c) => { d[c.id] = c.default })
    return d
  })
  const [state,       setState]    = useState('idle')   // idle | loading | animating | complete
  const [modalOpen,   setModalOpen] = useState(false)

  const contentRef = useRef(null)
  const tweenRef   = useRef(null)
  const ctxRef     = useRef(null)

  const runAnimation = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const fn = REGISTRY[config.animationKey]
    if (!fn) return

    tweenRef.current?.kill()
    ctxRef.current?.revert()

    ctxRef.current = gsap.context(() => {
      tweenRef.current = fn({ element: el, controls: controlValues, onComplete: () => setState('complete') })
    })
  }, [config.animationKey, controlValues])

  useEffect(() => {
    if (state === 'animating') {
      const raf = requestAnimationFrame(() => runAnimation())
      return () => cancelAnimationFrame(raf)
    }
  }, [state, runAnimation])

  useEffect(() => () => { tweenRef.current?.kill(); ctxRef.current?.revert() }, [])

  const triggerPlay = useCallback(() => {
    setState('loading')
    setTimeout(() => setState('animating'), 160)
  }, [])

  const debouncedReload = useDebounce(triggerPlay, 350)

  const handleChange = useCallback((id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
    debouncedReload()
  }, [debouncedReload])

  const code = useContentRevealCodeGenerator(config.id, controlValues)
  const isLoading = state === 'loading'

  return (
    <>
      <div style={{
        background:    'var(--surface)',
        border:        '1px solid var(--border)',
        borderRadius:  '12px',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
      }}>

        {/* ── Content Preview ── */}
        <div style={{
          padding:  '20px',
          flex:     1,
          position: 'relative',
          overflow: 'hidden',
          minHeight:'320px',
          display:  'flex',
          flexDirection: 'column',
        }}>

          {/* Skeleton overlay */}
          <div style={{
            position:   'absolute', inset: 0, padding: '20px',
            opacity:    isLoading ? 1 : 0,
            transition: 'opacity 0.15s ease',
            pointerEvents: 'none', zIndex: 10,
            background: 'var(--surface)',
            display: 'flex', flexDirection: 'column', gap: '10px',
          }}>
            <div className="skeleton-shimmer" style={{ width: '100%', height: '140px', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ width: '45%', height: '10px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '80%', height: '18px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '100%', height: '10px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '70%', height: '10px', borderRadius: '4px' }} />
          </div>

          {/* Animated content */}
          <div
            ref={contentRef}
            style={{
              opacity:    isLoading ? 0 : 1,
              transition: 'opacity 0.15s ease',
              display: 'flex', flexDirection: 'column', gap: '12px', flex: 1,
            }}
          >
            {/* Image placeholder */}
            <div style={{
              width: '100%', flex: 1, minHeight: '140px',
              background: 'var(--surface-2)', borderRadius: '8px',
              border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            {/* Tag */}
            <span style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600' }}>
              Sample Tag
            </span>
            {/* Title */}
            <p style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.2', letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>
              Lorem ipsum dolor sit
            </p>
            {/* Body */}
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan lectus non lorem convallis lobortis.
            </p>
          </div>
        </div>

        {/* ── Footer: Play + Config button ── */}
        <div style={{
          display:     'flex',
          gap:         '8px',
          padding:     '12px 16px',
          borderTop:   '1px solid var(--border)',
          background:  'var(--surface)',
        }}>
          {/* Replay */}
          <button
            onClick={() => { if (state !== 'animating') triggerPlay() }}
            style={{
              display:     'inline-flex',
              alignItems:  'center',
              gap:         '5px',
              padding:     '8px 12px',
              background:  state === 'complete' ? 'var(--accent)' : 'var(--surface-2)',
              color:       'var(--text)',
              border:      `1px solid ${state === 'complete' ? 'transparent' : 'var(--border)'}`,
              borderRadius:'6px',
              fontSize:    '12px',
              fontWeight:  '500',
              fontFamily:  'inherit',
              cursor:      state === 'animating' ? 'not-allowed' : 'pointer',
              opacity:     state === 'animating' ? 0.5 : 1,
              transition:  'all 0.2s ease',
              flexShrink:  0,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-5.87"/>
            </svg>
            {state === 'idle' ? 'Play' : state === 'animating' ? 'Playing…' : state === 'loading' ? '…' : 'Replay'}
          </button>

          {/* Customize & Get Code */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              flex:        1,
              display:     'inline-flex',
              alignItems:  'center',
              justifyContent: 'center',
              gap:         '6px',
              padding:     '8px 12px',
              background:  'var(--accent)',
              color:       '#fff',
              border:      '1px solid transparent',
              borderRadius:'6px',
              fontSize:    '12px',
              fontWeight:  '500',
              fontFamily:  'inherit',
              cursor:      'pointer',
              transition:  'background 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            Customize & Get Code
          </button>
        </div>
      </div>

      {/* ── Config Modal ── */}
      {modalOpen && (
        <ConfigModal
          config={config}
          values={controlValues}
          onChange={handleChange}
          codeString={code}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
