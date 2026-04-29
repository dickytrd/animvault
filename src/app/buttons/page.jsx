import { Navbar }          from '@/components/layout/Navbar'
import { PageHero }         from '@/components/shared/PageHero'
import { ButtonGridCard }   from '@/components/buttons/ButtonGridCard'
import { buttonsAnimations } from '@/data/buttons.config'

export const metadata = {
  title:       'Buttons — MotionLab',
  description: 'Curated GSAP button animations. Hover, click, ripple, shake — customize and copy.',
}

export default function ButtonsPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px 120px' }}>

        <PageHero
          category="Buttons"
          title={<>Interactive<br />Button<br /><span style={{ color: 'rgba(255,255,255,0.25)' }}>Animations</span></>}
          description="Hover effects, click feedback, ripples, and error states — all built with GSAP. Customize and copy production-ready code."
          count={buttonsAnimations.length}
        />

        {/* Grid */}
        <div id="showcase" style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap:                 '20px',
          marginTop:           '8px',
        }}>
          {buttonsAnimations.map((config) => (
            <ButtonGridCard key={config.id} config={config} />
          ))}
        </div>

        <footer style={{
          marginTop: '80px', paddingTop: '32px',
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>Built with GSAP + Next.js</p>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>MotionLab — Buttons v1.0</p>
        </footer>
      </main>
    </>
  )
}
