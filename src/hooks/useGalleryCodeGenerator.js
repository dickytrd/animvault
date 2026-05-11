import { useMemo } from 'react'

const templates = {
  'split-fade': (c) =>
`import gsap from 'gsap'

// Split Fade — Sequential character fade
const chars = document.querySelectorAll('.char')

gsap.from(chars, {
  opacity: 0,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: 'power2.out'
})`,

  'blur-reveal': (c) =>
`import gsap from 'gsap'

// Blur Reveal — From blur to sharp
const element = document.querySelector('.target')

gsap.from(element, {
  filter: 'blur(${c.blurAmount}px)',
  scale: 0.9,
  opacity: 0,
  duration: ${c.duration},
  ease: 'power2.out'
})`,

  'kinetic-snap': (c) =>
`import gsap from 'gsap'

// Kinetic Snap — Scatter & snap back
const chars = document.querySelectorAll('.char')

gsap.from(chars, {
  x: () => gsap.utils.random(-${c.displacement}, ${c.displacement}),
  y: () => gsap.utils.random(-${c.displacement}, ${c.displacement}),
  opacity: 0,
  duration: ${c.duration},
  stagger: 0.03,
  ease: 'elastic.out(1, 0.6)'
})`,

  'fill-slide': (c) =>
`import gsap from 'gsap'

// Fill Slide — Background slides in
const btn = document.querySelector('.btn')
const fill = btn.querySelector('.fill')

gsap.from(fill, {
  scaleX: 0,
  transformOrigin: 'left center',
  duration: ${c.duration},
  ease: 'power3.out'
})`,

  'magnetic-pull': (c) =>
`import gsap from 'gsap'

// Magnetic Pull — Follow cursor
const btn = document.querySelector('.btn')

btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(btn, {
    x: x * 0.3,
    y: y * 0.3,
    duration: ${c.duration},
    ease: 'power2.out'
  })
})`,

  'data-stream': (c) =>
`import gsap from 'gsap'

// Data Stream — Converge on hover
const chars = document.querySelectorAll('.data-char')

gsap.to(chars, {
  x: 0,
  y: 0,
  scale: 0.5,
  opacity: 0,
  duration: ${c.convergeSpeed},
  stagger: { each: 0.01, from: 'random' }
})`,
}

export function useGalleryCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const template = templates[animationId]
    return template ? template(controls) : '// Code generator not available'
  }, [animationId, controls])
}