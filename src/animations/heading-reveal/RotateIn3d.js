import { gsap, SplitText } from '@/lib/gsap'

/**
 * RotateIn3D
 * ──────────
 * Each character flips in on the X axis from behind (rotateX: -90 → 0).
 * `transformPerspective` per char gives the 3D depth without needing a parent.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, rotateAmount, perspective, ease }
 * @param {function}    onComplete
 */
export function RotateIn3D({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, rotateAmount, perspective, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'chars,words' })

  // Make words inline-block so chars within them can transform in 3D
  splitRef.current.words.forEach((w) => {
    w.style.display = 'inline-block'
    w.style.verticalAlign = 'top'
  })

  return gsap.from(splitRef.current.chars, {
    transformPerspective: perspective,
    rotateX: rotateAmount,
    opacity: 0,
    duration,
    stagger,
    ease,
    onComplete,
  })
}