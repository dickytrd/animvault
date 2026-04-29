'use client'

import { useState, useCallback } from 'react'
import { ControlPanel } from '@/components/animation-card/ControlPanel'
import { useDebounce }  from '@/hooks/useDebounce'
import { useLoaderCodeGenerator } from '@/hooks/useLoaderCodeGenerator'
import { DotsWave }    from '@/components/loaders/DotsWave'
import { ProgressBar } from '@/components/loaders/ProgressBar'
import { PulseRing }   from '@/components/loaders/PulseRing'
import { SpinnerArc }  from '@/components/loaders/SpinnerArc'
import { BounceDots }  from '@/components/loaders/BounceDots'

const LOADER_REGISTRY = { DotsWave, ProgressBar, PulseRing, SpinnerArc, BounceDots }

const LOADER_DEFAULTS = {
  DotsWave:    { color: '#ffffff', trackColor: 'rgba(255,255,255,0.08)' },
  ProgressBar: { color: '#ffffff', trackColor: 'rgba(255,255,255,0.08)' },
  PulseRing:   { color: '#ffffff' },
  SpinnerArc:  { color: '#ffffff' },
  BounceDots:  { color: '#ffffff' },
}

export function LoaderCard({ config, index }) {
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    config.controls.forEach((c) => { d[c.id] = c.default })
    return d
  })

  // Loader re-renders with new props when controls change — GSAP handles via useEffect deps
  const [renderKey, setRenderKey] = useState(0)

  const triggerRerender = useCallback(() => setRenderKey((k) => k + 1), [])
  const debouncedRerender = useDebounce(triggerRerender, 350)

  const handleControlChange = useCallback((id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
    debouncedRerender()
  }, [debouncedRerender])

  const codeString = useLoaderCodeGenerator(config.id, controlValues)
  const sectionNumber = String(index + 1).padStart(2, '0')

  const LoaderComponent = LOADER_REGISTRY[config.animationKey]
  const defaults = LOADER_DEFAULTS[config.animationKey] || {}

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sectionNumber}</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        {/* LEFT — Loader preview */}
        <div style={{
          flex: 1, minHeight: '320px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '48px 52px 48px 0',
          position: 'relative',
        }}>
          {/* Subtle grid dot background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            borderRadius: '8px',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            {LoaderComponent && (
              <LoaderComponent
                key={renderKey}
                {...controlValues}
                {...defaults}
              />
            )}
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
