import { Navbar }       from '@/components/layout/Navbar'
import { HeroSection }  from '@/components/layout/HeroSection'
import { AnimationCard } from '@/components/animation-card/AnimationCard'
import { headingRevealAnimations } from '@/data/headingReveal.config'

export const metadata = {
  title: 'Heading Reveal — MotionLab',
  description: 'Curated GSAP heading reveal animations. Customize and copy.',
}

export default function HeadingRevealPage() {
  return (
    <>
      <Navbar />

      <main style={{
        maxWidth: '1200px',
        margin:   '0 auto',
        padding:  '0 48px 120px',
      }}>
        {/* Hero */}
        <HeroSection />

        {/* Animation sections */}
        <div id="heading-reveal">
          {headingRevealAnimations.map((config, index) => (
            <AnimationCard
              key={config.id}
              config={config}
              index={index}
            />
          ))}
        </div>

        {/* Footer */}
        <footer style={{
          marginTop:     '80px',
          paddingTop:    '32px',
          borderTop:     '1px solid var(--border)',
          display:       'flex',
          justifyContent:'space-between',
          alignItems:    'center',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
            Built with GSAP + Next.js
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
            MotionLab — Heading Reveal v1.0
          </p>
        </footer>
      </main>
    </>
  )
}
