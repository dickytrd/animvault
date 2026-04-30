'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'  // ✅ Tambah useRef, useEffect
import { PreviewPane }   from './PreviewPane'
import { ControlPanel }  from './ControlPanel'
import { useDebounce }   from '@/hooks/useDebounce'
import { useCodeGenerator } from '@/hooks/useCodeGenerator'

export function AnimationCard({ config, index }) {

  // ── Control values state ──────────────────────────────────
  const [controlValues, setControlValues] = useState(() => {
    const defaults = {}
    config.controls.forEach((ctrl) => {
      defaults[ctrl.id] = ctrl.default
    })
    return defaults
  })

  const sectionRef = useRef(null)

  // ── Animation state machine ───────────────────────────────
  const [animState, setAnimState] = useState('idle')

  // ── Text content state ────────────────────────────────────
  const [headingText, setHeadingText] = useState(config.defaultText)
  const [subtext, setSubtext] = useState(config.defaultSubtext)

  // 🎯 NEW: Simpan initial defaults di ref (tidak pernah berubah)
  const initialDefaultsRef = useRef({
    heading: config.defaultText,
    subtext: config.defaultSubtext,
  })

  // Pastikan ref ter-set hanya sekali saat mount
  useEffect(() => {
    if (initialDefaultsRef.current.heading === undefined) {
      initialDefaultsRef.current = {
        heading: config.defaultText,
        subtext: config.defaultSubtext,
      }
    }
  }, [config.defaultText, config.defaultSubtext])

  // ── Trigger reload cycle ──────────────────────────────────
  const triggerReload = useCallback(() => {
    setAnimState('loading')
    setTimeout(() => setAnimState('animating'), 180)
  }, [])

  // ── Debounced reload for CONTROL changes ──────────────────
  const debouncedReload = useDebounce(triggerReload, 320)

  // ── Handle control change (sliders/selects) ───────────────
  const handleControlChange = useCallback((id, value) => {
    setControlValues((prev) => ({ ...prev, [id]: value }))
    debouncedReload()
  }, [debouncedReload])

  // ── Handle text change — NO AUTO-RELOAD ───────────────────
  const handleHeadingChange = useCallback((value) => {
    setHeadingText(value)
  }, [])

  const handleSubtextChange = useCallback((value) => {
    setSubtext(value)
  }, [])

  // 🎯 NEW: Manual trigger for Apply button
  const handleApplyText = useCallback(() => {
    if (animState === 'idle' || animState === 'complete') {
      triggerReload()
    }
  }, [animState, triggerReload])

  // 🎯 NEW: Reset to INITIAL defaults (from first load)
  const handleResetText = useCallback(() => {
    const initial = initialDefaultsRef.current
    setHeadingText(initial.heading || '')
    setSubtext(initial.subtext || '')
  }, [])

  // ── Handle state updates from PreviewPane ─────────────────
  const handleStateChange = useCallback((newState) => {
    const allowed = {
      idle:      ['loading'],
      loading:   ['animating'],
      animating: ['complete', 'loading'],
      complete:  ['loading'],
    }
    setAnimState((prev) => {
      if (allowed[prev]?.includes(newState)) return newState
      return prev
    })
    if (newState === 'loading') {
      setTimeout(() => setAnimState('animating'), 180)
    }
  }, [])

  // ── Derived code string ───────────────────────────────────
  const codeString = useCodeGenerator(config.id, controlValues)
  const sectionNumber = String(index + 1).padStart(2, '0')

  return (
    <section
  ref={sectionRef}
  id={config.id}
  data-animation-id={config.id}
  style={{
    padding: '80px 0',
    borderTop: '1px solid var(--border)',
    scrollMarginTop: '100px',
  }}
>
      
      {/* Section number badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {sectionNumber}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
      </div>

      {/* Left + Right layout */}
      <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
        
        {/* ── LEFT: Preview ── */}
        <PreviewPane
          animationKey={config.animationKey}
          controls={controlValues}
          text={headingText}
          subtext={subtext}
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
          headingText={headingText}
          subtext={subtext}
          onHeadingChange={handleHeadingChange}
          onSubtextChange={handleSubtextChange}
          onApplyText={handleApplyText}
          // 🎯 NEW: Pass reset handler
          onResetText={handleResetText}
          // 🎯 Pass initial defaults untuk fallback di TextTab
          initialDefaults={{
            heading: initialDefaultsRef.current.heading,
            subtext: initialDefaultsRef.current.subtext,
          }}
        />
      </div>
    </section>
  )
}