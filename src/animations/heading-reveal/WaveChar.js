import { gsap, SplitText } from '@/lib/gsap'

/**
 * WaveChar
 * ────────
 * Each character's starting Y is based on Math.sin(index * frequency) * amplitude.
 * GSAP supports function-based tween values: `y: (i) => ...`
 * Creates an organic wave entrance where chars come from different heights.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, amplitude, frequency, ease }
 * @param {function}    onComplete
 */
export function WaveChar({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, amplitude, frequency, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'chars,words' })

  splitRef.current.words.forEach((w) => {
    w.style.display = 'inline-block'
    w.style.verticalAlign = 'top'
  })

  const chars = splitRef.current.chars

  return gsap.from(chars, {
    // Function-based value: each char starts at a different Y based on sine wave
    y: (i) => Math.sin(i * frequency) * amplitude,
    opacity: 0,
    duration,
    stagger,
    ease,
    onComplete,
  })
}