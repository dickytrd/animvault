import { Navbar }       from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection }  from '@/components/layout/HeroSection'
import { AnimationCard } from '@/components/animation-card/AnimationCard'
import { headingRevealAnimations } from '@/data/headingReveal.config'
import { FloatingNav } from '@/components/animation-card/FloatingNav'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)


export const metadata = {
  title: 'Heading Reveal — MotionLab',
  description: 'Curated GSAP heading reveal animations. Customize and copy.',
}

export default function HeadingRevealPage() {
  return (
    <>
      <Navbar />
      <FloatingNav animations={headingRevealAnimations} />
      <main style={{
        maxWidth: '1200px',
        margin:   '0 auto',
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
        <Footer />
      </main>
    </>
  )
}
