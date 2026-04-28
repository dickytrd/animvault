import './globals.css'

export const metadata = {
  title: 'Heading Reveal Lab — Animation Playground',
  description: 'Curated collection of heading reveal animations built with GSAP.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
