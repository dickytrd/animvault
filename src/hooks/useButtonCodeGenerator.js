import { useMemo } from 'react'

const templates = {
  'btn-fill-slide': (c) =>
`import gsap from 'gsap'

// Fill Slide — background slides in from left on hover
const btn  = document.querySelector('.btn')
const fill = btn.querySelector('.btn-fill') // overflow:hidden bg div

gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })

btn.addEventListener('mouseenter', () => {
  gsap.to(fill, { scaleX: 1, duration: ${c.duration}, ease: 'power3.out' })
})

btn.addEventListener('mouseleave', () => {
  gsap.to(fill, {
    scaleX: 0,
    duration: ${(c.duration * 0.8).toFixed(2)},
    ease: 'power3.in',
    transformOrigin: 'right center',
  })
    gsap.set(fill, { transformOrigin: 'left center', delay: c.duration * 0.8 })
})`,

  'btn-arrow-slide': (c) =>
`import gsap from 'gsap'

// Arrow Slide — label and arrow shift right on hover
const btn   = document.querySelector('.btn')
const label = btn.querySelector('.btn-label')
const arrow = btn.querySelector('.btn-arrow')

btn.addEventListener('mouseenter', () => {
  gsap.to(label, { x: 3,  duration: ${c.duration}, ease: 'power2.out' })
  // gsap.to(arrow, { x: 5,  duration: ${c.duration}, ease: 'power2.out' })
})

btn.addEventListener('mouseleave', () => {
  gsap.to(label, { x: 0, duration: ${c.duration}, ease: 'power2.inOut' })
  // gsap.to(arrow, { x: 0, duration: ${c.duration}, ease: 'power2.inOut' })
})`,

  'btn-ripple-click': (c) =>
`import gsap from 'gsap'

// Ripple Click — ripple expands from exact click position
const btn = document.querySelector('.btn')
// btn must have: position:relative; overflow:hidden

btn.addEventListener('click', (e) => {
  const rect   = btn.getBoundingClientRect()
  const x      = e.clientX - rect.left
  const y      = e.clientY - rect.top
  const size   = Math.max(rect.width, rect.height) * 2

  const ripple = document.createElement('div')

  Object.assign(ripple.style, {
    position:     'absolute',
    width:        size + 'px',
    height:       size + 'px',
    left:         (x - size / 2) + 'px',
    top:          (y - size / 2) + 'px',
    borderRadius: '50%',
    background:   'rgba(255, 255, 255, 0.25)',
    pointerEvents:'none',
  })

  btn.appendChild(ripple)

  gsap.fromTo(ripple,
    { scale: 0, opacity: 1 },
    {
      scale: 1,
      opacity: 0,
      duration: ${c.duration},
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    }
  )
})`,

  'btn-scale-pop': (c) =>
`import gsap from 'gsap'

// Scale Pop — hover scale + elastic spring on click
const btn = document.querySelector('.btn')

btn.addEventListener('mouseenter', () => {
  gsap.to(btn, { scale: ${c.scaleHover}, duration: ${c.duration}, ease: 'back.out(2)' })
})

btn.addEventListener('mouseleave', () => {
  gsap.to(btn, { scale: 1, duration: ${c.duration}, ease: 'power2.inOut' })
})

btn.addEventListener('mousedown', () => {
  gsap.to(btn, { scale: 0.93, duration: 0.08, ease: 'power2.in' })
})

btn.addEventListener('mouseup', () => {
  gsap.to(btn, { scale: ${c.scaleHover}, duration: 0.2, ease: 'back.out(3)' })
})`,

  'btn-shake-error': (c) =>
`import gsap from 'gsap'

// Shake Error — rapid x shake to signal rejection/error
const btn = document.querySelector('.btn')
let isAnimating = false

btn.addEventListener('click', () => {
  if (isAnimating) return
  isAnimating = true

  const tl = gsap.timeline({
    onComplete: () => { isAnimating = false }
  })

  // Flash red border
  gsap.to(btn, { borderColor: '#ef4444', duration: 0.1 })

  // Shake sequence
  tl.to(btn, { x: -${c.intensity},                    duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.out'   })
    .to(btn, { x:  ${c.intensity},                    duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.inOut' })
    .to(btn, { x: -${Math.round(c.intensity * 0.7)}, duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.inOut' })
    .to(btn, { x:  ${Math.round(c.intensity * 0.7)}, duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.inOut' })
    .to(btn, { x:  0, duration: ${(c.duration * 0.15).toFixed(2)}, ease: 'power2.out' })
    .to(btn, { borderColor: 'initial', duration: 0.3 }, '<')
})`,
}

export function useButtonCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const t = templates[animationId]
    return t ? t(controls) : '// Template not found'
  }, [animationId, controls])
}
