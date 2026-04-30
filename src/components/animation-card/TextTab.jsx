'use client'

/**
 * TextTab
 * ───────
 * Dedicated tab for editing heading & subtext.
 * Features: Safe reset, outline Apply button (play icon), Enter key support.
 */
export function TextTab({
  headingText,
  subtext,
  onHeadingChange,
  onSubtextChange,
  onApply,
  defaultHeading,
  defaultSubtext,
  onReset,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <h4 style={{
          fontSize: '11px',
          color: 'var(--text-subtle)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '4px',
        }}>
          Edit Text Content
        </h4>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
          Edit text and click <strong>Apply</strong> to preview animation.
        </p>
      </div>

      {/* Heading Input */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Heading
        </label>
        <input
          type="text"
          value={headingText ?? ''}
          onChange={(e) => onHeadingChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onApply?.()
            }
          }}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--text)',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
          placeholder="Type your heading..."
          maxLength={80}
          onMouseEnter={(e) => e.target.style.borderColor = 'var(--border-hover)'}
          onMouseLeave={(e) => e.target.style.borderColor = 'var(--border)'}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent)'
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.15)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <p style={{ fontSize: '10px', color: 'var(--text-subtle)', marginTop: '4px' }}>
          {(headingText || '').length}/80 characters • Press Enter to apply
        </p>

        {/* 🎯 Small Outline Apply Button (Play Icon) */}
        {/* <button
          onClick={() => onApply?.()}
          title="Apply changes & replay (or press Enter)"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
            padding: '6px 12px',
            background: 'transparent',
            color: 'var(--accent)',
            border: '1px solid var(--accent)',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: '500',
            fontFamily: 'inherit',
            cursor: 'pointer',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Apply
        </button> */}
      </div>

      {/* Subtext Textarea */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginBottom: '6px',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
        }}>
          Subtext
        </label>
        <textarea
          value={subtext ?? ''}
          onChange={(e) => onSubtextChange?.(e.target.value)}
          rows={4}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--text)',
            fontSize: '13px',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            minHeight: '80px',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          }}
          placeholder="Type your subtext..."
          maxLength={300}
          onMouseEnter={(e) => e.target.style.borderColor = 'var(--border-hover)'}
          onMouseLeave={(e) => e.target.style.borderColor = 'var(--border)'}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent)'
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.15)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <p style={{ fontSize: '10px', color: 'var(--text-subtle)', marginTop: '4px' }}>
          {(subtext || '').length}/300 characters
        </p>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        paddingTop: '12px',
        borderTop: '1px solid var(--border)',
        marginTop: '4px',
      }}>
        <button
          onClick={() => onApply?.()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            background: 'var(--accent)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Apply Changes
        </button>

        {/* <button
          onClick={() => {
            // ✅ Safe reset: uses passed defaults (from useRef in AnimationCard)
            onHeadingChange?.(defaultHeading ?? '')
            onSubtextChange?.(defaultSubtext ?? '')
            onReset?.()
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            background: 'transparent',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--surface-2)'
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.borderColor = 'var(--border-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Reset
        </button> */}
      </div>
    </div>
  )
}