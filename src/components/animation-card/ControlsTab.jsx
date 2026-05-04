'use client'

/**
 * ControlsTab
 * ───────────
 * Renders control inputs (sliders, selects, toggles) based on config.
 */
export function ControlsTab({ controls, values, onChange }) {
  if (!controls || controls.length === 0) {
    return (
      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
        No controls available for this animation.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {controls.map((control) => {
        const value = values[control.id]

        // 🔹 TOGGLE INPUT
        if (control.type === 'toggle') {
          return (
            <div key={control.id}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                padding: '8px 0',
              }}>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {control.label}
                </span>
                <div style={{
                  position: 'relative',
                  width: '44px',
                  height: '24px',
                  background: value ? 'var(--accent)' : 'var(--surface-2)',
                  borderRadius: '12px',
                  transition: 'background 0.2s ease',
                  flexShrink: 0,
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '2px',
                    left: value ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    background: '#fff',
                    borderRadius: '50%',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }} />
                  <input
                    type="checkbox"
                    checked={value || false}
                    onChange={(e) => onChange(control.id, e.target.checked)}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      margin: 0,
                    }}
                  />
                </div>
              </label>
            </div>
          )
        }

        // 🔹 SLIDER INPUT
        if (control.type === 'slider') {
          return (
            <div key={control.id}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
              }}>
                <label style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}>
                  {control.label}
                </label>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {typeof value === 'number' ? value.toFixed(control.step < 0.01 ? 3 : control.step < 0.1 ? 2 : 1) : value}
                  {control.unit && ` ${control.unit}`}
                </span>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={value || control.default}
                onChange={(e) => {
                  const val = parseFloat(e.target.value)
                  onChange(control.id, val)
                }}
                className="custom-range"
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>
          )
        }

        // 🔹 SELECT INPUT
        if (control.type === 'select') {
          return (
            <div key={control.id}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                color: 'var(--text-muted)',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>
                {control.label}
              </label>
              <select
                value={value || control.default}
                onChange={(e) => onChange(control.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                {control.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        // Fallback
        return null
      })}
    </div>
  )
}