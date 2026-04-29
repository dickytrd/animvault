import { useMemo } from 'react'

const templates = {
  'ld-dots-wave': (c) =>
`import gsap from 'gsap'

// Dots Wave — 3 dots bounce in wave pattern, loops forever
const dots = document.querySelectorAll('.loader-dot')

const tl = gsap.timeline({ repeat: -1 })

tl.to(dots, {
  y: -${Math.round(c.size * 1.5)},
  duration: ${c.speed},
  stagger: ${(c.speed * 0.35).toFixed(2)},
  ease: 'power2.out',
})
.to(dots, {
  y: 0,
  duration: ${c.speed},
  stagger: ${(c.speed * 0.35).toFixed(2)},
  ease: 'power2.in',
})`,

  'ld-progress-bar': (c) =>
`import gsap from 'gsap'

// Progress Bar — fills left to right, resets, loops forever
const bar = document.querySelector('.loader-bar')

gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 })

tl.to(bar, { scaleX: 1, duration: ${c.speed}, ease: 'power1.inOut' })
  .to(bar, { opacity: 0, duration: 0.2, ease: 'power2.in' })
  .set(bar, { scaleX: 0, opacity: 1 })`,

  'ld-pulse-ring': (c) =>
`import gsap from 'gsap'

// Pulse Ring — two rings pulse outward alternating
const rings = document.querySelectorAll('.loader-ring')

rings.forEach((ring, i) => {
  gsap.set(ring, { scale: 0.3, opacity: 1 })

  const tl = gsap.timeline({ repeat: -1, delay: i * ${(c.speed * 0.5).toFixed(2)} })

  tl.to(ring, {
    scale: 2.2,
    opacity: 0,
    duration: ${c.speed},
    ease: 'power1.out',
  })
  .set(ring, { scale: 0.3, opacity: 1 })
})`,

  'ld-spinner-arc': (c) =>
`import gsap from 'gsap'

// Spinner Arc — SVG arc rotates continuously
const svg = document.querySelector('.loader-spinner')

gsap.to(svg, {
  rotation: 360,
  duration: ${c.speed},
  ease: 'none',
  repeat: -1,
  transformOrigin: 'center center',
})`,

  'ld-bounce-dots': (c) =>
`import gsap from 'gsap'

// Bounce Dots — dots bounce with elastic physics, offset phases
const dots = document.querySelectorAll('.loader-dot')
const tl   = gsap.timeline({ repeat: -1 })

dots.forEach((dot, i) => {
  tl.to(dot, {
    y: -${c.size * 2},
    duration: ${(c.speed * 0.5).toFixed(2)},
    ease: 'power2.out',
  }, i * ${(c.speed * 0.2).toFixed(2)})
  .to(dot, {
    y: 0,
    duration: ${(c.speed * 0.5).toFixed(2)},
    ease: 'bounce.out',
  }, '<${(c.speed * 0.5).toFixed(2)}')
})`,
}

export function useLoaderCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const t = templates[animationId]
    return t ? t(controls) : '// Template not found'
  }, [animationId, controls])
}
