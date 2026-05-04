import { Navbar }           from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { PageHero }          from '@/components/shared/PageHero'
import { LoaderCard }        from '@/components/loaders/LoaderCard'
import { loadersAnimations } from '@/data/loaders.config'

export const metadata = {
  title:       'Loaders — MotionLab',
  description: 'Curated GSAP loader animations. Spinners, dots, progress bars — customize and copy.',
}

export default function LoadersPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px 120px' }}>

        <PageHero
          category="Loaders"
          title={<>Loading<br />State<br /><span style={{ color: 'rgba(255,255,255,0.25)' }}>Animations</span></>}
          description="Infinitely looping GSAP loaders — dots, spinners, progress bars, and rings. Customize speed and size, copy the code."
          count={loadersAnimations.length}
        />

        <div id="showcase">
          {loadersAnimations.map((config, index) => (
            <LoaderCard key={config.id} config={config} index={index} />
          ))}
        </div>

        <Footer /> 
      </main>
    </>
  )
}
