import './globals.css'
import { SiteLoader } from '@/components/layout/SiteLoader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { TrailCursor } from '@/components/effects/TrailCursor'
import { ClickBurstCursor } from '@/components/effects/ClickBurstCursor'



export const metadata = {
  title: 'AnimVault - Curated Animations Site',
  description: 'Curated collection of heading reveal animations built with GSAP.',
  // icons: {
  //   icon: '/Public/favicon.svg',
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
        <TrailCursor 
          color="#2563eb"  
          width={5}          // Ketebalan garis
          length={80}        // Panjang trail
          smoothness={0.12}  // Lag smooth
          fadeStart={0.3}    // Fade mulai dari 30% trail
          glowSize={12}      // Glow di ujung
        />
        <ClickBurstCursor 
          color="#2563eb"
          lineCount={6}
          length={8}
          speed={2}
          decay={0.01}
      />
        {children}
        </SmoothScroll>
        <SiteLoader />
      </body>
    </html>
  )
}
