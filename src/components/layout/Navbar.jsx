'use client'

export function Navbar() {
  return (
    <nav style={{
      position:       'fixed',
      top:            0,
      left:           0,
      right:          0,
      zIndex:         100,
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'space-between',
      padding:        '0 48px',
      height:         '56px',
      background:     'rgba(10, 10, 10, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom:   '1px solid var(--border)',
    }}>
      {/* Logo */}
      <a
        href="/"
        style={{
          fontSize:      '14px',
          fontWeight:    '600',
          color:         'var(--text)',
          textDecoration:'none',
          letterSpacing: '-0.01em',
        }}
      >
        Motion<span style={{ color: 'var(--accent)' }}>Lab</span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {[
          { label: 'Heading Reveal', href: '/heading-reveal', active: true },
          { label: 'Content Reveal', href: '#',               active: false },
          { label: 'Loaders',        href: '#',               active: false },
          { label: 'Buttons',        href: '#',               active: false },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontSize:      '13px',
              color:         link.active ? 'var(--text)' : 'var(--text-muted)',
              textDecoration:'none',
              letterSpacing: '0.01em',
              transition:    'color 0.15s ease',
              cursor:        link.active ? 'pointer' : 'default',
              opacity:       link.active ? 1 : 0.5,
            }}
          >
            {link.label}
            {link.active && (
              <span style={{
                display:       'inline-block',
                marginLeft:    '6px',
                padding:       '1px 6px',
                background:    'var(--accent-dim)',
                color:         'var(--accent)',
                borderRadius:  '4px',
                fontSize:      '10px',
                fontWeight:    '600',
                letterSpacing: '0.04em',
                verticalAlign: 'middle',
              }}>
                LIVE
              </span>
            )}
          </a>
        ))}
      </div>
    </nav>
  )
}
