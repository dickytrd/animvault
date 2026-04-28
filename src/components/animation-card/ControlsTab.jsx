'use client'

/**
 * ControlsTab
 * ───────────
 * Renders control inputs dynamically from config.controls array.
 * Supports: 'slider' and 'select' types.
 * Adding a new control type = handle it in the switch below.
 */
export function ControlsTab({ controls: configControls, values, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {configControls.map((ctrl) => (
        <ControlRow
          key={ctrl.id}
          ctrl={ctrl}
          value={values[ctrl.id]}
          onChange={(val) => onChange(ctrl.id, val)}
        />
      ))}
    </div>
  )
}

function ControlRow({ ctrl, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Label + current value */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
      }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {ctrl.label}
        </span>
        <span style={{
          fontSize:     '12px',
          color:        'var(--text)',
          fontVariantNumeric: 'tabular-nums',
          fontWeight:   '500',
          minWidth:     '48px',
          textAlign:    'right',
        }}>
          {formatValue(value, ctrl)}
        </span>
      </div>

      {/* Input */}
      {ctrl.type === 'slider' && (
        <input
          type="range"
          className="custom-range"
          min={ctrl.min}
          max={ctrl.max}
          step={ctrl.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      )}

      {ctrl.type === 'select' && (
        <CustomSelect
          options={ctrl.options}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  )
}

function CustomSelect({ options, value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width:           '100%',
          padding:         '8px 32px 8px 12px',
          background:      'var(--bg)',
          color:           'var(--text)',
          border:          '1px solid var(--border)',
          borderRadius:    '6px',
          fontSize:        '13px',
          fontFamily:      'inherit',
          appearance:      'none',
          WebkitAppearance:'none',
          cursor:          'pointer',
          outline:         'none',
          transition:      'border-color 0.15s ease',
        }}
        onMouseEnter={(e) => e.target.style.borderColor = 'var(--border-hover)'}
        onMouseLeave={(e) => e.target.style.borderColor = 'var(--border)'}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#1c1c1c' }}>
            {opt}
          </option>
        ))}
      </select>
      {/* Custom chevron */}
      <div style={{
        position:      'absolute',
        right:         '10px',
        top:           '50%',
        transform:     'translateY(-50%)',
        pointerEvents: 'none',
        color:         'var(--text-muted)',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  )
}

function formatValue(value, ctrl) {
  if (ctrl.unit === 's') return `${value.toFixed(ctrl.step < 0.1 ? 3 : 2)}s`
  if (ctrl.unit === 'px') return `${value}px`
  if (ctrl.unit === '%') return `${value}%`
  if (ctrl.unit === 'deg') return `${value}°`
  return String(value)
}
