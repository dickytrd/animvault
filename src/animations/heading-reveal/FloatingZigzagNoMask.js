// /animations/heading-reveal/FloatingZigzagNoMask.js
import { gsap, SplitText } from '@/lib/gsap'

/**
 * FloatingZigzagNoMask
 * ────────────────────
 * Characters float in from the right with alternating Y & rotation.
 * NO MASK. Animates directly on the SplitText char spans.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yRange, xRange, rotationRange, ease }
 * @param {function}    onComplete
 */
export function FloatingZigzagNoMask({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yRange = 30, xRange = 100, rotationRange = 12, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    // Clear props to prevent ghost styles from messing up next run
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🎭 Set initial floating state directly on chars
  chars.forEach((char, i) => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return
    }

    // CRITICAL: Ensure inline-block for transform to work properly
    char.style.display = 'inline-block'
    char.style.willChange = 'transform, opacity'
    char.style.backfaceVisibility = 'hidden'
    char.style.transformOrigin = 'center center' // Crucial for rotation

    // Zigzag Y + Alternating Rotation
    // Even index (0, 2...) -> Down (positive Y) & Rotate Right
    // Odd index (1, 3...) -> Up (negative Y) & Rotate Left
    const startY = i % 2 === 0 ? yRange : -yRange
    const startRot = (i % 2 === 0 ? 1 : -1) * rotationRange

    // Set initial hidden & displaced state
    gsap.set(char, {
      x: xRange,          // Start from right (positive X)
      y: startY,          // Zigzag
      rotation: startRot, // Tilt
      opacity: 0,
    })
  })

  //  Animate left-to-right stagger to final position
  return gsap.to(chars, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    duration,
    stagger, // Array stagger = left-to-right cascade
    ease,
    onComplete,
  })
}