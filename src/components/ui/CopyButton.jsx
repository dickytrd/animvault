'use client'

import { useState, useCallback } from 'react'

export function CopyButton({ text, className = '' }) {
  const [status, setStatus] = useState('idle') // 'idle' | 'copied' | 'error'

  const handleCopy = useCallback(async () => {
    if (status !== 'idle') return
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }, [text, status])

  const label =
    status === 'copied' ? 'Copied!' :
    status === 'error'  ? 'Failed'  :
    'Copy Code'

  return (
    <button
      onClick={handleCopy}
      className={className}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '6px',
        padding:        '6px 12px',
        background:     status === 'copied' ? 'rgba(34,197,94,0.12)' : 'var(--surface-2)',
        color:          status === 'copied' ? '#4ade80' : 'var(--text-muted)',
        border:         `1px solid ${status === 'copied' ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
        borderRadius:   '6px',
        fontSize:       '12px',
        fontFamily:     'inherit',
        cursor:         status !== 'idle' ? 'default' : 'pointer',
        transition:     'all 0.2s ease',
        whiteSpace:     'nowrap',
        letterSpacing:  '0.02em',
      }}
    >
      {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
      {label}
    </button>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}
