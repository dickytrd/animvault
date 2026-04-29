import { useMemo } from 'react'

const templates = {
  'cr-stagger-cards': (c) =>
`import gsap from 'gsap'

// Stagger Cards — each card fades up with time offset
const container = document.querySelector('.cards-grid')
const cards     = Array.from(container.children)

gsap.from(cards, {
  y: ${c.yAmount},
  opacity: 0,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}',
})`,

  'cr-clip-slide-cards': (c) =>
`import gsap from 'gsap'

// Clip Slide Cards — each card wipes in left→right
const container = document.querySelector('.cards-grid')
const cards     = Array.from(container.children)

gsap.set(cards, { clipPath: 'inset(0 100% 0 0)' })

gsap.to(cards, {
  clipPath: 'inset(0 0% 0 0)',
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}',
})`,

  'cr-fade-up-batch': (c) =>
`import gsap from 'gsap'

// Fade Up Batch — all cards reveal as one unified motion
const section = document.querySelector('.cards-section')

gsap.from(section, {
  y: ${c.yAmount},
  opacity: 0,
  duration: ${c.duration},
  ease: '${c.ease}',
})`,

  'cr-scale-reveal': (c) =>
`import gsap from 'gsap'

// Scale Reveal — section scales up while fading in
const section = document.querySelector('.cards-section')

gsap.from(section, {
  scale: ${c.scaleFrom},
  opacity: 0,
  duration: ${c.duration},
  ease: '${c.ease}',
})`,

  'cr-stagger-slide-left': (c) =>
`import gsap from 'gsap'

// Stagger Cards — slide up from below with stagger
const container = document.querySelector('.cards-grid')
const cards     = Array.from(container.children)

gsap.from(cards, {
  y: ${c.yAmount},
  opacity: 0,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}',
})`,
}

export function useContentRevealCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const t = templates[animationId]
    return t ? t(controls) : '// Template not found'
  }, [animationId, controls])
}
