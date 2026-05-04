'use client'

export function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px 48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      margin: '0 auto',
    }}>
      <div>
        <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text)', marginBottom:'4px', letterSpacing:'-0.01em' }}>
          Anim<span style={{ color:'var(--accent)' }}>Vault</span>
        </div>
        <div style={{ fontSize:'12px', color:'var(--text-subtle)' }}>
          A curated GSAP animation library — Built with GSAP + Next.js
        </div>
      </div>

      <div style={{ display:'flex', gap:'20px', alignItems:'center' }}>
        {[
          // { label:'GitHub', url:'https://github.com/dickytrd/animvault' },
          { label:'GSAP',   url:'https://gsap.com' },
        ].map((l) => (
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer"
            style={{ fontSize:'12px', color:'var(--text-muted)', textDecoration:'none', transition:'color 0.15s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            {l.label}
          </a>
        ))}
        <span style={{ fontSize:'12px', color:'var(--text-subtle)' }}>AnimVault v1.0</span>
      </div>
    </footer>
  )
}