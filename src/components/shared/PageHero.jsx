'use client'

export function PageHero({ category, title, description, count, engine = 'GSAP' }) {
  return (
    <section style={{ paddingTop: '180px', paddingBottom: '100px' }}>
      <p style={{
        fontSize: '11px', color: 'var(--text-subtle)',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px',
      }}>
        Animation Collection — {category}
      </p>

      <h1 style={{
        fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: '700',
        lineHeight: '1.0', letterSpacing: '-0.03em', color: 'var(--text)',
        maxWidth: '840px',
      }}>
        {title}
      </h1>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginTop: '52px', gap: '40px',
      }}>
        <p style={{
          fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7',
          maxWidth: '340px', flexShrink: 0,
        }}>
          {description}
        </p>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <a href="https://gsap.com/docs/v3/" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 18px', background: 'transparent', color: 'var(--text-muted)',
            border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px',
            fontFamily: 'inherit', textDecoration: 'none', transition: 'all 0.2s ease',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            GSAP Docs ↗
          </a>
          <a href="#showcase" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '10px 18px', background: 'var(--accent)', color: '#fff',
            border: '1px solid transparent', borderRadius: '6px', fontSize: '13px',
            fontFamily: 'inherit', textDecoration: 'none', fontWeight: '500',
            transition: 'background 0.2s ease',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent)'}
          >
            Explore ↓
          </a>
        </div>
      </div>

      <div style={{
        display: 'flex', gap: '40px', marginTop: '64px',
        paddingTop: '32px', borderTop: '1px solid var(--border)',
      }}>
        {[
          { value: String(count), label: 'Animations' },
          { value: engine,        label: 'Engine'     },
          { value: 'Free',        label: 'All Plugins'},
          { value: '0',           label: 'Dependencies'},
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '2px' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
