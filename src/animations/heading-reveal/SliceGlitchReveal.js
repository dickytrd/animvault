// /animations/heading-reveal/SliceGlitchReveal.js — SIMPLE VERSION
import { gsap, SplitText } from '@/lib/gsap'

export function SliceGlitchReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, slices = 6, glitchRange = 100, ease } = controls

  // Cleanup
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars.flatMap((c) => c.querySelectorAll('.glitch-slice')))
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  chars.forEach((char) => {
    const text = char.textContent.trim()
    if (!text) {
      char.innerHTML = '&nbsp;'
      return
    }

    char.style.display = 'inline-block'
    char.innerHTML = ''

    // Create overlapping slices
    for (let i = 0; i < slices; i++) {
      const slice = document.createElement('span')
      slice.className = 'glitch-slice'
      slice.textContent = text
      slice.style.display = 'inline-block'
      slice.style.position = 'absolute'
      slice.style.left = '0'
      slice.style.top = '0'
      slice.style.opacity = '0'
      slice.style.pointerEvents = 'none'
      
      // Clip to show only portion of letter
      const clipTop = (i / slices) * 100
      const clipBottom = 100 - ((i + 1) / slices) * 100
      slice.style.clipPath = `inset(${clipTop}% 0 ${clipBottom}% 0)`

      char.appendChild(slice)

      // Random start position
      gsap.set(slice, {
        x: (Math.random() - 0.5) * glitchRange * 2,
        y: (Math.random() - 0.5) * glitchRange * 2,
        rotation: (Math.random() - 0.5) * 30,
        scale: 0.8 + Math.random() * 0.4,
      })
    }

    // Set char to relative for absolute positioning
    char.style.position = 'relative'
    // Maintain height
    const tempSpan = document.createElement('span')
    tempSpan.textContent = text
    tempSpan.style.visibility = 'hidden'
    char.appendChild(tempSpan)
  })

  const allSlices = chars.flatMap((c) => c.querySelectorAll('.glitch-slice'))

  return gsap.to(allSlices, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration,
    stagger,
    ease,
    onComplete,
  })
}