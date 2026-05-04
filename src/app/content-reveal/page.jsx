import { Navbar }                  from '@/components/layout/Navbar'
import { Footer }                  from '@/components/layout/Footer'
import { PageHero }                from '@/components/shared/PageHero'
import { ContentRevealSection }    from '@/components/content-reveal/ContentRevealSection'
import { contentRevealAnimations } from '@/data/contentReveal.config'

export const metadata = {
  title:       'Content Reveal — MotionLab',
  description: 'Curated GSAP content reveal animations for card sections.',
}

export default function ContentRevealPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', }}>

        <PageHero
          category="Content Reveal"
          title={<>Content<br />Reveal<br /><span style={{ color: 'rgba(255,255,255,0.25)' }}>Animations</span></>}
          description="Production-ready reveal animations for card sections. Stagger, wipe, scale — customize and copy clean GSAP code."
          count={contentRevealAnimations.length}
        />

        <div id="showcase">
          {contentRevealAnimations.map((config, index) => (
            <ContentRevealSection key={config.id} config={config} index={index} />
          ))}
        </div>

       <Footer />
      </main>
    </>
  )
}
