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
import { StaggerCards }    from '@/animations/content-reveal/StaggerCards'
import { FadeUpBatch }     from '@/animations/content-reveal/FadeUpBatch'
import { ClipSlideCards }  from '@/animations/content-reveal/ClipSlideCards'

const REGISTRY = {
  FadeUp, ClipReveal, StaggerChildren, ScaleReveal,
  SlideReveal, StaggerCards, FadeUpBatch, ClipSlideCards,
}

/* ─── Mini card content shown inside each preview section ── */
const CARDS = [
  {
    title: 'Lorem ipsum dolor sit',
    body:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan lectus non lorem convallis lobortis.',
  },
  {
    title: 'Lorem ipsum dolor sit',
    body:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan lectus non lorem convallis lobortis.',
  },
  {
    title: 'Lorem ipsum dolor sit',
    body:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan lectus non lorem convallis lobortis.',
  },
]

function MiniCard() {
  return (
    <div style={{
      flex:          1,
      background:    'var(--surface)',
      border:        '1px solid var(--border)',
      borderRadius:  '10px',
      overflow:      'hidden',
      display:       'flex',
      flexDirection: 'column',
    }}>
      {/* Image placeholder */}
      <div style={{
        width: '100%', aspectRatio: '16/9',
        background: 'var(--surface-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      {/* Text */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', lineHeight: '1.25', margin: 0 }}>
          Lorem ipsum dolor sit
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan lectus non lorem convallis lobortis.
        </p>
      </div>
    </div>
  )
}

export function ContentRevealSection({ config, index }) {
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    config.controls.forEach((c) => { d[c.id] = c.default })
    return d
  })

  const [state,     setState]     = useState('idle')
  const [modalOpen, setModalOpen] = useState(false)

  // Each animation targets either the whole container or its children
  const containerRef = useRef(null)
  const tweenRef     = useRef(null)
  const ctxRef       = useRef(null)

  const runAnimation = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const fn = REGISTRY[config.animationKey]
    if (!fn) return

    tweenRef.current?.kill()
    ctxRef.current?.revert()

    ctxRef.current = gsap.context(() => {
      tweenRef.current = fn({
        element:  el,
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

  useEffect(() => () => { tweenRef.current?.kill(); ctxRef.current?.revert() }, [])

  const triggerPlay = useCallback(() => {
    setState('loading')
    setTimeout(() => setState('animating'), 180)
  }, [])

  const debouncedReload = useDebounce(triggerPlay, 350)

  const handleChange = useCallback((id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
    debouncedReload()
  }, [debouncedReload])

  const code       = useContentRevealCodeGenerator(config.id, controlValues)
  const isLoading  = state === 'loading'
  const sectionNum = String(index + 1).padStart(2, '0')

  return (
    <>
      <section style={{ padding: '72px 0', borderTop: '1px solid var(--border)' }}>

        {/* Section number + label row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase', fontVariantNumeric: 'tabular-nums' }}>
            {sectionNum}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Animation name + description */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            {config.label}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '480px' }}>
            {config.description}
          </p>
        </div>

        {/* Preview container — bordered, realistic section feel */}
        <div style={{
          border:       '1px solid var(--border)',
          borderRadius: '14px',
          padding:      '28px',
          background:   'var(--bg)',
          position:     'relative',
          overflow:     'hidden',
          minHeight:    '280px',
        }}>
          {/* Skeleton overlay */}
          <div style={{
            position:      'absolute', inset: 0, padding: '28px',
            opacity:       isLoading ? 1 : 0,
            transition:    'opacity 0.15s ease',
            pointerEvents: 'none', zIndex: 10,
            background:    'var(--bg)',
            display:       'flex', gap: '16px',
          }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="skeleton-shimmer" style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px' }} />
                <div className="skeleton-shimmer" style={{ width: '80%', height: '14px', borderRadius: '4px' }} />
                <div className="skeleton-shimmer" style={{ width: '100%', height: '10px', borderRadius: '4px' }} />
                <div className="skeleton-shimmer" style={{ width: '70%', height: '10px', borderRadius: '4px' }} />
              </div>
            ))}
          </div>

          {/* The animated container — GSAP target.
              No opacity/transition here: React CSS + GSAP fighting
              the same property = broken animation on FadeUp/Scale.
              Skeleton overlay (zIndex 10) visually hides this during load. */}
          <div ref={containerRef} style={{ display: 'flex', gap: '16px' }}>
            <MiniCard />
            <MiniCard />
            <MiniCard />
          </div>
        </div>

        {/* Bottom action row */}
        <div style={{
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
          gap:            '10px',
          marginTop:      '20px',
        }}>
          {/* Replay */}
          <button
            onClick={() => { if (state !== 'animating') triggerPlay() }}
            style={{
              display:     'inline-flex', alignItems: 'center', gap: '6px',
              padding:     '10px 18px',
              background:  'var(--surface)',
              color:       'var(--text)',
              border:      '1px solid var(--border)',
              borderRadius:'8px', fontSize: '13px', fontWeight: '500',
              fontFamily:  'inherit',
              cursor:      state === 'animating' ? 'not-allowed' : 'pointer',
              opacity:     state === 'animating' ? 0.5 : 1,
              transition:  'all 0.2s ease',
            }}
            onMouseEnter={(e) => { if (state !== 'animating') e.currentTarget.style.borderColor = 'var(--border-hover)' }}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 .49-5.87"/>
            </svg>
            {state === 'idle' ? 'Play' : state === 'animating' ? 'Playing…' : state === 'loading' ? '…' : 'Replay'}
          </button>

          {/* Customize & Get Code */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display:        'inline-flex', alignItems: 'center', gap: '8px',
              padding:        '10px 24px',
              background:     'var(--accent)',
              color:          '#fff',
              border:         'none',
              borderRadius:   '8px', fontSize: '13px', fontWeight: '500',
              fontFamily:     'inherit', cursor: 'pointer',
              transition:     'background 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            Customize & Get Code
          </button>
        </div>
      </section>

      {/* Config Modal */}
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