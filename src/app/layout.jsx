import './globals.css'
import { SiteLoader } from '@/components/layout/SiteLoader'
import { SmoothScroll } from '@/components/layout/SmoothScroll'



export const metadata = {
  title: 'AnimVault - Curated Animations Site',
  description: 'Curated collection of heading reveal animations built with GSAP.',
  icons: {
    icon: '/Public/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
        {children}
        </SmoothScroll>
        <SiteLoader />
      </body>
    </html>
  )
}
