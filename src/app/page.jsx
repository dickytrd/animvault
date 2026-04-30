import { Navbar }         from '@/components/layout/Navbar'
import { CollectionGrid } from '@/components/layout/CollectionGrid'

export const metadata = {
  title:       'AnimVault — Animation Collection',
  description: 'Curated GSAP animation collection. Heading reveals, content reveals, loaders, and buttons.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px 120px' }}>

        {/* ── Hero ── */}
        <section style={{ paddingTop: '180px', paddingBottom: '96px' }}>

          <p style={{
            fontSize: '11px', color: 'var(--text-subtle)',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px',
          }}>
            Animation Collection — GSAP
          </p>

          <h1 style={{
            fontSize:      'clamp(52px, 8vw, 108px)',
            fontWeight:    '700',
            lineHeight:    '0.95',
            letterSpacing: '-0.03em',
            color:         'var(--text)',
          }}>
            Make Your<br />
            Site Come<br />
            <span style={{ color: 'rgba(255,255,255,0.22)' }}>To Life.</span>
          </h1>

          <p style={{
            fontSize:   '16px',
            color:      'var(--text-muted)',
            lineHeight: '1.7',
            maxWidth:   '420px',
            marginTop:  '40px',
          }}>
            A curated collection of production-ready GSAP animations.
            Customize values, preview in real time, copy the code.
          </p>

          {/* Stats row */}
          <div style={{
            display:   'flex',
            gap:       '40px',
            marginTop: '56px',
            paddingTop:'28px',
            borderTop: '1px solid var(--border)',
          }}>
            {[
              { value: '30+', label: 'Animations'  },
              { value: 'GSAP', label: 'Engine'      },
              { value: 'Free', label: 'All Plugins' },
              { value: '4',    label: 'Categories'  },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '2px' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Collection Cards ── */}
        <CollectionGrid />

        {/* ── Footer ── */}
        <footer style={{
          marginTop: '80px', paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>Built with GSAP + Next.js</p>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>MotionLab v1.0</p>
        </footer>
      </main>
    </>
  )
}