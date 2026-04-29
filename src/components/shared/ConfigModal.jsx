'use client'

import { useEffect, useCallback } from 'react'
import { ControlsTab } from '@/components/animation-card/ControlsTab'
import { CodeTab }     from '@/components/animation-card/CodeTab'
import { useState }    from 'react'

/**
 * ConfigModal
 * ───────────
 * Fullscreen overlay popup with Controls | Code tabs.
 * Closes on backdrop click or Escape key.
 */
export function ConfigModal({ config, values, onChange, codeString, onClose }) {
  const [tab, setTab] = useState('controls')

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position:   'fixed',
        inset:      0,
        zIndex:     1000,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display:    'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:    '24px',
      }}
    >
      {/* Modal panel — stop propagation so clicks inside don't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background:   'var(--surface)',
          border:       '1px solid var(--border)',
          borderRadius: '14px',
          width:        '100%',
          maxWidth:     '480px',
          maxHeight:    '80vh',
          display:      'flex',
          flexDirection:'column',
          overflow:     'hidden',
          boxShadow:    '0 32px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{
          padding:      '16px 20px 0',
          borderBottom: '1px solid var(--border)',
          flexShrink:   0,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div>
              <p style={{ fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '3px' }}>
                Customize with code
              </p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text)' }}>
                {config.label}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: '1.5' }}>
                {config.description}
              </p>
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                width: '30px', height: '30px', flexShrink: 0,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: '6px', cursor: 'pointer', color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginLeft: '12px', transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex' }}>
            {['controls', 'code'].map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding:      '7px 16px',
                background:   'transparent',
                color:        tab === t ? 'var(--text)' : 'var(--text-muted)',
                border:       'none',
                borderBottom: tab === t ? '2px solid var(--accent)' : '2px solid transparent',
                fontSize:     '13px',
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

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: tab === 'code' ? '0' : '18px 20px' }}>
          {tab === 'controls' && (
            <ControlsTab controls={config.controls} values={values} onChange={onChange} />
          )}
          {tab === 'code' && <CodeTab codeString={codeString} />}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
          <p style={{ fontSize: '11px', color: 'var(--text-subtle)', textAlign: 'center' }}>
            Press <kbd style={{ padding: '1px 5px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '4px', fontSize: '10px' }}>Esc</kbd> or click outside to close
          </p>
        </div>
      </div>
    </div>
  )
}
