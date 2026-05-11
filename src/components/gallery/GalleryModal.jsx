'use client'
import { useState } from 'react'
import { ControlsTab } from '@/components/animation-card/ControlsTab'
import { CodeTab } from '@/components/animation-card/CodeTab'
import { useGalleryCodeGenerator } from '@/hooks/useGalleryCodeGenerator'

export function GalleryModal({ item, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('controls')
  const [controlValues, setControlValues] = useState(() => {
    const d = {}
    item.controls.forEach((c) => {
      d[c.id] = c.default
    })
    return d
  })

  const code = useGalleryCodeGenerator(item.id, controlValues)

  const handleChange = (id, val) => {
    setControlValues((p) => ({ ...p, [id]: val }))
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          maxHeight: '80vh',
          background: 'var(--surface)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)' }}>
              {item.title}
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {item.category}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
          {['controls', 'code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px',
                background: 'transparent',
                color: activeTab === tab ? 'var(--text)' : 'var(--text-muted)',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
                fontSize: '12px',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {activeTab === 'controls' && (
            <ControlsTab
              controls={item.controls}
              values={controlValues}
              onChange={handleChange}
            />
          )}
          {activeTab === 'code' && <CodeTab codeString={code} />}
        </div>
      </div>
    </div>
  )
}
