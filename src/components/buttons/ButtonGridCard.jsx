'use client'

import { useState, useCallback } from 'react'
import { useDebounce }          from '@/hooks/useDebounce'
import { useButtonCodeGenerator } from '@/hooks/useButtonCodeGenerator'
import { ControlsTab }  from '@/components/animation-card/ControlsTab'
import { CodeTab }      from '@/components/animation-card/CodeTab'
import { FillSlideBtn }   from '@/components/buttons/FillSlideBtn'
import { ArrowSlideBtn }  from '@/components/buttons/ArrowSlideBtn'
import { RippleClickBtn } from '@/components/buttons/RippleClickBtn'
import { ScalePopBtn }    from '@/components/buttons/ScalePopBtn'
import { ShakeErrorBtn }  from '@/components/buttons/ShakeErrorBtn'
import { MagneticBtn } from '@/components/buttons/MagneticBtn'
import { ThreeDFlipBtn } from '@/components/buttons/ThreeDFlipBtn'
import { LiquidFillBtn } from '@/components/buttons/LiquidFillBtn'
import { MorphLoaderBtn } from '@/components/buttons/MorphLoaderBtn'
import { GlitchTextBtn } from '@/components/buttons/GlitchTextBtn'
import { PressHoldBtn } from '@/components/buttons/PressHoldBtn'
import { QuantumFluxBtn } from '@/components/buttons/QuantumFluxBtn'
import { HoloDecodeBtn } from '@/components/buttons/HoloDecodeBtn'
import { DataStreamBtn } from '@/components/buttons/DataStreamBtn'
import { CyberSliceBtn } from '@/components/buttons/CyberSliceBtn'

const REGISTRY = { 
  FillSlideBtn, 
  ArrowSlideBtn, 
  RippleClickBtn, 
  ScalePopBtn, 
  ShakeErrorBtn, 
  MagneticBtn,
  ThreeDFlipBtn,
  LiquidFillBtn,
  MorphLoaderBtn,
  GlitchTextBtn,
  PressHoldBtn,
  QuantumFluxBtn,
  HoloDecodeBtn,
  DataStreamBtn,
  CyberSliceBtn,
 }

const INTERACTION_HINT = {
  RippleClickBtn: 'Click the button',
  ShakeErrorBtn:  'Click the button',
  FillSlideBtn:   'Hover the button',
  ArrowSlideBtn:  'Hover the button',
  ScalePopBtn:    'Hover & click',
  MagneticBtn:    'Hover & move cursor',
  ThreeDFlipBtn:  'Hover to flip',
  LiquidFillBtn:  'Click to Fill',
  MorphLoaderBtn: 'Click to submit',
  GlitchTextBtn:   'Hover to glitch',
  PressHoldBtn:   'Hold to complete',
  QuantumFluxBtn: 'Hover to collapse',
  HoloDecodeBtn:  'Hover to decode',
  DataStreamBtn:  'Hover to converge',
  CyberSliceBtn:  'Hover to slice',
}

export function ButtonGridCard({ config }) {
  const [tab, setTab] = useState('controls')
  const [renderKey, setRenderKey] = useState(0)
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    config.controls.forEach((c) => { d[c.id] = c.default })
    return d
  })

  const debouncedRerender = useDebounce(() => setRenderKey((k) => k + 1), 350)

  const handleChange = useCallback((id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
    debouncedRerender()
  }, [debouncedRerender])

  const code = useButtonCodeGenerator(config.id, controlValues)
  const BtnComponent = REGISTRY[config.animationKey]
  const hint = INTERACTION_HINT[config.animationKey] || 'Interact'

  return (
    <div style={{
      background:   'var(--surface)',
      border:       '1px solid var(--border)',
      borderRadius: '12px',
      overflow:     'hidden',
      display:      'flex',
      flexDirection:'column',
    }}>

      {/* ── Top: Button Preview ── */}
      <div style={{
        padding:        '40px 24px 32px',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '12px',
        borderBottom:   '1px solid var(--border)',
        background:     'var(--bg)',
        minHeight:      '140px',
      }}>
        {BtnComponent && (
          <BtnComponent key={renderKey} {...controlValues} label={config.label_button} />
        )}
        <p style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.04em' }}>
          ↑ {hint}
        </p>
      </div>

      {/* ── Bottom: Config Panel ── */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Header */}
        <div style={{ padding: '14px 16px 0', borderBottom: '1px solid var(--border)' }}>
          <p style={{
            fontSize: '10px', color: 'var(--text-subtle)',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px',
          }}>
            Customize with code
          </p>
          <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '10px' }}>
            {config.label}
          </p>

          {/* Tabs */}
          <div style={{ display: 'flex' }}>
            {['controls', 'code'].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding:      '6px 14px',
                background:   'transparent',
                color:        tab === t ? 'var(--text)' : 'var(--text-muted)',
                border:       'none',
                borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
                fontSize:     '12px',
                fontWeight:   tab === t ? '500' : '400',
                fontFamily:   'inherit',
                cursor:       'pointer',
                marginBottom: '-1px',
                transition:   'all 0.15s ease',
                textTransform:'capitalize',
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{
          flex:     1,
          overflow: 'auto',
          padding:  tab === 'code' ? '0' : '14px 16px',
          maxHeight:'220px',
        }}>
          {tab === 'controls' && (
            <ControlsTab controls={config.controls} values={controlValues} onChange={handleChange} />
          )}
          {tab === 'code' && (
            <div style={{ fontSize: '11px' }}>
              <CodeTab codeString={code} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
