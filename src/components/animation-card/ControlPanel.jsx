'use client'

import { useState } from 'react'
import { ControlsTab } from './ControlsTab'
import { CodeTab }     from './CodeTab'

const TABS = [
  { id: 'controls', label: 'Controls' },
  { id: 'code',     label: 'Code'     },
]

/**
 * ControlPanel
 * ────────────
 * Right panel. Two tabs: Controls | Code.
 * Tab state is local — doesn't affect animation state.
 */
export function ControlPanel({
  config,
  values,
  onChange,
  codeString,
  animationLabel,
  animationDescription,
}) {
  const [activeTab, setActiveTab] = useState('controls')

  return (
    <div style={{
      width:          '42%',
      flexShrink:     0,
      display:        'flex',
      flexDirection:  'column',
      border:         '1px solid var(--border)',
      borderRadius:   '10px',
      background:     'var(--surface)',
      overflow:       'hidden',
      // Fixed height so it doesn't grow with code content
      maxHeight:      '460px',
    }}>

      {/* ── Panel header ── */}
      <div style={{
        padding:      '16px 18px 0',
        borderBottom: '1px solid var(--border)',
        flexShrink:   0,
      }}>
        {/* Animation name + description */}
        <div style={{ marginBottom: '14px' }}>
          <p style={{
            fontSize:      '11px',
            color:         'var(--text-subtle)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom:  '4px',
          }}>
            Customize with code
          </p>
          <h3 style={{
            fontSize:   '14px',
            fontWeight: '600',
            color:      'var(--text)',
            marginBottom: '2px',
          }}>
            {animationLabel}
          </h3>
          <p style={{
            fontSize: '12px',
            color:    'var(--text-muted)',
            lineHeight: '1.5',
          }}>
            {animationDescription}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0' }}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding:         '8px 16px',
                  background:      'transparent',
                  color:           isActive ? 'var(--text)' : 'var(--text-muted)',
                  border:          'none',
                  borderBottom:    isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  fontSize:        '13px',
                  fontWeight:      isActive ? '500' : '400',
                  fontFamily:      'inherit',
                  cursor:          'pointer',
                  transition:      'all 0.15s ease',
                  marginBottom:    '-1px', // overlap the border-bottom of header
                  letterSpacing:   '0.01em',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Tab content ── */}
      <div style={{
        flex:     1,
        overflow: 'auto',
        padding:  activeTab === 'code' ? '0' : '18px',
      }}>
        {activeTab === 'controls' && (
          <ControlsTab
            controls={config}
            values={values}
            onChange={onChange}
          />
        )}
        {activeTab === 'code' && (
          <CodeTab codeString={codeString} />
        )}
      </div>
    </div>
  )
}
