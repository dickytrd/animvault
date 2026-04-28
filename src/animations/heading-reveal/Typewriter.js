import { gsap, SplitText } from '@/lib/gsap'

/**
 * Typewriter
 * ──────────
 * Characters appear sequentially — like being typed in real-time.
 * Duration per char is very short; the effect is driven entirely by stagger.
 * Optional cursor blink is simulated via the element's ::after pseudo (CSS-only).
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { speed, cursorBlink }
 * @param {function}    onComplete
 */
export function Typewriter({ element, splitRef, controls, onComplete }) {
  const { speed, } = controls

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

  // Set all chars invisible first
  gsap.set(chars, { opacity: 0 })

  // Reveal one at a time — pure stagger, instant per-char
  return gsap.to(chars, {
    opacity:  1,
    duration: 0.01,           // near-instant per char
    stagger:  speed,          // time between each char appearing
    ease:     'none',
    onComplete,
  })
}