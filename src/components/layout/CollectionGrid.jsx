'use client'

const COLLECTIONS = [
  {
    href:        '/heading-reveal',
    label:       'Heading Reveal',
    count:       '15',
    description: 'Split text, scramble, masks, 3D flips, waves — every way to reveal a heading.',
    tag:         'SplitText · ScrambleText',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
      </svg>
    ),
  },
  {
    href:        '/content-reveal',
    label:       'Content Reveal',
    count:       '5',
    description: 'Card sections that stagger, wipe, scale, and fade in with clean GSAP code.',
    tag:         'Stagger · ClipPath · Scale',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href:        '/loaders',
    label:       'Loaders',
    count:       '5',
    description: 'Infinitely looping spinners, dots, progress bars, and pulse rings.',
    tag:         'Timeline · Repeat · SVG',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
    ),
  },
  {
    href:        '/buttons',
    label:       'Buttons',
    count:       '5',
    description: 'Hover fills, arrow shifts, ripple clicks, scale pops, and error shakes.',
    tag:         'Hover · Click · Ripple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="10" rx="5"/>
        <circle cx="17" cy="12" r="2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
]

function CollectionCard({ col, index }) {
  const isFeature = index === 0

  return (
    <a
      href={col.href}
      style={{
        display:       'flex',
        flexDirection: 'column',
        padding:       '28px',
        background:    'var(--surface)',
        border:        '1px solid var(--border)',
        borderRadius:  '14px',
        textDecoration:'none',
        color:         'inherit',
        transition:    'all 0.2s ease',
        position:      'relative',
        overflow:      'hidden',
        gridColumn:    isFeature ? 'span 2' : 'span 1',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)'
        e.currentTarget.style.background  = 'var(--surface-2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background  = 'var(--surface)'
      }}
    >
      {/* Accent glow on feature card */}
      {isFeature && (
        <div style={{
          position:   'absolute',
          top: '-40px', left: '-40px',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(37,99,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Top row: icon + count badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{
          width: '44px', height: '44px',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '10px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0,
        }}>
          {col.icon}
        </div>
        <span style={{
          fontSize: '12px', color: 'var(--text-subtle)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '6px', padding: '3px 10px', fontVariantNumeric: 'tabular-nums',
        }}>
          {col.count} animations
        </span>
      </div>

      {/* Label */}
      <h2 style={{
        fontSize:      isFeature ? 'clamp(22px, 2.5vw, 30px)' : '18px',
        fontWeight:    '700',
        color:         'var(--text)',
        letterSpacing: '-0.02em',
        marginBottom:  '8px',
        lineHeight:    '1.2',
      }}>
        {col.label}
      </h2>

      {/* Description */}
      <p style={{
        fontSize:    '13px',
        color:       'var(--text-muted)',
        lineHeight:  '1.6',
        flex:        1,
        marginBottom:'20px',
        maxWidth:    isFeature ? '480px' : '100%',
      }}>
        {col.description}
      </p>

      {/* Footer: tag + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.04em', fontWeight: '500' }}>
          {col.tag}
        </span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '28px', height: '28px',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: '6px', color: 'var(--text-muted)', fontSize: '14px',
        }}>
          →
        </span>
      </div>
    </a>
  )
}

export function CollectionGrid() {
  return (
    <section>
      <p style={{
        fontSize: '11px', color: 'var(--text-subtle)',
        letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px',
      }}>
        Collections
      </p>
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap:                 '16px',
      }}>
        {COLLECTIONS.map((col, i) => (
          <CollectionCard key={col.href} col={col} index={i} />
        ))}
      </div>
    </section>
  )
}