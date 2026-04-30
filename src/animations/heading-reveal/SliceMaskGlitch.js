// /animations/heading-reveal/SliceMaskGlitch.js
import { gsap, SplitText } from '@/lib/gsap'

/**
 * SliceMaskGlitch — Conveyor Swap Refresh
 * ────────────────────────────────────────
 * Initial state: Text visible & aligned.
 * On play: Char OUT slides away (Y). Char IN chases from behind in the SAME direction.
 * Creates a clean, non-overlapping "refresh queue" effect.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yRange, ease }
 * @param {function}    onComplete
 */
export function SliceMaskGlitch({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yRange = 120, ease } = controls

  // 🔁 Cleanup
  if (splitRef.current) {
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split & Wrap
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  const charData = chars.map(char => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return null
    }

    // Mask container
    char.style.display = 'inline-block'
    char.style.overflow = 'hidden'
    char.style.position = 'relative'
    char.style.verticalAlign = 'top'
    char.style.lineHeight = '1' // Crucial for consistent px Y movement
    char.innerHTML = ''

    // Random direction per slot (1 or -1)
    const dir = Math.random() > 0.5 ? 1 : -1
    const moveDist = yRange * (0.8 + Math.random() * 0.4)

    // OUT Element (starts at 0)
    const outEl = document.createElement('span')
    outEl.className = 'char-out'
    outEl.textContent = text
    outEl.style.cssText = 'display:block; will-change:transform; backface-visibility:hidden;'

    // IN Element (starts behind, same direction)
    const inEl = document.createElement('span')
    inEl.className = 'char-in'
    inEl.textContent = text
    inEl.style.cssText = 'display:block; position:absolute; top:0; left:0; width:100%; will-change:transform; backface-visibility:hidden;'

    char.appendChild(outEl)
    char.appendChild(inEl)

    // Set initial positions
    gsap.set(outEl, { y: 0 })
    gsap.set(inEl, { y: -dir * moveDist }) // Hidden behind the mask

    return { outEl, inEl, dir, moveDist }
  }).filter(Boolean)

  // 🎬 Timeline
  const tl = gsap.timeline({ onComplete })

  charData.forEach((data, i) => {
    const { outEl, inEl, dir, moveDist } = data
    const slotDelay = i * stagger

    // 1. OUT: Slides away from center to +dir*moveDist
    tl.to(outEl, {
      y: dir * moveDist,
      duration: duration * 0.4,
      ease: 'power2.in'
    }, slotDelay)

    // 2. IN: Chases from behind. Starts at -dir*moveDist -> moves to 0.
    // Starts exactly when OUT finishes to guarantee ZERO overlap & "beriringan" flow.
    tl.to(inEl, {
      y: 0,
      opacity: 1,
      duration: duration * 0.4,
      ease
    }, slotDelay + duration * 0.35) // 0.35 creates a tight "handoff" feel
  })

  return tl
}