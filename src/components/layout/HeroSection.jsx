'use client'

export function HeroSection() {
  return (
    <section style={{
      paddingTop:    '180px',
      paddingBottom: '100px',
    }}>
      {/* Category label */}
      <p style={{
        fontSize:      '11px',
        color:         'var(--text-subtle)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom:  '24px',
      }}>
        Animation Collection — v1.0
      </p>

      {/* Main headline */}
      <h1 style={{
        fontSize:      'clamp(48px, 7vw, 96px)',
        fontWeight:    '700',
        lineHeight:    '1.0',
        letterSpacing: '-0.03em',
        color:         'var(--text)',
        maxWidth:      '840px',
        marginBottom:  '0',
      }}>
        Make Your Site <br />
        Come To Life <br />
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>with Animation</span>
      </h1>

      {/* Sub row: description + buttons */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        marginTop:      '52px',
        gap:            '40px',
      }}>
        <p style={{
          fontSize:   '14px',
          color:      'var(--text-muted)',
          lineHeight: '1.7',
          maxWidth:   '340px',
          flexShrink: 0,
        }}>
          A curated collection of production-ready GSAP heading reveal
          animations. Customize, preview, and copy the code instantly.
        </p>

        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <a
            href="https://gsap.com/docs/v3/Plugins/SplitText/"
            target="_blank"
            rel="noreferrer"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '6px',
              padding:        '10px 18px',
              background:     'transparent',
              color:          'var(--text-muted)',
              border:         '1px solid var(--border)',
              borderRadius:   '6px',
              fontSize:       '13px',
              fontFamily:     'inherit',
              textDecoration: 'none',
              transition:     'all 0.2s ease',
              letterSpacing:  '0.01em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            GSAP Docs ↗
          </a>
          <a
            href="#heading-reveal"
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '6px',
              padding:        '10px 18px',
              background:     'var(--accent)',
              color:          '#fff',
              border:         '1px solid transparent',
              borderRadius:   '6px',
              fontSize:       '13px',
              fontFamily:     'inherit',
              textDecoration: 'none',
              fontWeight:     '500',
              transition:     'background 0.2s ease',
              letterSpacing:  '0.01em',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            Explore Animations ↓
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display:    'flex',
        gap:        '40px',
        marginTop:  '64px',
        paddingTop: '32px',
        borderTop:  '1px solid var(--border)',
      }}>
        {[
          { value: '30',    label: 'Animations'  },
          { value: 'GSAP', label: 'Engine'       },
          { value: 'Free', label: 'All Plugins'  },
          { value: '0',    label: 'Dependencies' },
        ].map((stat) => (
          <div key={stat.label}>
            <div style={{
              fontSize:      '20px',
              fontWeight:    '700',
              color:         'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom:  '2px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize:      '12px',
              color:         'var(--text-muted)',
              letterSpacing: '0.02em',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
