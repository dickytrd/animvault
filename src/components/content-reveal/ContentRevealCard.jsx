'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'
import { ControlPanel }  from '@/components/animation-card/ControlPanel'
import { useDebounce }   from '@/hooks/useDebounce'
import { FadeUp }        from '@/animations/content-reveal/FadeUp'
import { ClipReveal }    from '@/animations/content-reveal/ClipReveal'
import { StaggerChildren } from '@/animations/content-reveal/StaggerChildren'
import { ScaleReveal }   from '@/animations/content-reveal/ScaleReveal'
import { SlideReveal }   from '@/animations/content-reveal/SlideReveal'
import { useContentRevealCodeGenerator } from '@/hooks/useContentRevealCodeGenerator'

const REGISTRY = { FadeUp, ClipReveal, StaggerChildren, ScaleReveal, SlideReveal }

export function ContentRevealCard({ config, index }) {
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    config.controls.forEach((c) => { d[c.id] = c.default })
    return d
  })
  const [state, setState] = useState('idle')

  const contentRef  = useRef(null)
  const tweenRef    = useRef(null)
  const gsapCtxRef  = useRef(null)

  const runAnimation = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const fn = REGISTRY[config.animationKey]
    if (!fn) return

    tweenRef.current?.kill()
    gsapCtxRef.current?.revert()

    gsapCtxRef.current = gsap.context(() => {
      tweenRef.current = fn({
        element: el,
        controls: controlValues,
        onComplete: () => setState('complete'),
      })
    })
  }, [config.animationKey, controlValues])

  useEffect(() => {
    if (state === 'animating') {
      const raf = requestAnimationFrame(() => runAnimation())
      return () => cancelAnimationFrame(raf)
    }
  }, [state, runAnimation])

  useEffect(() => () => { tweenRef.current?.kill(); gsapCtxRef.current?.revert() }, [])

  const triggerReload = useCallback(() => {
    setState('loading')
    setTimeout(() => setState('animating'), 160)
  }, [])

  const debouncedReload = useDebounce(triggerReload, 320)

  const handleControlChange = useCallback((id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
    debouncedReload()
  }, [debouncedReload])

  const handleStateChange = useCallback((newState) => {
    setState(newState)
    if (newState === 'loading') setTimeout(() => setState('animating'), 160)
  }, [])

  const codeString = useContentRevealCodeGenerator(config.id, controlValues)
  const sectionNumber = String(index + 1).padStart(2, '0')
  const isLoading = state === 'loading'

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sectionNumber}</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        {/* LEFT — Content Preview */}
        <div style={{ flex: 1, position: 'relative', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '48px 52px 48px 0', overflow: 'hidden' }}>

          {/* Skeleton */}
          <div style={{ position: 'absolute', inset: 0, opacity: isLoading ? 1 : 0, transition: 'opacity 0.15s ease', pointerEvents: 'none', zIndex: 10, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            <div className="skeleton-shimmer" style={{ width: '100%', height: '140px', borderRadius: '8px' }} />
            <div className="skeleton-shimmer" style={{ width: '40%', height: '12px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '75%', height: '22px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '90%', height: '12px', borderRadius: '4px' }} />
            <div className="skeleton-shimmer" style={{ width: '65%', height: '12px', borderRadius: '4px' }} />
          </div>

          {/* Actual content */}
          <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.15s ease' }}>
            {/* The animated content block */}
            <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px' }}>
              {/* Image placeholder */}
              <div style={{ width: '100%', height: '160px', background: 'var(--surface-2)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              {/* Tag */}
              <span style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: '600' }}>
                Sample Tag
              </span>
              {/* Heading */}
              <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: '700', lineHeight: '1.15', letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>
                This is a Content Card Heading
              </h3>
              {/* Body */}
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.65', margin: 0 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan lectus non lorem convallis lobortis.
              </p>
            </div>

            {/* Replay button — below the card */}
            <button
              onClick={() => { if (state !== 'animating') handleStateChange('loading') }}
              style={{
                marginTop: '28px', display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 20px', background: state === 'complete' ? 'var(--accent)' : 'var(--surface-2)',
                color: 'var(--text)', border: `1px solid ${state === 'complete' ? 'transparent' : 'var(--border)'}`,
                borderRadius: '6px', fontSize: '13px', fontWeight: '500', fontFamily: 'inherit',
                cursor: state === 'animating' ? 'not-allowed' : 'pointer', opacity: state === 'animating' ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-5.87"/>
              </svg>
              {state === 'idle' ? 'Play' : state === 'animating' ? 'Playing…' : state === 'loading' ? 'Loading…' : 'Replay'}
            </button>
          </div>
        </div>

        {/* RIGHT — Controls */}
        <ControlPanel
          config={config.controls}
          values={controlValues}
          onChange={handleControlChange}
          codeString={codeString}
          animationLabel={config.label}
          animationDescription={config.description}
        />
      </div>
    </section>
  )
}
