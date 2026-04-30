import { gsap, SplitText } from '@/lib/gsap'

/**
 * AlternatingYReveal
 * ──────────────────
 * Characters reveal from alternating Y directions (bottom → top → bottom...).
 * Stagger flows strictly left-to-right. Opacity fades 0 → 1.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yRange, ease }
 * @param {function}    onComplete
 */
export function AlternatingYReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yRange = 100, ease } = controls || {}

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

  // 🎭 Wrap & set initial alternating state
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

    // 🔄 Alternating Y start: Even=Bottom (+), Odd=Top (-)
    const startY = i % 2 === 0 ? yRange : -yRange
    gsap.set(inner, { y: startY, opacity: 0 })
  })

  // 🚀 Animate left-to-right stagger
  return gsap.to(inners, {
    y: 0,
    opacity: 1,
    duration,
    stagger, // Default stagger on array = left-to-right cascade
    ease,
    onComplete,
  })
}