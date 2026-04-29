'use client'

import { useState, useCallback } from 'react'
import { ControlPanel } from '@/components/animation-card/ControlPanel'
import { useDebounce }  from '@/hooks/useDebounce'
import { useButtonCodeGenerator } from '@/hooks/useButtonCodeGenerator'
import { FillSlideBtn }  from '@/components/buttons/FillSlideBtn'
import { ArrowSlideBtn } from '@/components/buttons/ArrowSlideBtn'
import { RippleClickBtn }from '@/components/buttons/RippleClickBtn'
import { ScalePopBtn }   from '@/components/buttons/ScalePopBtn'
import { ShakeErrorBtn } from '@/components/buttons/ShakeErrorBtn'

const BUTTON_REGISTRY = { FillSlideBtn, ArrowSlideBtn, RippleClickBtn, ScalePopBtn, ShakeErrorBtn }

export function ButtonCard({ config, index }) {
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    config.controls.forEach((c) => { d[c.id] = c.default })
    return d
  })
  const [renderKey, setRenderKey] = useState(0)

  const debouncedRerender = useDebounce(() => setRenderKey((k) => k + 1), 350)

  const handleControlChange = useCallback((id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
    debouncedRerender()
  }, [debouncedRerender])

  const codeString = useButtonCodeGenerator(config.id, controlValues)
  const sectionNumber = String(index + 1).padStart(2, '0')
  const BtnComponent = BUTTON_REGISTRY[config.animationKey]

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{sectionNumber}</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        {/* LEFT — Button preview */}
        <div style={{
          flex: 1, minHeight: '320px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start', justifyContent: 'center',
          padding: '48px 52px 48px 0', gap: '20px',
        }}>
          <p style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Interactive Demo
          </p>
          {BtnComponent && (
            <BtnComponent
              key={renderKey}
              {...controlValues}
              label={config.label_button}
            />
          )}
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '8px' }}>
            {config.animationKey === 'RippleClickBtn' || config.animationKey === 'ShakeErrorBtn'
              ? '↑ Click the button'
              : '↑ Hover the button'}
          </p>
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
