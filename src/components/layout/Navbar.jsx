'use client'

import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Heading Reveal', href: '/heading-reveal'  },
  { label: 'Content Reveal', href: '/content-reveal'  },
  { label: 'Loaders',        href: '/loaders'          },
  { label: 'Buttons',        href: '/buttons'          },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav style={{
      position:       'fixed',
      top:            0, left: 0, right: 0,
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
      <a href="/" style={{
        fontSize: '14px', fontWeight: '600',
        color: 'var(--text)', textDecoration: 'none', letterSpacing: '-0.01em',
      }}>
        Motion<span style={{ color: 'var(--accent)' }}>Lab</span>
      </a>

      {/* Links */}
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           '6px',
                padding:       '5px 12px',
                borderRadius:  '6px',
                fontSize:      '13px',
                fontWeight:    active ? '500' : '400',
                color:         active ? 'var(--text)' : 'var(--text-muted)',
                textDecoration:'none',
                // background:    active ? 'rgba(255,255,255,0.07)' : 'transparent',
                letterSpacing: '0.01em',
                transition:    'all 0.15s ease',
                borderLeft:    active ? '0px solid var(--accent)' : '2px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.color = 'var(--text)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {link.label}
              {active && (
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: 'var(--accent)', display: 'inline-block', flexShrink: 0,
                }} />
              )}
            </a>
          )
        })}
      </div>
    </nav>
  )
}