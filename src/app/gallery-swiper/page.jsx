import { Navbar }            from '@/components/layout/Navbar'
import { Footer }            from '@/components/layout/Footer'
import { PageHero }          from '@/components/shared/PageHero'
import { GallerySwiper }     from '@/components/gallery/GallerySwiper'
import { galleryAnimations } from '@/data/gallery.config'

export const metadata = {
  title:       'Gallery Swiper — MotionLab',
  description: 'Interactive gallery with flip cards, drag navigation, and auto-swipe.',
}

export default function GallerySwiperPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', overflow: 'visible' }}>

        <PageHero
          category="Gallery"
          title={<>Interactive<br />Gallery<br /><span style={{ color: 'rgba(255,255,255,0.25)' }}>Swiper</span></>}
          description="Drag to explore animations. Click cards to flip and view details. Auto-swipe every 3 seconds."
          count={galleryAnimations.length}
        />

        {/* Gallery Container */}
        <div id="gallery-showcase" style={{
          marginTop:           '8px',
          padding:             '0 48px 120px',
          position:            'relative',
          minHeight:           '600px', // Ensures swiper has breathing room
          overflow: 'visible'
        }}>
          <GallerySwiper items={galleryAnimations} />
        </div>

       <Footer />
      </main>
    </>
  )
}