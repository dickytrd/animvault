'use client'

import { useState, useCallback, useMemo } from 'react'
import { PreviewPane }   from './PreviewPane'
import { ControlPanel }  from './ControlPanel'
import { useDebounce }   from '@/hooks/useDebounce'
import { useCodeGenerator } from '@/hooks/useCodeGenerator'

/**
 * AnimationCard
 * ─────────────
 * The core reusable unit. One card = one animation section.
 * Accepts a single `config` object from headingReveal.config.js.
 *
 * Responsibilities:
 * - Owns control values state
 * - Owns animation state machine (idle→loading→animating→complete)
 * - Debounces control changes → triggers reload cycle
 * - Derives code string (never stale via useMemo)
 * - Passes sliced props down to PreviewPane + ControlPanel
 *
 * @param {object} config  - one entry from headingRevealAnimations[]
 * @param {number} index   - section index (for numbering)
 */
export function AnimationCard({ config, index }) {

  // ── Control values state ──────────────────────────────────
  // Initialize from config defaults
  const [controlValues, setControlValues] = useState(() => {
    const defaults = {}
    config.controls.forEach((ctrl) => {
      defaults[ctrl.id] = ctrl.default
    })
    return defaults
  })

  // ── Animation state machine ───────────────────────────────
  // 'idle' | 'loading' | 'animating' | 'complete'
  const [animState, setAnimState] = useState('idle')

  // ── Trigger the load → animate cycle ─────────────────────
  const triggerReload = useCallback(() => {
    setAnimState('loading')
    // After one frame (skeleton visible), switch to animating
    // PreviewPane will pick this up in its useEffect
    setTimeout(() => setAnimState('animating'), 180)
  }, [])

  // ── Debounced version — used by control onChange ──────────
  const debouncedReload = useDebounce(triggerReload, 320)

  // ── Handle control change ─────────────────────────────────
  const handleControlChange = useCallback((id, value) => {
    setControlValues((prev) => ({ ...prev, [id]: value }))
    debouncedReload()
  }, [debouncedReload])

  // ── Handle state updates from PreviewPane ─────────────────
  const handleStateChange = useCallback((newState) => {
    // Guard: only allow valid transitions
    const allowed = {
      idle:      ['loading'],
      loading:   ['animating'],
      animating: ['complete', 'loading'],
      complete:  ['loading'],
    }
    setAnimState((prev) => {
      if (allowed[prev]?.includes(newState)) return newState
      return prev // block invalid transition
    })

    // If 'loading' triggered from Play/Replay button in PreviewPane,
    // kick off the animate transition
    if (newState === 'loading') {
      setTimeout(() => setAnimState('animating'), 180)
    }
  }, [])

  // ── Derived code string (never stale) ────────────────────
  const codeString = useCodeGenerator(config.id, controlValues)

  // ── Section number label ──────────────────────────────────
  const sectionNumber = String(index + 1).padStart(2, '0')

  return (
    <section
      style={{
        padding:   '80px 0',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Section number badge */}
      <div style={{
        display:       'flex',
        alignItems:    'center',
        gap:           '10px',
        marginBottom:  '36px',
      }}>
        <span style={{
          fontSize:      '11px',
          color:         'var(--text-subtle)',
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {sectionNumber}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Left + Right layout */}
      <div style={{
        display: 'flex',
        gap:     '48px',
        alignItems: 'flex-start',
      }}>
        {/* ── LEFT: Preview ── */}
        <PreviewPane
          animationKey={config.animationKey}
          controls={controlValues}
          text={config.defaultText}
          subtext={config.defaultSubtext}
          state={animState}
          onStateChange={handleStateChange}
        />

        {/* ── RIGHT: Controls + Code ── */}
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
