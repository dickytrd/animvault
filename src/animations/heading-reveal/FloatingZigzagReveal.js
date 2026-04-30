import { gsap, SplitText } from '@/lib/gsap'

/**
 * FloatingZigzagReveal
 * ────────────────────
 * Characters reveal from alternating Y (zig-zag) + float from right (X) + subtle rotation.
 * Stagger flows left-to-right. Opacity fades 0 → 1.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yRange, xRange, rotationRange, ease }
 * @param {function}    onComplete
 */
export function FloatingZigzagReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yRange = 80, xRange = 120, rotationRange = 15, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars.flatMap(c => c.querySelectorAll('.char-inner')))
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars
  const inners = []

  // 🎭 Wrap & set initial floating state
  chars.forEach((char, i) => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return
    }

    // Mask container
    char.style.display = 'inline-block'
    char.style.overflow = 'hidden'
    char.style.position = 'relative'
    char.style.verticalAlign = 'top'
    char.style.lineHeight = '1'
    char.innerHTML = ''

    const inner = document.createElement('span')
    inner.className = 'char-inner'
    inner.textContent = text
    inner.style.cssText = 'display:inline-block; will-change:transform,opacity; backface-visibility:hidden;'

    char.appendChild(inner)
    inners.push(inner)

    // 🌊 Initial State: Zig-zag Y + Float from Right (X) + Subtle Rotation
    const startY = i % 2 === 0 ? yRange : -yRange
    const startX = xRange
    // Rotation alternates to sync with Y zig-zag for cohesive floating arc
    const startRot = (i % 2 === 0 ? 1 : -1) * rotationRange

    gsap.set(inner, {
      x: startX,
      y: startY,
      rotation: startRot,
      opacity: 0,
      transformOrigin: 'center center'
    })
  })

  // 🚀 Animate left-to-right stagger to center
  return gsap.to(inners, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    onComplete,
  })
}